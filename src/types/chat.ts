export type ChatRole = 'user' | 'bot';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  ui_type?: string;
};
