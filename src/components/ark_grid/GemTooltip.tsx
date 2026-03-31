import highlightText from '@/lib/utils/highlightText';
import { ArkGridGemItem } from '@/types/ark_grid';

export default function GemTooltip({ gem }: { gem: ArkGridGemItem }) {
  const effects = [
    {
      name: gem.effect_1_name,
      level: gem.effect_1_level,
      value: gem.effect_1_value,
    },
    {
      name: gem.effect_2_name,
      level: gem.effect_2_level,
      value: gem.effect_2_value,
    },
  ].filter((e) => e.name);

  return (
    <div className="w-56 rounded-lg border border-white/10 bg-[#0a0a0a] px-3 py-3 shadow-2xl">
      <p className="mb-2.5 text-[11px] font-semibold tracking-widest text-gray-500 uppercase">
        젬 효과
      </p>

      <div className="space-y-2">
        <div>
          <span className="text-xs text-gray-200">
            필요 의지력 :{' '}
            <span className="font-semibold text-red-400">
              {gem.required_willpower}
            </span>
            {gem.willpower_efficiency != null && (
              <span className="text-gray-500">
                {' '}
                ({(gem.required_willpower ?? 0) + gem.willpower_efficiency} -
                {gem.willpower_efficiency})
              </span>
            )}
          </span>
        </div>

        {gem.point_type && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-200">
              {gem.point_type} 포인트 :{' '}
              <span className="font-semibold text-yellow-500">
                {gem.point_value}
              </span>
            </span>
          </div>
        )}

        <div className="border-t border-white/10" />

        {effects.map((e, i) => (
          <div key={i} className="space-y-0.5">
            <p className="text-xs font-semibold text-gray-100">
              {e.name}{' '}
              <span className="font-normal text-gray-400">Lv.{e.level}</span>
            </p>
            <p className="text-xs text-gray-400">
              <span className="mr-1 text-gray-500">•</span>
              {e.value ? <>{highlightText(e.value)}%</> : null}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
