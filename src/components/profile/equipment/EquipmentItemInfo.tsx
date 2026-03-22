import { GRADE_STYLE } from '@/lib/datas/color';
import { ArmoryEquipment } from '@/types/profile';
import Image from 'next/image';
import { Fragment } from 'react';
import QualityBar from './QualityBar';
import {
  ACCESSORY_STAT_RANGE,
  ACCESSORY_TYPES,
  ARMOR_TYPES,
  STONE_TYPE,
  TIER_BADGE,
  TIER_STYLE,
  getEffectTier,
  parseAccessoryStat,
  parseStoneEngravings,
  splitBraceletEffects,
  splitEffectLines,
  splitEffectParts,
} from './utils';

export default function EquipmentItemInfo({ item }: { item: ArmoryEquipment }) {
  const gradeStyle = GRADE_STYLE[item.grade] ?? { text: 'text-gray-500', background: '' };
  const enhLabel = item.enhancement_level > 0 ? `+${item.enhancement_level}` : null;

  const isAccessory = ACCESSORY_TYPES.has(item.type);
  const accessoryEffects =
    isAccessory && item.additional_effect
      ? splitEffectLines(item.additional_effect).slice(0, 3)
      : [];

  const stoneEngravings =
    item.type === STONE_TYPE ? parseStoneEngravings(item.additional_effect) : [];

  const braceletEffects =
    item.type === '팔찌' && item.additional_effect
      ? splitBraceletEffects(item.additional_effect)
      : [];

  const accessoryRange = ACCESSORY_STAT_RANGE[item.type] ?? null;
  const accessoryStat = accessoryRange ? parseAccessoryStat(item.basic_effect) : null;
  const accessoryPct =
    accessoryRange && accessoryStat !== null
      ? Math.round(
          ((accessoryStat.value - accessoryRange.min) /
            (accessoryRange.max - accessoryRange.min)) *
            100,
        )
      : null;

  const displayQuality = accessoryPct !== null ? accessoryPct : item.quality;
  const qualityLabel = accessoryStat !== null ? accessoryStat.stat : '품질';

  return (
    <>
      <div className="relative shrink-0">
        <Image
          src={item.icon}
          alt={item.name}
          width={40}
          height={40}
          className={`size-10 rounded-lg object-cover ${gradeStyle.background}`}
        />
        {enhLabel && (
          <span
            className="absolute -right-1 -bottom-1 rounded px-0.5 text-[10px] leading-tight font-bold text-white shadow"
            style={{ background: 'rgba(0,0,0,0.7)' }}
          >
            {enhLabel}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-semibold ${gradeStyle.text}`}>
          {item.name}
          {item.advanced_reinforcement > 0 && (
            <span className="ml-1 text-xs font-medium text-black">
              X{item.advanced_reinforcement}
            </span>
          )}
        </p>
        <div className="mt-0.5 flex items-center gap-1">
          <span className="rounded bg-gray-100 px-1 py-0.5 text-[12px] text-gray-500">
            {item.type}
          </span>
        </div>
        <QualityBar
          quality={displayQuality}
          label={qualityLabel}
          hideLabel={accessoryPct !== null}
          hidePercent={ARMOR_TYPES.has(item.type)}
        />
        {braceletEffects.length > 0 && (
          <div className="mt-1 flex flex-col gap-0.5">
            {braceletEffects.map((line, i) => (
              <p key={i} className="text-[12px] leading-tight text-gray-500">
                {line}
              </p>
            ))}
          </div>
        )}
      </div>

      {accessoryEffects.length > 0 && (
        <div className="mt-1 grid grid-cols-[auto_auto_auto] items-center justify-start gap-x-1.5 gap-y-0.5">
          {accessoryEffects.map((effect, i) => {
            const tier = getEffectTier(effect);
            const { name, value } = splitEffectParts(effect);
            return (
              <Fragment key={i}>
                <span
                  className={`inline-flex items-center self-center rounded px-1 py-0.5 text-[10px] leading-none font-bold ${TIER_BADGE[tier]}`}
                >
                  {tier}
                </span>
                <span className="w-22.5 truncate text-xs leading-none text-gray-600">
                  {name}
                </span>
                <span className={`text-[11px] leading-tight font-semibold ${TIER_STYLE[tier]}`}>
                  {value}
                </span>
              </Fragment>
            );
          })}
        </div>
      )}

      {stoneEngravings.length > 0 && (
        <div className="grid grid-cols-[1fr_auto] items-center gap-x-2 gap-y-0.5 text-xs">
          {stoneEngravings.map((eng, i) => (
            <Fragment key={i}>
              <span className="truncate leading-tight text-gray-600">{eng.name}</span>
              <span
                className={`leading-tight font-semibold ${i === 2 ? 'text-red-500' : 'text-blue-600'}`}
              >
                Lv.{eng.level}
              </span>
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
}
