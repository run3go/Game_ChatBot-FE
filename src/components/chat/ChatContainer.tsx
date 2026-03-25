'use client';

import { askAIStream } from '@/lib/apis/askAI';
import { useChatStore } from '@/store/chatStore';
import { ChatMessage } from '@/types/chat';
import { IconMessageChatbotFilled } from '@tabler/icons-react';
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
  const [lastUserMsgId, setLastUserMsgId] = useState<string | null>(null);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [pendingContext, setPendingContext] = useState<Record<
    string,
    unknown
  > | null>(null);

  // 봇 메시지 업데이트
  const updateBotMsg = (id: string, update: Partial<ChatMessage>) =>
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, ...update } : msg)),
    );

  // 사용자 질문 전송 및 답변 반환
  const handleSend = async (text: string) => {
    const userMsgId = `${Date.now()}-user`;
    const botMsgId = `${Date.now()}-bot`;

    setLastUserMsgId(userMsgId);
    setStreamingId(botMsgId);
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: 'user', content: text },
      { id: botMsgId, role: 'bot', content: '' },
    ]);

    const currentPending = pendingContext;
    setPendingContext(null);

    let botContent = '';
    let botStructuredLabel = '';

    const onChunk = (chunk: string) => {
      botContent += chunk;
      updateBotMsg(botMsgId, { content: botContent });
    };

    const onStructured = (payload: unknown) => {
      const p = payload as {
        ui_type: string;
        message?: string;
        pending?: Record<string, unknown>;
        nickname?: string;
      };

      if (p.ui_type === 'FOLLOW_UP') {
        botContent = p.message ?? '';
        setPendingContext(p.pending ?? null);
        updateBotMsg(botMsgId, { content: botContent });
      } else {
        botStructuredLabel = p.nickname
          ? `[${p.nickname}의 ${p.ui_type} 데이터 표시]`
          : `[${p.ui_type} 데이터 표시]`;
        updateBotMsg(botMsgId, { content: '', result: payload as never });
      }
    };

    try {
      await askAIStream(
        text,
        history,
        onChunk,
        onStructured,
        currentPending ?? undefined,
      );

      setHistory((prev) =>
        [
          ...prev,
          { role: 'user' as const, content: text },
          {
            role: 'assistant' as const,
            content: botContent || botStructuredLabel,
          },
        ].slice(-10),
      );
    } catch {
      updateBotMsg(botMsgId, {
        content: '죄송해요, 요청을 처리하지 못했어요. 다시 시도해 주세요.',
      });
    } finally {
      setStreamingId(null);
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

  const pairs: { user: ChatMessage; bot?: ChatMessage }[] = [];
  for (let i = 0; i < messages.length; i += 2) {
    pairs.push({ user: messages[i], bot: messages[i + 1] });
  }

  return (
    <div className="flex h-full w-full max-w-3xl flex-col">
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
              <div className="max-w-[75%] rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm">
                {user.content}
              </div>
            </div>

            {bot && (
              <div className="mt-6 flex items-start">
                <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 shadow-sm">
                  <IconMessageChatbotFilled size={18} color="white" />
                </div>
                <div className="w-full py-2.5">
                  {streamingId === bot.id && bot.content === '' ? (
                    <div className="flex items-center gap-1 px-4 py-1">
                      <span className="size-2 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.3s]" />
                      <span className="size-2 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.15s]" />
                      <span className="size-2 animate-bounce rounded-full bg-indigo-400" />
                    </div>
                  ) : (
                    <>
                      <TypingText content={bot.content} />
                      <UIContainer result={bot.result} />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="shrink-0 border-t border-gray-100 bg-gray-50 px-4 py-4">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
