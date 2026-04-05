'use client';

import { deleteChatSession, getChatSessions } from '@/lib/apis/user';
import { useChatStore } from '@/store/chatStore';
import { IconPlus } from '@tabler/icons-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ChatList from '../chat/ChatList';

export interface ChatType {
  title: string | null;
  chat_id: string;
}

export default function Sidebar() {
  const { id: chatId } = useParams();
  const router = useRouter();

  const [chatList, setChatList] = useState<ChatType[]>([]);
  const [justTitledChatId, setJustTitledChatId] = useState<string | null>(null);

  const { pendingTitleUpdate, setPendingTitleUpdate } = useChatStore();

  useEffect(() => {
    if (!pendingTitleUpdate) return;
    setChatList((prev) =>
      prev.map((c) =>
        c.chat_id === pendingTitleUpdate.chatId
          ? { ...c, title: pendingTitleUpdate.title }
          : c,
      ),
    );
    setJustTitledChatId(pendingTitleUpdate.chatId);
    setPendingTitleUpdate(null);
  }, [pendingTitleUpdate, setPendingTitleUpdate]);

  const fetchSessions = async () => {
    const sessions = await getChatSessions();
    setChatList(sessions.map((s) => ({ title: s.title, chat_id: s.chat_id })));
  };

  const handleDelete = async (id: string) => {
    if (chatId === id) {
      router.push('/');
    }
    setChatList((prev) => prev.filter((c) => c.chat_id !== id));
    await deleteChatSession(id).catch(() => {});
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // 홈에서 새 세션 생성 후 목록에 없으면 re-fetch
  useEffect(() => {
    if (chatId && !chatList.some((c) => c.chat_id === chatId)) {
      fetchSessions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);
  return (
    <div className="flex h-full w-80 flex-col border-r border-gray-200">
      <div className="h-20 border-b border-gray-200 p-4">
        <button
          className={twMerge(
            'flex size-full cursor-pointer items-center justify-center rounded-lg bg-linear-to-r from-indigo-500 to-violet-500',
            'transition-all duration-200 hover:from-indigo-400 hover:to-purple-400 hover:shadow-md',
          )}
          onClick={() => router.push('/')}
        >
          <IconPlus color="white" />
          <span className="ml-3 text-white">새 채팅</span>
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-grey-500 text-sm">채팅</h2>
        <ChatList
          list={chatList}
          onDelete={handleDelete}
          justTitledChatId={justTitledChatId}
          onTitleAnimationEnd={() => setJustTitledChatId(null)}
        />
      </div>
    </div>
  );
}
