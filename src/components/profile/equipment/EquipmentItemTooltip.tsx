import { GRADE_STYLE } from '@/lib/datas/color';
import { ArmoryEquipment } from '@/types/profile';
import {
  STONE_TYPE,
  getQualityColor,
  parseStoneEngravings,
  splitBraceletEffects,
  splitEffectLines,
} from './utils';

export default function EquipmentItemTooltip({
  item,
}: {
  item: ArmoryEquipment;
}) {
  const gradeStyle = GRADE_STYLE[item.grade] ?? {
    text: 'text-gray-500',
    background: '',
  };
  const qualityColor = getQualityColor(item.quality);

  const stoneEngravings =
    item.type === STONE_TYPE
      ? parseStoneEngravings(item.additional_effect)
      : null;
  const additionalLines =
    !stoneEngravings && item.additional_effect
      ? item.type === '팔찌'
        ? splitBraceletEffects(item.additional_effect)
        : splitEffectLines(item.additional_effect)
      : null;

  return (
    <div className="pointer-events-none absolute bottom-full left-0 z-50 mb-1.5 hidden w-64 rounded-xl bg-gray-900 p-3 shadow-2xl group-hover:block">
      <p className={`text-base font-bold ${gradeStyle.text}`}>{item.name}</p>
      <p className="mt-0.5 text-[12px] text-gray-400">
        {item.grade} {item.type}
        {item.item_tier ? ` · 티어 ${item.item_tier}` : ''}
      </p>

      {item.quality > 0 && (
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="text-[12px] text-gray-500">품질</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-700">
            <div
              className={`h-full rounded-full ${qualityColor}`}
              style={{ width: `${Math.max(0, Math.min(100, item.quality))}%` }}
            />
          </div>
          <span className="text-[12px] font-bold text-gray-300">
            {item.quality}%
          </span>
        </div>
      )}

      {item.basic_effect && (
        <>
          <div className="my-2 border-t border-gray-700" />
          <p className="mb-1 text-[12px] font-semibold text-gray-300">
            기본 효과
          </p>
          {splitEffectLines(item.basic_effect).map((line, i) => (
            <p key={i} className="text-[12px] leading-relaxed text-gray-400">
              {line}
            </p>
          ))}
        </>
      )}

      {item.additional_effect && (
        <>
          <div className="my-2 border-t border-gray-700" />
          <p className="mb-1 text-[12px] font-semibold text-gray-300">
            추가 효과
          </p>
          {stoneEngravings
            ? stoneEngravings.map((eng, i) => (
                <p
                  key={i}
                  className={`text-[12px] leading-relaxed ${i === 2 ? 'text-red-400' : 'text-gray-400'}`}
                >
                  {eng.name}
                  <span
                    className={`ml-1 font-semibold ${i === 2 ? 'text-red-400' : 'text-blue-400'}`}
                  >
                    Lv.{eng.level}
                  </span>
                </p>
              ))
            : additionalLines?.map((line, i) => (
                <p
                  key={i}
                  className="text-[12px] leading-relaxed text-gray-400"
                >
                  {line}
                </p>
              ))}
        </>
      )}

      {item.ark_passive_effect && (
        <>
          <div className="my-2 border-t border-gray-700" />
          <p className="text-[12px] font-semibold text-indigo-400">
            아크 패시브 · {item.ark_passive_effect}
          </p>
        </>
      )}
    </div>
  );
}
