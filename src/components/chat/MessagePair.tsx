'use client';

import { ChatMessage } from '@/types/chat';
import { IconMessageChatbotFilled } from '@tabler/icons-react';
import React, { RefObject } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import UIContainer from './UIContainer';

interface MessagePairProps {
  user: ChatMessage;
  bot?: ChatMessage;
  isLast: boolean;
  streamingId: string | null;
  statusText: string;
  pairRef?: RefObject<HTMLDivElement | null>;
}

export default React.memo(function MessagePair({
  user,
  bot,
  isLast,
  streamingId,
  statusText,
  pairRef,
}: MessagePairProps) {
  return (
    <div
      ref={pairRef}
      className={`flex flex-col px-6 py-6 ${isLast ? 'min-h-full' : ''}`}
    >
      <div className="flex justify-end">
        <div className="max-w-[75%] rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-medium whitespace-pre-wrap text-white shadow-sm">
          {user.content}
        </div>
      </div>

      {bot && (
        <div className="mt-6 flex items-start">
          <div
            className={`grid size-8 shrink-0 place-items-center rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 shadow-sm ${
              streamingId === bot.id ? 'animate-pulse' : ''
            }`}
          >
            <IconMessageChatbotFilled size={18} color="white" />
          </div>
          <div className="w-full pb-1.5">
            {streamingId === bot.id && bot.content === '' ? (
              <div className="prose prose-sm px-4 pt-1 text-gray-700">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {statusText}
                </ReactMarkdown>
              </div>
            ) : (
              <>
                <UIContainer result={bot.result} />
                {bot.content && (
                  <div className="prose prose-sm px-4 pt-1 text-gray-700">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {bot.content}
                    </ReactMarkdown>
                  </div>
                )}
              </>
            )}
            {bot.data_updated_at && (
              <div className="mt-2 flex justify-end px-4">
                <span className="text-xs text-gray-400">
                  {new Date(bot.data_updated_at).toLocaleString('ko-KR', {
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}{' '}
                  갱신
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
