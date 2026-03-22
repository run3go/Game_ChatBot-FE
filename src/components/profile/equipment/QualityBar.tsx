import { getQualityColor } from './utils';

export default function QualityBar({
  quality,
  label,
  hideLabel,
  hidePercent,
}: {
  quality: number;
  label?: string;
  hideLabel?: boolean;
  hidePercent?: boolean;
}) {
  if (quality < 0) return null;
  const color = getQualityColor(quality);
  return (
    <div className="flex items-center gap-1">
      <div className="h-1.5 w-12 overflow-hidden rounded-full bg-gray-200">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${quality}%` }} />
      </div>
      {!hideLabel && label && (
        <span className="shrink-0 text-[11px] text-gray-400">{label}</span>
      )}
      <span className="text-xs font-bold text-gray-600">
        {quality}
        {!hidePercent && '%'}
      </span>
    </div>
  );
}
