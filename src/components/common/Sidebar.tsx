'use client';

import { deleteChatSession, getChatSessions } from '@/lib/apis/user';
import { useChatStore } from '@/store/chatStore';
import { ChatType } from '@/types/chat';
import { IconPlus, IconX } from '@tabler/icons-react';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ChatList from '../chat/ChatList';

export default function Sidebar() {
  const { id: chatId } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const [chatList, setChatList] = useState<ChatType[]>([]);
  const [loading, setLoading] = useState(true);
  const [justTitledChatId, setJustTitledChatId] = useState<string | null>(null);

  const { pendingTitleUpdate, setPendingTitleUpdate, chatListRefreshKey, setSessionTitle, removeCachedChat } =
    useChatStore();
  const isSidebarOpen = useChatStore((state) => state.isSidebarOpen);
  const setIsSidebarOpen = useChatStore((state) => state.setIsSidebarOpen);

  const fetchSessions = useCallback(async () => {
    try {
      const sessions = await getChatSessions();
      setChatList(sessions.map((s) => ({ title: s.title, chat_id: s.chat_id })));
      sessions.forEach((s) => setSessionTitle(s.chat_id, s.title));
    } finally {
      setLoading(false);
    }
  }, [setSessionTitle]);

  const handleDelete = async (id: string) => {
    if (chatId === id) {
      router.push('/');
    }
    setChatList((prev) => prev.filter((c) => c.chat_id !== id));
    removeCachedChat(id);
    await deleteChatSession(id).catch(() => {});
  };

  // 모바일에서 라우트 변경 시 사이드바 닫기
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname, setIsSidebarOpen]);

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
    setSessionTitle(pendingTitleUpdate.chatId, pendingTitleUpdate.title);
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
    <div
      className={twMerge(
        'flex flex-col border-r border-gray-200 bg-white',
        // 모바일: 전체 화면 오버레이 (top-0으로 헤더까지 덮음)
        'fixed inset-0 z-50 w-full transition-transform duration-300',
        // 데스크톱: 일반 레이아웃 흐름
        'md:relative md:inset-auto md:z-auto md:h-full md:w-80 md:translate-x-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      {/* 모바일 전용 헤더 (로고 + 닫기 버튼) */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-4 md:hidden">
        <div className="flex items-center">
          <Image src="/icon.png" alt="무물봇" width={40} height={40} unoptimized />
          <span className="text-lg font-bold">무물봇</span>
        </div>
        <button
          className="flex size-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
          onClick={() => setIsSidebarOpen(false)}
        >
          <IconX size={22} />
        </button>
      </div>

      {/* 새 채팅 버튼 */}
      <div className="h-20 shrink-0 border-b border-gray-200 p-4">
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
          loading={loading}
          onDelete={handleDelete}
          justTitledChatId={justTitledChatId}
          onTitleAnimationEnd={() => setJustTitledChatId(null)}
        />
      </div>
    </div>
  );
}
