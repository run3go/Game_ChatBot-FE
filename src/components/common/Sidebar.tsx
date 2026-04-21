'use client';

import { deleteChatSession, getChatSessions } from '@/lib/apis/user';
import { useChatStore } from '@/store/chatStore';
import { ChatType } from '@/types/chat';
import { IconPlus } from '@tabler/icons-react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ChatList from '../chat/ChatList';

export default function Sidebar() {
  const { id: chatId } = useParams();
  const router = useRouter();

  const [chatList, setChatList] = useState<ChatType[]>([]);
  const [justTitledChatId, setJustTitledChatId] = useState<string | null>(null);

  const { pendingTitleUpdate, setPendingTitleUpdate, chatListRefreshKey } =
    useChatStore();

  const fetchSessions = useCallback(async () => {
    const sessions = await getChatSessions();
    setChatList(sessions.map((s) => ({ title: s.title, chat_id: s.chat_id })));
  }, []);

  const handleDelete = async (id: string) => {
    if (chatId === id) {
      router.push('/');
    }
    setChatList((prev) => prev.filter((c) => c.chat_id !== id));
    await deleteChatSession(id).catch(() => {});
  };

  // 세션에서 최초 질문 시, 타이틀 업데이트
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

  // 질문을 할 때마다 해당 채팅을 최상단으로 이동
  useEffect(() => {
    if (chatListRefreshKey === 0 || !chatId) return;
    setChatList((prev) => {
      const idx = prev.findIndex((c) => c.chat_id === chatId);
      if (idx <= 0) return prev;
      return [prev[idx], ...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatListRefreshKey]);

  // 홈에서 새 세션 생성 후 목록에 없으면 re-fetch
  useEffect(() => {
    if (!chatList.some((c) => c.chat_id === chatId)) {
      fetchSessions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId, fetchSessions]);

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
      <div className="flex min-h-0 flex-1 flex-col p-4">
        <h2 className="text-grey-500 shrink-0 text-sm">채팅</h2>
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
