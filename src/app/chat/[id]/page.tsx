'use client';

import ChatContainer from '@/components/chat/ChatContainer';
import { useParams } from 'next/navigation';

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  return <ChatContainer key={id} />;
}
