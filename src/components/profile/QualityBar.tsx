export default function QualityBar({ quality }: { quality: number }) {
  if (quality < 0) return null;
  const color =
    quality === 100
      ? 'bg-orange-300'
      : quality >= 90
        ? 'bg-purple-600'
        : quality >= 70
          ? 'bg-blue-400'
          : quality >= 30
            ? 'bg-green-500'
            : 'bg-yellow-300';
  return (
    <div className="flex items-center gap-1">
      <div className="h-1.5 w-12 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${quality}%` }}
        />
      </div>
      <span className="text-xs font-bold text-gray-600">{quality}</span>
    </div>
  );
}
