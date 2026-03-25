import { ChatMessage } from '@/types/chat';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ChatStore {
  chatId: string | null;
  pendingMessage: string | null;
  messages: ChatMessage[];
  history: { role: 'user' | 'assistant'; content: string }[];
  setChatId: (id: string) => void;
  setPendingMessage: (msg: string | null) => void;
  setMessages: (updater: (prev: ChatMessage[]) => ChatMessage[]) => void;
  setHistory: (
    updater: (
      prev: { role: 'user' | 'assistant'; content: string }[],
    ) => { role: 'user' | 'assistant'; content: string }[],
  ) => void;
  resetChat: () => void;
}

export const useChatStore = create<ChatStore>()(
  devtools((set) => ({
    chatId: null,
    pendingMessage: null,
    messages: [],
    history: [],
    setChatId: (id) => set({ chatId: id }),
    setPendingMessage: (msg) => set({ pendingMessage: msg }),
    setMessages: (updater) =>
      set((state) => ({ messages: updater(state.messages) })),
    setHistory: (updater) =>
      set((state) => ({ history: updater(state.history) })),
    resetChat: () =>
      set({ chatId: null, pendingMessage: null, messages: [], history: [] }),
  })),
);
