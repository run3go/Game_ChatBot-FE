'use client';

import ChatInput from '@/components/chat/ChatInput';
import Home from '@/components/home/Home';
import { useChatStore } from '@/store/chatStore';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { setChatId, setPendingMessage } = useChatStore();
  const router = useRouter();

  const handleSend = (text: string) => {
    const id = crypto.randomUUID();
    setChatId(id);
    setPendingMessage(text);
    router.push(`/chat/${id}`);
  };

  return (
    <div className="flex h-full w-full max-w-3xl flex-col">
      <div className="scrollbar-hide flex-1 overflow-y-auto">
        <Home onSend={handleSend} />
      </div>
      <div className="shrink-0 border-t border-gray-100 bg-gray-50 px-4 py-4">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
