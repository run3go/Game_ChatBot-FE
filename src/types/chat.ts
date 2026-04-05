import { UIResult } from '@/components/chat/UIContainer';

export type ChatRole = 'user' | 'bot';

export type ChatType = {
  title: string | null;
  chat_id: string;
};

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  ui_type?: string;
  result?: UIResult;
};
