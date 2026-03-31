type HistoryMessage = {
  role: 'user' | 'assistant';
  content: string;
  nicknames?: string[];
  keywords?: string[];
};

export const triggerUpdate = async (characterName: string): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/trigger-update`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ character_name: characterName }),
    },
  );
  if (!res.ok) throw new Error(await res.text());
};

export const askAIStream = async (
  question: string,
  history: HistoryMessage[],
  onChunk: (chunk: string) => void,
  onStructured: (payload: unknown) => void,
  onConfirmCollect: (nickname: string) => void,
  onStatus: (status: string) => void,
  signal?: AbortSignal,
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/ask/stream`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, history }),
        signal,
      },
    );
    console.log(res);
    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const raw = line.slice(6).trim();
        if (raw === '[DONE]') return;

        const parsed = JSON.parse(raw);
        if (parsed.type === 'text') {
          onChunk(parsed.content);
        } else if (parsed.type === 'structured') {
          onStructured(parsed.payload);
        } else if (parsed.type === 'confirm_collect') {
          onConfirmCollect(parsed.nickname);
        } else if (parsed.type === 'status') {
          onStatus(parsed.content);
        }
      }
    }
  } catch (e) {
    if (e instanceof DOMException && e.name === 'AbortError') return;
    throw e;
  }
};
