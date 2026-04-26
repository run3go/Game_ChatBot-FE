export default function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={onPrevious}
        disabled={page === 0}
        className="rounded-full bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
      >
        ←
      </button>
      <span className="min-w-12 text-center text-sm text-gray-500">
        <span className="font-semibold text-gray-800">{page + 1}</span>
        {' / '}
        {totalPages}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={page === totalPages - 1}
        className="rounded-full bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
      >
        →
      </button>
    </div>
  );
}
