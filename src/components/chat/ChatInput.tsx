'use client';

import { IconSend } from '@tabler/icons-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface ChatInputProps {
  onSend?: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (!value.trim()) return;
    onSend?.(value.trim());
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="챗봇에게 물어보기"
          className={twMerge(
            'flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400',
          )}
        />
        <button
          onClick={handleSend}
          disabled={!value.trim()}
          className="grid size-9 place-items-center rounded-lg bg-linear-to-r from-indigo-500 to-violet-500 text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <IconSend size={18} />
        </button>
      </div>
      {/* <button className="mt-2 flex items-center gap-1.5 text-xs text-gray-400 transition-colors hover:text-gray-600">
        <IconPhoto size={14} />
        이미지 검색
      </button> */}
    </div>
  );
}
