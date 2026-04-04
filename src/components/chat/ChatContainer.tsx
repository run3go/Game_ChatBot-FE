'use client';

import { askAIStream, pollDagStatus, triggerUpdate } from '@/lib/apis/askAI';
import { useChatStore } from '@/store/chatStore';
import { ChatMessage } from '@/types/chat';
import { IconChevronDown, IconMessageChatbotFilled } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import TypingText from './TypingText';
import UIContainer from './UIContainer';

export default function ChatContainer() {
  const {
    messages,
    history,
    setMessages,
    setHistory,
    pendingMessage,
    setPendingMessage,
  } = useChatStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastPairRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [lastUserMsgId, setLastUserMsgId] = useState<string | null>(null);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [statusText, setStatusText] = useState('');
  const [isAtBottom, setIsAtBottom] = useState(true);
  const pendingNicknameRef = useRef<string | null>(null);
  const pendingQuestionRef = useRef<string | null>(null);

  // 봇 메시지 업데이트
  const updateBotMsg = (id: string, update: Partial<ChatMessage>) =>
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, ...update } : msg)),
    );

  const handleCancel = () => {
    abortControllerRef.current?.abort();
  };

  // 사용자 질문 전송 및 답변 반환
  const handleSend = async (text?: string) => {
    const question = text ?? inputValue;
    if (!question.trim()) return;

    // 수집 대기 중인 캐릭터가 있고 긍정 응답이면 trigger-update 호출
    if (pendingNicknameRef.current && question.trim() === '예') {
      const nickname = pendingNicknameRef.current;
      const originalQuestion = pendingQuestionRef.current;
      pendingNicknameRef.current = null;
      pendingQuestionRef.current = null;
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

    pendingNicknameRef.current = null;

    const userMsgId = `${Date.now()}-user`;
    const botMsgId = `${Date.now()}-bot`;

    const controller = new AbortController();
    abortControllerRef.current = controller;
    let timedOut = false;
    const timeoutId = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 30000);

    setLastUserMsgId(userMsgId);
    setStreamingId(botMsgId);
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: 'user', content: question },
      { id: botMsgId, role: 'bot', content: '' },
    ]);

    let botContent = '';
    let botStructuredLabel = '';
    let userMsgNicknames: string[] | undefined;
    let userMsgKeywords: string[] | undefined;

    const onChunk = (chunk: string) => {
      botContent += chunk;
      updateBotMsg(botMsgId, { content: botContent });
    };

    const onStructured = (payload: unknown) => {
      const p = payload as {
        ui_type: string;
        nickname?: string;
        nicknames?: string[];
        keywords?: string[];
      };

      if (p.nicknames?.length) userMsgNicknames = p.nicknames;
      if (p.keywords?.length) userMsgKeywords = p.keywords;

      botStructuredLabel = p.nickname
        ? `[${p.nickname}의 ${p.ui_type} 데이터 표시]`
        : `[${p.ui_type} 데이터 표시]`;
      updateBotMsg(botMsgId, { content: '', result: payload as never });
    };

    const onConfirmCollect = (nickname: string) => {
      pendingNicknameRef.current = nickname;
      pendingQuestionRef.current = question;
    };

    const onStatus = (status: string) => {
      setStatusText(status);
    };

    try {
      await askAIStream(
        question,
        history,
        onChunk,
        onStructured,
        onConfirmCollect,
        onStatus,
        controller.signal,
      );

      setHistory((prev) =>
        [
          ...prev,
          {
            role: 'user' as const,
            content: question,
            ...(userMsgNicknames && { nicknames: userMsgNicknames }),
            ...(userMsgKeywords && { keywords: userMsgKeywords }),
          },
          {
            role: 'assistant' as const,
            content: botContent || botStructuredLabel,
          },
        ].slice(-10),
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
      if (!aborted) setInputValue('');
      abortControllerRef.current = null;
    }
  };

  // 홈에서 넘어온 첫 메시지 자동 전송
  useEffect(() => {
    if (pendingMessage) {
      setPendingMessage(null);
      handleSend(pendingMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const pair = lastPairRef.current;
    if (!container || !pair) return;
    container.scrollTo({ top: pair.offsetTop, behavior: 'smooth' });
  }, [lastUserMsgId]);

  const checkIsAtBottom = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    setIsAtBottom(scrollHeight - scrollTop - clientHeight < 40);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener('scroll', checkIsAtBottom);
    return () => container.removeEventListener('scroll', checkIsAtBottom);
  }, []);

  useEffect(() => {
    checkIsAtBottom();
  }, [messages]);

  const scrollToBottom = () => {
    scrollContainerRef.current?.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
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
          <div
            key={user.id}
            ref={idx === pairs.length - 1 ? lastPairRef : null}
            className={`flex flex-col px-6 py-6 ${idx === pairs.length - 1 ? 'min-h-full' : ''}`}
          >
            <div className="flex justify-end">
              <div className="max-w-[75%] rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-medium whitespace-pre-wrap text-white shadow-sm">
                {user.content}
              </div>
            </div>

            {bot && (
              <div className="mt-6 flex items-start">
                <div
                  className={`grid size-8 shrink-0 place-items-center rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 shadow-sm ${streamingId === bot.id ? 'animate-pulse' : ''}`}
                >
                  <IconMessageChatbotFilled size={18} color="white" />
                </div>
                <div className="w-full pb-1.5">
                  {streamingId === bot.id && bot.content === '' ? (
                    <div className="pt-1">
                      <TypingText
                        key={statusText}
                        content={statusText}
                        speed={30}
                      />
                    </div>
                  ) : (
                    <>
                      <UIContainer result={bot.result} />
                      {bot.content && (
                        <div className="pt-1">
                          <TypingText content={bot.content} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
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
