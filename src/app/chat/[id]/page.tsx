'use client';

import ChatContainer from '@/components/chat/ChatContainer';
import { useChatStore } from '@/store/chatStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatPage() {
  const router = useRouter();
  const { messages, pendingMessage } = useChatStore();

  useEffect(() => {
    if (messages.length === 0 && !pendingMessage) {
      router.replace('/');
    }
  }, [messages.length, pendingMessage, router]);

  if (messages.length === 0 && !pendingMessage) return null;

  return <ChatContainer />;
}
