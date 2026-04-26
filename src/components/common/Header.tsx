'use client';

import { getCallCount } from '@/lib/apis/user';
import { useChatStore } from '@/store/chatStore';
import { IconDeviceGamepadFilled } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const MAX_CALLS = 50;

function CallCountBadge({ count }: { count: number | null }) {
  if (count === null) return null;

  const isLimit = count >= MAX_CALLS;
  const isWarning = count >= 40 && count < MAX_CALLS;

  const style = isLimit
    ? 'bg-red-50 text-red-600'
    : isWarning
      ? 'bg-orange-50 text-orange-600'
      : 'bg-gray-100 text-gray-500';

  return (
    <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${style}`}>
      <span>오늘 질문</span>
      <span className="font-bold">
        {count} / {MAX_CALLS}
      </span>
      {isLimit && <span>— 내일 초기화</span>}
    </div>
  );
}

export default function Header() {
  const resetChat = useChatStore((state) => state.resetChat);
  const callCount = useChatStore((state) => state.callCount);
  const setCallCount = useChatStore((state) => state.setCallCount);
  const callCountRefreshKey = useChatStore((state) => state.callCountRefreshKey);
  const router = useRouter();

  useEffect(() => {
    getCallCount().then(setCallCount);
  }, [callCountRefreshKey, setCallCount]);

  const handleClick = () => {
    resetChat();
    router.push('/');
  };

  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex cursor-pointer items-center" onClick={handleClick}>
        <div className="mr-3 grid size-10 place-items-center rounded-lg bg-linear-to-r from-indigo-500 to-violet-500">
          <IconDeviceGamepadFilled color="white" size={25} />
        </div>
        <h1 className="text-xl font-bold">My Game Chat Bot</h1>
      </div>
      <CallCountBadge count={callCount} />
    </div>
  );
}
