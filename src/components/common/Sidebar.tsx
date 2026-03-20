import { IconPlus } from '@tabler/icons-react';
import { twMerge } from 'tailwind-merge';
import QuestionList from '../question/QuestionList';

export default function Sidebar() {
  return (
    <div className="flex h-full w-80 flex-col border-r border-gray-200">
      <div className="h-20 border-b border-gray-200 p-4">
        <div
          className={twMerge(
            'flex size-full cursor-pointer items-center justify-center rounded-lg bg-linear-to-r from-indigo-500 to-violet-500',
            'hvoer:shadow-md transition-all duration-200 hover:from-indigo-400 hover:to-purple-400',
          )}
        >
          <IconPlus color="white" />
          <span className="ml-3 text-white">새 채팅</span>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-grey-500 text-sm">채팅</h2>
        <QuestionList />
      </div>
    </div>
  );
}
