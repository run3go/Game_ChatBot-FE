'use client';

import { useChatStore } from '@/store/chatStore';
import { ChatType } from '@/types/chat';
import { IconX } from '@tabler/icons-react';
import { useParams, useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

interface ChatListProps {
  list: ChatType[];
  onDelete: (chatId: string) => void;
  justTitledChatId: string | null;
  onTitleAnimationEnd: () => void;
}

export default function ChatList({
  list,
  onDelete,
  justTitledChatId,
  onTitleAnimationEnd,
}: ChatListProps) {
  const router = useRouter();
  const { id: currentChatId } = useParams();
  const isLoadingTitle = useChatStore((state) => state.isLoadingTitle);

  return (
    <ul className="mt-3 flex flex-col">
      {list.map((item) => {
        const isSkeleton = isLoadingTitle && item.chat_id === currentChatId;
        return isSkeleton ? (
          <li
            key={item.chat_id}
            className="animate-shimmer border-primary-500 rounded-lg border-l-4 p-3"
          >
            <div className="h-5" />
          </li>
        ) : (
          <li
            key={item.chat_id}
            className={twMerge(
              'group flex cursor-pointer items-center justify-between rounded-lg border-l-4 border-transparent bg-white p-3 hover:bg-gray-100 hover:shadow-sm',
              currentChatId === item.chat_id &&
                'border-primary-500 bg-primary-100 shadow-sm',
            )}
            onClick={() => router.push(`/chat/${item.chat_id}`)}
          >
            <h3
              className={twMerge(
                'truncate text-sm font-medium text-gray-800',
                item.chat_id === justTitledChatId && 'animate-title-in',
              )}
              onAnimationEnd={() => {
                if (item.chat_id === justTitledChatId) onTitleAnimationEnd();
              }}
            >
              {item.title}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.chat_id);
              }}
              className="ml-2 shrink-0 cursor-pointer rounded p-0.5 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"
            >
              <IconX size={14} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
