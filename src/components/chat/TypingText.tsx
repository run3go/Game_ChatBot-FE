'use client';


import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface TypingTextProps {
  content: string;
  speed?: number; // ms per character
}

export default function TypingText({ content }: TypingTextProps) {
  return (
    <div className="prose prose-sm px-4 text-gray-700">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
