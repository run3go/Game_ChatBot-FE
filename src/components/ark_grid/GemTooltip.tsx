import highlightText from '@/lib/utils/highlightText';
import { ArkGridGemItem } from '@/types/ark_grid';

interface ParsedGemEffect {
  willpower: string;
  pointType: '질서' | '혼돈' | null;
  pointValue: string;
  effects: { header: string; level: string; description: string }[];
}

function parseGemEffect(raw: string): ParsedGemEffect {
  const lines = raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const willpowerLine = lines.find((l) => l.startsWith('필요 의지력')) ?? '';
  const pointLine = lines.find((l) => l.includes('포인트')) ?? '';
  const pointType = pointLine.includes('질서')
    ? '질서'
    : pointLine.includes('혼돈')
      ? '혼돈'
      : null;
  const pointValue = pointLine.split(':')[1]?.trim() ?? '';

  const effects: { header: string; level: string; description: string }[] = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^(\[.+?\])\s*(Lv\.\d+)$/);
    if (match) {
      effects.push({
        header: match[1],
        level: match[2],
        description: lines[i + 1] ?? '',
      });
    }
  }

  return { willpower: willpowerLine, pointType, pointValue, effects };
}

export default function GemTooltip({ gem }: { gem: ArkGridGemItem }) {
  const { willpower, pointType, pointValue, effects } = parseGemEffect(
    gem.gem_effect,
  );

  const willpowerNum = willpower.match(/필요 의지력\s*:\s*(\d+)/)?.[1] ?? '';
  const willpowerSub = willpower.match(/\((.+)\)/)?.[1] ?? '';

  return (
    <div className="w-56 rounded-lg border border-white/10 bg-[#0a0a0a] px-3 py-3 shadow-2xl">
      <p className="mb-2.5 text-[11px] font-semibold tracking-widest text-gray-500 uppercase">
        젬 효과
      </p>

      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <div>
            <span className="text-xs text-gray-200">
              필요 의지력 :{' '}
              <span className="font-semibold text-red-400">{willpowerNum}</span>
            </span>
            {willpowerSub && (
              <p className="text-[11px] text-gray-500">({willpowerSub})</p>
            )}
          </div>
        </div>

        {pointType && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-200">
              {pointType} 포인트 :{' '}
              <span className="font-semibold text-yellow-500">
                {pointValue}
              </span>
            </span>
          </div>
        )}

        <div className="border-t border-white/10" />

        {effects.map((e, i) => (
          <div key={i} className="space-y-0.5">
            <p className="text-xs font-semibold text-gray-100">
              {e.header}{' '}
              <span className="font-normal text-gray-400">{e.level}</span>
            </p>
            <p className="text-xs text-gray-400">
              <span className="mr-1 text-gray-500">•</span>
              {highlightText(e.description)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
