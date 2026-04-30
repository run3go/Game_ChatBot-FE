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
  sessionTitles: Record<string, string>;
  setPendingMessage: (msg: string | null) => void;
  setCacheMessages: (chatId: string, messages: ChatMessage[]) => void;
  updateCacheMsg: (chatId: string, updater: (prev: ChatMessage[]) => ChatMessage[]) => void;
  removeCachedChat: (chatId: string) => void;
  resetChat: () => void;
  setPendingTitleUpdate: (
    update: { chatId: string; title: string } | null,
  ) => void;
  setLoadingTitleChatId: (chatId: string | null) => void;
  refreshChatList: () => void;
  setCallCount: (n: number) => void;
  refreshCallCount: () => void;
  setSessionTitle: (chatId: string, title: string) => void;
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
    sessionTitles: {},
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
    removeCachedChat: (chatId) =>
      set((state) => {
        const { [chatId]: _, ...rest } = state.messageCache;
        return { messageCache: rest };
      }),
    resetChat: () => set({ pendingMessage: null }),
    setPendingTitleUpdate: (update) => set({ pendingTitleUpdate: update }),
    setLoadingTitleChatId: (chatId) => set({ loadingTitleChatId: chatId }),
    refreshChatList: () =>
      set((state) => ({ chatListRefreshKey: state.chatListRefreshKey + 1 })),
    setCallCount: (n) => set({ callCount: n }),
    refreshCallCount: () =>
      set((state) => ({ callCountRefreshKey: state.callCountRefreshKey + 1 })),
    setSessionTitle: (chatId, title) =>
      set((state) => ({ sessionTitles: { ...state.sessionTitles, [chatId]: title } })),
  })),
);
