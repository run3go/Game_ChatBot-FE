import { IconArrowRight } from '@tabler/icons-react';

interface SuggestionButtonProps {
  label: string;
  onClick?: () => void;
}

export default function SuggestionButton({
  label,
  onClick,
}: SuggestionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm text-gray-600 transition-all duration-200 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 hover:shadow-sm"
    >
      <span>&ldquo;{label}&rdquo;</span>
      <IconArrowRight
        size={14}
        className="shrink-0 text-gray-300 transition-all duration-200 group-hover:text-violet-400 group-hover:translate-x-0.5"
      />
    </button>
  );
}
