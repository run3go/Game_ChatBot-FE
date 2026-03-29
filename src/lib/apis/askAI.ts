type HistoryMessage = {
  role: 'user' | 'assistant';
  content: string;
  nicknames?: string[];
  keywords?: string[];
};

export const askAIStream = async (
  question: string,
  history: HistoryMessage[],
  onChunk: (chunk: string) => void,
  onStructured: (payload: unknown) => void,
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/ask/stream`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, history }),
      },
    );
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
        }
      }
    }
  } catch (e) {
    throw e;
  }
};
