'use client';

import ChatInput from '@/components/chat/ChatInput';
import Home from '@/components/home/Home';
import { initUserId } from '@/lib/userId';
import { createChatSession } from '@/lib/apis/user';
import { useChatStore } from '@/store/chatStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const { setPendingMessage } = useChatStore();
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  const handleSend = async (text?: string) => {
    const question = text ?? inputValue;
    if (!question.trim()) return;
    const chatId = await createChatSession();
    setPendingMessage(question);
    router.push(`/chat/${chatId}`);
  };

  useEffect(() => {
    initUserId();
  }, []);

  return (
    <div className="flex h-full w-full max-w-3xl flex-col">
      <div className="scrollbar-hide flex-1 overflow-y-auto">
        <Home onSend={(text) => handleSend(text)} />
      </div>
      <div className="shrink-0 border-t border-gray-100 bg-gray-50 px-4 py-4">
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}
