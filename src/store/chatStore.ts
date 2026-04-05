import { ChatMessage } from '@/types/chat';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ChatStore {
  pendingMessage: string | null;
  messages: ChatMessage[];
  pendingTitleUpdate: { chatId: string; title: string } | null;
  isLoadingTitle: boolean;
  chatListRefreshKey: number;
  setPendingMessage: (msg: string | null) => void;
  setMessages: (updater: (prev: ChatMessage[]) => ChatMessage[]) => void;
  resetChat: () => void;
  setPendingTitleUpdate: (update: { chatId: string; title: string } | null) => void;
  setIsLoadingTitle: (loading: boolean) => void;
  refreshChatList: () => void;
}

export const useChatStore = create<ChatStore>()(
  devtools((set) => ({
    pendingMessage: null,
    messages: [],
    pendingTitleUpdate: null,
    isLoadingTitle: false,
    chatListRefreshKey: 0,
    setPendingMessage: (msg) => set({ pendingMessage: msg }),
    setMessages: (updater) =>
      set((state) => ({ messages: updater(state.messages) })),
    resetChat: () => set({ pendingMessage: null, messages: [] }),
    setPendingTitleUpdate: (update) => set({ pendingTitleUpdate: update }),
    setIsLoadingTitle: (loading) => set({ isLoadingTitle: loading }),
    refreshChatList: () =>
      set((state) => ({ chatListRefreshKey: state.chatListRefreshKey + 1 })),
  })),
);
