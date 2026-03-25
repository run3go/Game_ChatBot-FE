'use client';

import { useChatStore } from '@/store/chatStore';
import { IconDeviceGamepadFilled } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const resetChat = useChatStore((state) => state.resetChat);
  const router = useRouter();

  const handleClick = () => {
    resetChat();
    router.push('/');
  };

  return (
    <div className="flex h-16 w-full items-center border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex cursor-pointer items-center" onClick={handleClick}>
        <div className="mr-3 grid size-10 place-items-center rounded-lg bg-linear-to-r from-indigo-500 to-violet-500">
          <IconDeviceGamepadFilled color="white" size={25} />
        </div>
        <h1 className="text-xl font-bold">My Game Chat Bot</h1>
      </div>
    </div>
  );
}
