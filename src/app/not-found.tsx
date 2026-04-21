import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <p className="text-6xl font-bold text-gray-200">404</p>
      <p className="text-lg font-medium text-gray-500">페이지를 찾을 수 없어요.</p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-linear-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
