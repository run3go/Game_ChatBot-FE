'use client';

import { ChatMessage } from '@/types/chat';
import { IconMessageChatbotFilled } from '@tabler/icons-react';
import React, { RefObject } from 'react';
import ReactMarkdown from 'react-markdown';
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
      className={`flex flex-col px-3 py-4 sm:px-6 sm:py-6 ${isLast ? 'min-h-full' : ''}`}
    >
      <div className="flex justify-end">
        <div className="max-w-[75%] rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-medium whitespace-pre-wrap text-white shadow-sm">
          {user.content}
        </div>
      </div>

      {bot && (
        <div className={`mt-6 flex gap-2 ${streamingId === bot.id && bot.content === '' ? 'flex-row items-center' : 'flex-col sm:flex-row sm:items-start sm:gap-0'}`}>
          <div
            className={`grid size-8 shrink-0 place-items-center self-start rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 shadow-sm ${
              streamingId === bot.id ? 'animate-pulse' : ''
            }`}
          >
            <IconMessageChatbotFilled size={18} color="white" />
          </div>
          <div className="w-full pb-1.5">
            {streamingId === bot.id && bot.content === '' ? (
              <div className="prose prose-sm pt-1 pl-2 text-gray-700 sm:px-4">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}

                >
                  {statusText}
                </ReactMarkdown>
              </div>
            ) : (
              <>
                <UIContainer result={bot.result} />
                {bot.content && (
                  <div className="prose prose-sm pt-1 pl-10 text-gray-700 sm:px-4">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
    
                    >
                      {bot.content}
                    </ReactMarkdown>
                  </div>
                )}
              </>
            )}
            {bot.data_updated_at && (() => {
              const d = new Date(bot.data_updated_at);
              if (isNaN(d.getTime())) return null;
              return (
                <div className="mt-2 flex justify-end px-4">
                  <span className="text-xs text-gray-400">
                    {d.toLocaleString('ko-KR', {
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}{' '}
                    갱신
                  </span>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
});
