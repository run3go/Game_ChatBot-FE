import {
  ArkPassiveEffectItem,
  ArkPassiveName,
  ArkPassivePointItem,
} from '@/types/ark_passive';
import Image from 'next/image';

const PASSIVE_STYLE: Record<string, { background: string; text: string }> = {
  진화: { background: 'bg-[#d6b76f]', text: 'text-[#d6b76f]' },
  깨달음: { background: 'bg-[#6ccce2]', text: 'text-[#6ccce2]' },
  도약: { background: 'bg-[#a4c44d]', text: 'text-[#a4c44d]' },
};

export default function PassiveItem({
  name,
  effects,
  points,
  wide = false,
}: {
  name: ArkPassiveName;
  effects: ArkPassiveEffectItem[];
  points: ArkPassivePointItem[];
  wide?: boolean;
}) {
  const filteredPoint = points.find((point) => point.name === name);
  const filteredEffects = effects.filter((effect) => effect.name === name);
  const style = PASSIVE_STYLE[name];

  if (!filteredPoint) return null;

  if (wide) {
    const tierGroups = filteredEffects.reduce<Record<string, ArkPassiveEffectItem[]>>(
      (acc, item) => {
        const key = item.tier ?? '기타';
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      },
      {},
    );
    const sortedTiers = Object.keys(tierGroups).sort();

    return (
      <div className="w-full px-4">
        <div className="mb-5 flex items-center gap-2 text-sm font-bold">
          <div className={`${style.background} rounded px-2 py-0.5 text-white`}>
            {filteredPoint.name}
          </div>
          <span className={style.text}>{filteredPoint.point_rank}랭크</span>
          <span className={style.text}>{filteredPoint.point_level}레벨</span>
          <span className="ml-auto rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
            {filteredPoint.value}pt
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {sortedTiers.map((tier) => (
            <div key={tier} className="rounded-lg bg-gray-50 p-3">
              <div className={`${style.text} mb-2 inline-block rounded px-1.5 py-0.5 text-xs font-bold ring-1 ring-current`}>
                {tier}티어
              </div>
              <div className={tierGroups[tier].length === 1 ? 'flex flex-col gap-2' : 'grid grid-cols-2 gap-2'}>
                {tierGroups[tier].map((item) => (
                  <div key={item.effect_name} className="group relative flex items-center gap-2 text-sm">
                    <Image
                      alt={item.effect_name}
                      src={item.icon ?? ''}
                      width={24}
                      height={24}
                      className="shrink-0 rounded"
                    />
                    <span className="font-medium">
                      {item.effect_name}
                      <span className="ml-1 text-xs text-gray-400">Lv.{item.level}</span>
                    </span>
                    {item.level_effect && (
                      <div className="pointer-events-none absolute top-full left-0 z-10 mt-1 w-64 rounded-lg bg-gray-900 p-3 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                        <p className="mb-2 max-h-32 overflow-y-auto leading-relaxed">{item.level_effect}</p>
                        <div className="flex gap-3 border-t border-gray-700 pt-2 text-gray-400">
                          {item.req_points && <span>요구 포인트 {item.req_points}</span>}
                          {item.max_level && <span>최대 레벨 {item.max_level}</span>}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 border-r border-gray-300 px-4 last:border-r-0">
      <div className="mb-6 flex items-center text-sm font-bold">
        <div className={`${style.background} mr-3 px-1 text-white`}>
          {filteredPoint.name}
        </div>
        <span className={`${style.text}`}>{filteredPoint.point_rank}랭크</span>
        <span className={`${style.text} ml-1`}>
          {filteredPoint.point_level}레벨
        </span>
        <span className="ml-auto text-gray-500">{filteredPoint.value}</span>
      </div>
      <ul className="flex flex-col gap-3 text-sm">
        {filteredEffects.map((item) => (
          <div key={item.effect_name} className="flex items-center gap-2">
            <Image
              alt={item.effect_name}
              src={item.icon ?? ''}
              width={20}
              height={20}
              className="shrink-0"
            />
            <span className="w-10 shrink-0 whitespace-nowrap">
              {item.tier}티어
            </span>
            <span className={`${style.text} font-bold`}>
              {item.effect_name} Lv.{item.level}
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
}
