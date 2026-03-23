'use client';

import Home from '@/components/home/Home';
import { askAIStream } from '@/lib/apis/askAI';
import { ChatMessage } from '@/types/chat';
import { IconMessageChatbotFilled } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChatInput from './ChatInput';
import UIContainer from './UIContainer';

export default function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastPairRef = useRef<HTMLDivElement>(null);
  const [lastUserMsgId, setLastUserMsgId] = useState<string | null>(null);

  const handleSend = async (text: string) => {
    const userMsgId = `${Date.now()}-user`;
    const userMsg: ChatMessage = { id: userMsgId, role: 'user', content: text };
    const botMsgId = `${Date.now()}-bot`;
    setLastUserMsgId(userMsgId);
    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: botMsgId, role: 'bot', content: '' },
    ]);

    await askAIStream(
      text,
      (chunk) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId ? { ...msg, content: msg.content + chunk } : msg,
          ),
        );
      },
      (payload) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId ? { ...msg, content: '', result: payload as never } : msg,
          ),
        );
      },
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    const pair = lastPairRef.current;
    if (!container || !pair) return;
    container.scrollTo({ top: pair.offsetTop, behavior: 'smooth' });
  }, [lastUserMsgId]);

  // 메시지를 [user, bot] 쌍으로 그룹화
  const pairs: { user: ChatMessage; bot?: ChatMessage }[] = [];
  for (let i = 0; i < messages.length; i += 2) {
    pairs.push({ user: messages[i], bot: messages[i + 1] });
  }

  return (
    <div className="flex h-full w-full max-w-3xl flex-col">
      {/* 메시지 영역 */}
      <div ref={scrollContainerRef} className="scrollbar-hide flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <Home onSend={handleSend} />
        ) : (
          pairs.map(({ user, bot }, idx) => (
            <div
              key={user.id}
              ref={idx === pairs.length - 1 ? lastPairRef : null}
              className={`flex flex-col px-6 py-6 ${idx === pairs.length - 1 ? 'min-h-full' : ''}`}
            >
              {/* 사용자 메시지 — 우측 상단 */}
              <div className="flex justify-end">
                <div className="max-w-[75%] rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm">
                  {user.content}
                </div>
              </div>

              {/* 봇 메시지 — 아래 공간 채움 */}
              {bot && (
                <div className="mt-6 flex items-start">
                  <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 shadow-sm">
                    <IconMessageChatbotFilled size={18} color="white" />
                  </div>
                  <div className="w-full py-2.5">
                    <div className="prose prose-sm px-4 text-gray-700">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{bot.content}</ReactMarkdown>
                    </div>
                    <UIContainer result={bot.result} />
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* 입력창 — 항상 하단에 고정 */}
      <div className="shrink-0 border-t border-gray-100 bg-gray-50 px-4 py-4">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
