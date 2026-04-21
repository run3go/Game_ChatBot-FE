'use client';

import { GRADE_STYLE } from '@/lib/datas/color';
import highlightText from '@/lib/utils/highlightText';
import { ArmoryEngraving, EngravingData } from '@/types/engraving';
import SkeletonImage from '@/components/common/SkeletonImage';
import { useState } from 'react';

export default function EngravingList({ data }: { data: EngravingData }) {
  const engravings = data.armory_engravings_tb;
  const [selected, setSelected] = useState<ArmoryEngraving | undefined>(engravings[0]);

  if (!selected) return null;

  return (
    <div className="flex gap-3">
      {/* 왼쪽 목록 */}
      <div className="min-w-60 rounded-2xl bg-white p-3 shadow-sm">
        <ul className="flex flex-col gap-1">
          {engravings.map((engraving) => (
            <li
              key={engraving.name}
              className={`flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition-colors ${
                selected.name === engraving.name
                  ? 'bg-gray-100'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelected(engraving)}
            >
              <div className="shrink-0">
                {engraving.icon_url ? (
                  <SkeletonImage
                    src={engraving.icon_url}
                    alt={engraving.name}
                    width={40}
                    height={40}
                    className="size-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="size-10 rounded-full bg-gray-700" />
                )}
              </div>

              {engraving.level > 0 && (
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-sm leading-none ${GRADE_STYLE[engraving.grade].solidBadge} text-sm font-bold shadow`}
                >
                  {engraving.level}
                </span>
              )}

              <span className="flex-1 text-sm font-medium text-gray-800">
                {engraving.name}
              </span>

              {engraving.ability_stone_level !== null && (
                <span className="shrink-0 rounded-md bg-teal-400/20 px-2 py-0.5 text-xs font-semibold text-teal-600">
                  Lv {engraving.ability_stone_level}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* 오른쪽 디테일 */}
      <div className="flex-1 rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span>
            <strong
              className={`${GRADE_STYLE[selected.grade]?.text ?? 'text-gray-700'} mr-1 font-bold`}
            >
              {selected.grade}
            </strong>
            <span className="mr-1 font-bold">{selected.name} 각인서</span>
            Lv.{selected.level}
          </span>
          {selected.ability_stone_level !== null && (
            <span className="ml-auto rounded-md bg-teal-400/20 px-2 py-0.5 text-sm font-semibold text-teal-600">
              어빌리티 스톤 Lv.{selected.ability_stone_level}
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed text-gray-600">
          {highlightText(selected.description)}
        </p>
      </div>
    </div>
  );
}
