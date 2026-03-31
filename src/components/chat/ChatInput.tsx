'use client';

import { IconPlayerStopFilled, IconSend } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  onCancel,
  isLoading,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend?.();
    }
  };

  return (
    <div className="w-full">
      <div className={twMerge(
        'flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors',
        isLoading ? 'border-indigo-200 bg-indigo-50' : 'border-gray-300 bg-white',
      )}>
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="챗봇에게 물어보기"
          className={twMerge(
            'flex-1 resize-none bg-transparent text-sm outline-none transition-colors',
            'max-h-40 overflow-y-auto leading-relaxed',
            isLoading ? 'cursor-not-allowed text-gray-400' : 'text-gray-700 placeholder:text-gray-400',
          )}
        />
        {isLoading ? (
          <button
            onClick={onCancel}
            className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg bg-linear-to-r from-indigo-500 to-violet-500 text-white transition-opacity hover:opacity-90"
          >
            <IconPlayerStopFilled size={16} />
          </button>
        ) : (
          <button
            onClick={() => onSend?.()}
            disabled={!value.trim()}
            className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg bg-linear-to-r from-indigo-500 to-violet-500 text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <IconSend size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
