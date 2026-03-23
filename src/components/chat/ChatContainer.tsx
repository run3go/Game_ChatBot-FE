'use client';

import Home from '@/components/home/Home';
import { askAI } from '@/lib/apis/askAI';
import { ChatMessage } from '@/types/chat';
import { IconMessageChatbotFilled } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import UIContainer from './UIContainer';

export default function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const handleSend = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: text,
    };
    const botMsgId = `${Date.now()}-bot`;
    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: botMsgId, role: 'bot', content: '답변을 가져오는 중입니다...' },
    ]);

    const data = await askAI(text);
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === botMsgId ? { ...msg, content: '', result: data } : msg,
      ),
    );
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-full w-full max-w-3xl flex-col">
      {/* 메시지 영역 */}
      <div className="scrollbar-hide flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <Home onSend={handleSend} />
        ) : (
          <div className="flex flex-col gap-6 px-6 py-6">
            {messages.map((msg) =>
              msg.role === 'user' ? (
                /* 사용자 메시지 */
                <div key={msg.id} className="flex justify-end mt-5">
                  <div className="max-w-[75%] rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm">
                    {msg.content}
                  </div>
                </div>
              ) : (
                /* 봇 메시지 */
                <div key={msg.id} className="flex items-start">
                  <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 shadow-sm">
                    <IconMessageChatbotFilled size={18} color="white" />
                  </div>
                  <div className="w-full py-2.5">
                    <div className="px-4 text-sm text-gray-700">
                      {msg.content}
                    </div>
                    <UIContainer result={msg.result} />
                  </div>
                </div>
              ),
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* 입력창 — 항상 하단에 고정 */}
      <div className="shrink-0 border-t border-gray-100 bg-gray-50 px-4 py-4">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
