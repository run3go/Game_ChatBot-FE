import { getUserId } from '@/lib/userId';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ChatSession = {
  chat_id: string;
  title: string;
  created_at: string;
};

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  result_json: unknown | null;
};

export const createChatSession = async (): Promise<string> => {
  const res = await fetch(`${BASE_URL}/chat/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: getUserId() }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data.chat_id as string;
};

export const getChatSessions = async (): Promise<ChatSession[]> => {
  const res = await fetch(
    `${BASE_URL}/chat/sessions?user_id=${getUserId()}`,
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getChatMessages = async (chatId: string): Promise<ChatMessage[]> => {
  const res = await fetch(
    `${BASE_URL}/chat/sessions/${chatId}/messages?user_id=${getUserId()}`,
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const deleteChatSession = async (chatId: string): Promise<void> => {
  await fetch(`${BASE_URL}/chat/sessions/${chatId}?user_id=${getUserId()}`, {
    method: 'DELETE',
  });
};

export const getRecentNickname = async (): Promise<string | null> => {
  try {
    const res = await fetch(
      `${BASE_URL}/users/recent-nickname?user_id=${getUserId()}`,
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.nickname ?? null;
  } catch {
    return null;
  }
};
