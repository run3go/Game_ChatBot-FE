import { ChatMessage } from '@/types/chat';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useChatScroll(messages: ChatMessage[]) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastPairRef = useRef<HTMLDivElement>(null);
  const [lastUserMsgId, setLastUserMsgId] = useState<string | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const checkIsAtBottom = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 40);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    const pair = lastPairRef.current;
    if (!el || !pair) return;
    el.scrollTo({ top: pair.offsetTop, behavior: 'smooth' });
  }, [lastUserMsgId]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkIsAtBottom);
    return () => el.removeEventListener('scroll', checkIsAtBottom);
  }, [checkIsAtBottom]);

  useEffect(() => {
    checkIsAtBottom();
  }, [messages, checkIsAtBottom]);

  const scrollToBottom = () =>
    scrollContainerRef.current?.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });

  return { scrollContainerRef, lastPairRef, isAtBottom, scrollToBottom, setLastUserMsgId };
}
