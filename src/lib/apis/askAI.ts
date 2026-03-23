export const askAI = async (question: string) => {
  try {
    const res = await fetch(
      `http://localhost:8000/ask?question=${encodeURIComponent(question)}`,
    );
    const data = await res.json();
    return data.result;
  } catch (e) {
    console.error(e);
  }
};

export const askAIStream = async (
  question: string,
  onChunk: (chunk: string) => void,
  onStructured: (payload: unknown) => void,
) => {
  try {
    const res = await fetch(
      `http://localhost:8000/ask/stream?question=${encodeURIComponent(question)}`,
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
    console.error(e);
  }
};
