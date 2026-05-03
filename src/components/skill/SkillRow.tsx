'use client';

import SkeletonImage from '@/components/common/SkeletonImage';
import { ArmoryGem, ArmorySkill } from '@/types/skill';
import { useState } from 'react';

const GRADE_STYLE: Record<string, string> = {
  고급: 'bg-green-100 text-green-700 border border-green-200',
  희귀: 'bg-blue-100 text-blue-700 border border-blue-200',
  영웅: 'bg-purple-100 text-purple-700 border border-purple-200',
  전설: 'bg-orange-100 text-orange-700 border border-orange-200',
  유물: 'bg-red-100 text-red-700 border border-red-200',
  고대: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
};

const GEM_SHORT_NAME: Record<string, string> = {
  겁화의: '겁',
  작열의: '작',
  멸화의: '멸',
  홍염의: '홍',
};

const EFFECT_TYPE_SHORT: Record<string, string> = {
  '피해 증가': '겁',
  '재사용 대기시간 감소': '작',
};

function gemShortName(gem: ArmoryGem): string {
  const nameKey = gem.name.split(' ')[1];
  return (
    GEM_SHORT_NAME[nameKey] ??
    EFFECT_TYPE_SHORT[gem.effect_type_name] ??
    nameKey?.[0] ??
    '?'
  );
}

interface Props {
  skill: ArmorySkill;
  gems?: ArmoryGem[];
}

const TRIPOD_COLORS = ['bg-teal-400', 'bg-indigo-400', 'bg-violet-400'];

export default function SkillRow({ skill, gems = [] }: Props) {
  const tripods = [
    skill.tripod_1_name,
    skill.tripod_2_name,
    skill.tripod_3_name,
  ];

  const [tripodTooltip, setTripodTooltip] = useState<{
    name: string;
    x: number;
    y: number;
  } | null>(null);

  const gemBadges = (
    <div className="flex gap-1">
      {gems.map((gem, i) => (
        <div
          key={i}
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${GRADE_STYLE[gem.grade] ?? 'bg-gray-100 text-gray-600'}`}
        >
          {gem.level}
          {gemShortName(gem)}
        </div>
      ))}
    </div>
  );

  const runeBadge = skill.rune_name && skill.rune_grade && (
    <div
      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${GRADE_STYLE[skill.rune_grade] ?? 'bg-gray-100 text-gray-600'}`}
    >
      {skill.rune_name}
    </div>
  );

  return (
    <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
      {/* 모바일: 아이콘+이름 행 / 데스크톱: 전체 한 행 */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        {/* 아이콘 + 이름 + (모바일에서 보석/룬 오른쪽) */}
        <div className="flex items-center gap-3">
          {/* 스킬 아이콘 */}
          <div className="shrink-0">
            <div className="size-10 overflow-hidden rounded-lg bg-indigo-100 ring-2 ring-indigo-200">
              {skill.skill_icon_url ? (
                <SkeletonImage
                  src={skill.skill_icon_url ?? ''}
                  alt="스킬 이미지"
                  width={40}
                  height={40}
                  className="h-full w-full"
                />
              ) : (
                <div className="h-full w-full bg-linear-to-br from-indigo-300 to-violet-400" />
              )}
            </div>
          </div>

          {/* 스킬 이름 + 레벨 */}
          <div className="min-w-0 flex-1 sm:w-36 sm:flex-none sm:shrink-0">
            <p className="truncate text-sm font-semibold text-gray-600">
              {skill.skill_name}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <p className="text-gray-400">{skill.skill_level}레벨</p>
              {skill.weak_point > 0 && (
                <span className="rounded-full bg-gray-100 px-1.5 py-px text-[10px] font-medium text-gray-600">
                  파괴 Lv.{skill.weak_point}
                </span>
              )}
              {skill.stagger && (
                <span className="rounded-full bg-sky-100 px-1.5 py-px text-[10px] font-medium text-sky-600">
                  {skill.stagger}
                </span>
              )}
            </div>
          </div>

          {/* 모바일 전용: 보석 + 룬 오른쪽 정렬 */}
          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:hidden">
            {gemBadges}
            {runeBadge}
          </div>
        </div>

        {/* 트라이포드 3개 */}
        <div className="grid grid-cols-3 gap-2 sm:flex-1">
          {tripods.map((tripod, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-2 py-1"
            >
              <div
                className={`size-2.5 shrink-0 rounded-full ${TRIPOD_COLORS[i]}`}
              />
              <span
                className="truncate text-xs text-gray-600"
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  if (tripod && el.scrollWidth > el.clientWidth) {
                    setTripodTooltip({
                      name: tripod,
                      x: e.clientX,
                      y: e.clientY,
                    });
                  }
                }}
                onMouseMove={(e) => {
                  if (tripodTooltip) {
                    setTripodTooltip(
                      (prev) => prev && { ...prev, x: e.clientX, y: e.clientY },
                    );
                  }
                }}
                onMouseLeave={() => setTripodTooltip(null)}
              >
                {tripod || '-'}
              </span>
            </div>
          ))}
        </div>

        {/* 데스크톱 전용: 보석 + 룬 */}
        <div className="hidden sm:flex sm:w-24 sm:shrink-0 sm:gap-1">
          {gems.map((gem, i) => (
            <div
              key={i}
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${GRADE_STYLE[gem.grade] ?? 'bg-gray-100 text-gray-600'}`}
            >
              {gem.level}
              {gemShortName(gem)}
            </div>
          ))}
        </div>
        <div className="hidden sm:block sm:w-[44.1px]">
          {skill.rune_name && skill.rune_grade && (
            <div
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${GRADE_STYLE[skill.rune_grade] ?? 'bg-gray-100 text-gray-600'}`}
            >
              {skill.rune_name}
            </div>
          )}
        </div>
      </div>

      {/* 트라이포드 이름 전체 툴팁 */}
      {tripodTooltip && (
        <div
          className="pointer-events-none fixed z-50 rounded bg-gray-800/70 px-2 py-1 text-xs text-white shadow-lg"
          style={{ left: tripodTooltip.x + 12, top: tripodTooltip.y + 12 }}
        >
          {tripodTooltip.name}
        </div>
      )}
    </div>
  );
}
