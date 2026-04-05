'use client';

import { useChatScroll } from '@/hooks/useChatScroll';
import { askAIStream, pollDagStatus, triggerUpdate } from '@/lib/apis/askAI';
import { UIResult } from '@/components/chat/UIContainer';
import { deleteChatSession, getChatMessages } from '@/lib/apis/user';
import { useChatStore } from '@/store/chatStore';
import { ChatMessage } from '@/types/chat';
import { IconChevronDown } from '@tabler/icons-react';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import MessagePair from './MessagePair';

export default function ChatContainer() {
  const { id: chatId } = useParams<{ id: string }>();
  const { messages, setMessages, pendingMessage, setPendingMessage, setPendingTitleUpdate, setIsLoadingTitle } =
    useChatStore();

  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [statusText, setStatusText] = useState('');
  const {
    scrollContainerRef,
    lastPairRef,
    isAtBottom,
    scrollToBottom,
    setLastUserMsgId,
  } = useChatScroll(messages);

  const abortControllerRef = useRef<AbortController | null>(null);
  const pendingCollectRef = useRef<{
    nickname: string;
    question: string;
  } | null>(null);
  const sessionRef = useRef({ isNew: false, hasSent: false });

  // 새 세션이고 아무것도 전송하지 않은 채 이탈하면 세션 삭제
  useEffect(() => {
    const s = sessionRef;
    return () => {
      if (s.current.isNew && !s.current.hasSent) {
        deleteChatSession(chatId).catch(() => {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 마운트 시: 새 메시지 전송 or 기존 히스토리 로드
  useEffect(() => {
    if (pendingMessage) {
      sessionRef.current.isNew = true;
      setMessages(() => []);
      setPendingMessage(null);
      handleSend(pendingMessage);
    } else {
      getChatMessages(chatId)
        .then((history) => {
          if (!history.length) return;
          setMessages(() =>
            history.map((m, i) => ({
              id: `${i}-${m.role}`,
              role:
                m.role === 'assistant' ? ('bot' as const) : ('user' as const),
              content: m.content,
              ...(m.result_json ? { result: m.result_json as UIResult } : {}),
            })),
          );
        })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateBotMsg = (id: string, update: Partial<ChatMessage>) =>
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, ...update } : msg)),
    );

  const handleCancel = () => abortControllerRef.current?.abort();

  const handleSend = async (text?: string) => {
    const question = text ?? inputValue;
    if (!question.trim()) return;
    sessionRef.current.hasSent = true;

    // 데이터 수집 확인 응답 처리
    if (pendingCollectRef.current && question.trim() === '예') {
      const { nickname, question: originalQuestion } =
        pendingCollectRef.current;
      pendingCollectRef.current = null;

      const userMsgId = `${Date.now()}-user`;
      const botMsgId = `${Date.now()}-bot`;
      setMessages((prev) => [
        ...prev,
        { id: userMsgId, role: 'user', content: question },
        { id: botMsgId, role: 'bot', content: '' },
      ]);

      try {
        const runId = await triggerUpdate(nickname);
        updateBotMsg(botMsgId, {
          content: `${nickname} 데이터를 수집하는 중이에요...`,
        });
        setStreamingId(botMsgId);
        const result = await pollDagStatus(runId, (msg) =>
          updateBotMsg(botMsgId, { content: msg }),
        );
        setStreamingId(null);
        if (result === 'success' && originalQuestion) {
          updateBotMsg(botMsgId, {
            content: '수집 완료! 바로 답변을 가져올게요.',
          });
          await handleSend(originalQuestion);
        } else if (result === 'failed') {
          updateBotMsg(botMsgId, {
            content: `${nickname} 데이터 수집에 실패했어요. 다시 시도해 주세요.`,
          });
        }
      } catch {
        setStreamingId(null);
        updateBotMsg(botMsgId, {
          content: '수집 요청에 실패했습니다. 잠시 후 다시 시도해 주세요.',
        });
      }
      setInputValue('');
      return;
    }

    pendingCollectRef.current = null;

    const userMsgId = `${Date.now()}-user`;
    const botMsgId = `${Date.now()}-bot`;
    const controller = new AbortController();
    abortControllerRef.current = controller;
    let timedOut = false;
    const timeoutId = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 30000);

    if (sessionRef.current.isNew) setIsLoadingTitle(true);
    setLastUserMsgId(userMsgId);
    setStreamingId(botMsgId);
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: 'user', content: question },
      { id: botMsgId, role: 'bot', content: '' },
    ]);

    let botContent = '';
    try {
      await askAIStream(
        question,
        chatId,
        {
          onChunk: (chunk) => {
            botContent += chunk;
            updateBotMsg(botMsgId, { content: botContent });
          },
          onStructured: (payload) => {
            updateBotMsg(botMsgId, { content: '', result: payload });
          },
          onConfirmCollect: (nickname) => {
            pendingCollectRef.current = { nickname, question };
          },
          onStatus: (status) => {
            setStatusText(status);
          },
          onTitle: (title) => {
            setPendingTitleUpdate({ chatId, title });
          },
        },
        controller.signal,
      );
    } catch {
      if (timedOut) {
        updateBotMsg(botMsgId, {
          content: '응답 시간이 초과되었어요. 다시 시도해 주세요.',
        });
      } else if (!controller.signal.aborted) {
        updateBotMsg(botMsgId, {
          content: '죄송해요, 요청을 처리하지 못했어요. 다시 시도해 주세요.',
        });
      }
    } finally {
      clearTimeout(timeoutId);
      const aborted = controller.signal.aborted;
      setStreamingId(null);
      setStatusText('');
      setIsLoadingTitle(false);
      if (!aborted) setInputValue('');
      abortControllerRef.current = null;
    }
  };

  const pairs: { user: ChatMessage; bot?: ChatMessage }[] = [];
  for (let i = 0; i < messages.length; i += 2) {
    pairs.push({ user: messages[i], bot: messages[i + 1] });
  }

  return (
    <div className="relative flex h-full w-full max-w-3xl flex-col">
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide flex-1 overflow-y-auto"
      >
        {pairs.map(({ user, bot }, idx) => (
          <MessagePair
            key={user.id}
            user={user}
            bot={bot}
            isLast={idx === pairs.length - 1}
            streamingId={streamingId}
            statusText={statusText}
            pairRef={idx === pairs.length - 1 ? lastPairRef : undefined}
          />
        ))}
      </div>

      {!isAtBottom && (
        <button
          onClick={scrollToBottom}
          className="animate-bounce-subtle absolute bottom-25 left-1/2 z-10 cursor-pointer rounded-full bg-linear-to-r from-indigo-500 to-violet-500 p-2 shadow-md transition hover:opacity-90"
        >
          <IconChevronDown size={18} className="text-white" />
        </button>
      )}

      <div className="shrink-0 border-t border-gray-100 bg-gray-50 px-4 py-4">
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          onCancel={handleCancel}
          isLoading={!!streamingId}
        />
      </div>
    </div>
  );
}
