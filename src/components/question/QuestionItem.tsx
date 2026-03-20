import { QuestionType } from '@/types/question';
import { twMerge } from 'tailwind-merge';

export default function QuestionItem({
  title,
  content,
  selected = false,
}: QuestionType) {
  return (
    <li
      className={twMerge(
        'cursor-pointer rounded-lg bg-white p-3 hover:bg-gray-100 hover:shadow-sm',
        selected && 'border-primary-500 bg-primary-100 border-l-4 shadow-sm',
      )}
    >
      <h3 className="mb-1 truncate text-sm font-medium text-gray-800">
        {title}
      </h3>
      <div className="letter w-50 truncate text-xs text-gray-500">
        {content}
      </div>
    </li>
  );
}
