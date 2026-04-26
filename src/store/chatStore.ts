import { ChatMessage } from '@/types/chat';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ChatStore {
  pendingMessage: string | null;
  messageCache: Record<string, ChatMessage[]>;
  pendingTitleUpdate: { chatId: string; title: string } | null;
  loadingTitleChatId: string | null;
  chatListRefreshKey: number;
  callCount: number | null;
  callCountRefreshKey: number;
  setPendingMessage: (msg: string | null) => void;
  setCacheMessages: (chatId: string, messages: ChatMessage[]) => void;
  updateCacheMsg: (chatId: string, updater: (prev: ChatMessage[]) => ChatMessage[]) => void;
  resetChat: () => void;
  setPendingTitleUpdate: (
    update: { chatId: string; title: string } | null,
  ) => void;
  setLoadingTitleChatId: (chatId: string | null) => void;
  refreshChatList: () => void;
  setCallCount: (n: number) => void;
  refreshCallCount: () => void;
}

export const useChatStore = create<ChatStore>()(
  devtools((set) => ({
    pendingMessage: null,
    messageCache: {},
    pendingTitleUpdate: null,
    loadingTitleChatId: null,
    chatListRefreshKey: 0,
    callCount: null,
    callCountRefreshKey: 0,
    setPendingMessage: (msg) => set({ pendingMessage: msg }),
    setCacheMessages: (chatId, messages) =>
      set((state) => ({
        messageCache: { ...state.messageCache, [chatId]: messages },
      })),
    updateCacheMsg: (chatId, updater) =>
      set((state) => ({
        messageCache: {
          ...state.messageCache,
          [chatId]: updater(state.messageCache[chatId] ?? []),
        },
      })),
    resetChat: () => set({ pendingMessage: null }),
    setPendingTitleUpdate: (update) => set({ pendingTitleUpdate: update }),
    setLoadingTitleChatId: (chatId) => set({ loadingTitleChatId: chatId }),
    refreshChatList: () =>
      set((state) => ({ chatListRefreshKey: state.chatListRefreshKey + 1 })),
    setCallCount: (n) => set({ callCount: n }),
    refreshCallCount: () =>
      set((state) => ({ callCountRefreshKey: state.callCountRefreshKey + 1 })),
  })),
);
