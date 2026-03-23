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
