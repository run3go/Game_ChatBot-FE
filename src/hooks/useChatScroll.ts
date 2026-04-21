import { ChatMessage } from '@/types/chat';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useChatScroll(messages: ChatMessage[]) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastPairRef = useRef<HTMLDivElement>(null);
  const [lastUserMsgId, setLastUserMsgId] = useState<string | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const initialScrollDone = useRef(false);

  const checkIsAtBottom = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 40);
  }, []);

  // 최초 메시지 로드 시 즉시 최하단으로 이동
  useEffect(() => {
    if (initialScrollDone.current || !messages.length) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'instant' });
    initialScrollDone.current = true;
  }, [messages]);

  useEffect(() => {
    if (!lastUserMsgId) return;
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
