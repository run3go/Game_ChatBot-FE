'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface TypingTextProps {
  content: string;
  speed?: number; // ms per character
}

export default function TypingText({ content, speed = 15 }: TypingTextProps) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (displayed.length >= content.length) return;

    const timeout = setTimeout(() => {
      setDisplayed(content.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, content, speed]);

  return (
    <div className="prose prose-sm px-4 text-gray-700">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {displayed}
      </ReactMarkdown>
    </div>
  );
}
