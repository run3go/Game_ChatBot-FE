import { UIResult } from '@/components/chat/UIContainer';

export type ChatRole = 'user' | 'bot';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  ui_type?: string;
  result?: UIResult;
};
