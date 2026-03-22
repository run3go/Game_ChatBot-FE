'use client';

import { ArmoryGem, ArmorySkill } from '@/types/skill';
import Image from 'next/image';
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

interface Props {
  skill: ArmorySkill;
  gems?: ArmoryGem[];
  tooltipUp?: boolean;
}

const TRIPOD_COLORS = ['bg-teal-400', 'bg-indigo-400', 'bg-violet-400'];

function convertLOAHtml(html: string): string {
  return html
    .replace(/<FONT COLOR='([^']+)'>/g, '<span style="color:$1">')
    .replace(/<FONT SIZE='\d+'>/g, '')
    .replace(/<\/FONT>/g, '</span>')
    .replace(/<font color='([^']+)'>/g, '<span style="color:$1">')
    .replace(/<\/font>/g, '</span>')
    .replace(/<BR>/g, '<br/>');
}

function extractDescription(tooltip: string): string | null {
  try {
    const data = JSON.parse(tooltip);
    for (const key of Object.keys(data)) {
      const el = data[key];
      if (
        el.type === 'SingleTextBox' &&
        typeof el.value === 'string' &&
        el.value.includes('efefdf')
      ) {
        return convertLOAHtml(el.value);
      }
    }
    return null;
  } catch {
    return null;
  }
}

export default function SkillRow({ skill, gems = [], tooltipUp = false }: Props) {
  const tripods = [
    skill.tripod_1_name,
    skill.tripod_2_name,
    skill.tripod_3_name,
  ];

  const description = extractDescription(skill.tooltip);
  const [tripodTooltip, setTripodTooltip] = useState<{ name: string; x: number; y: number } | null>(null);

  return (
    <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
      {/* 스킬 아이콘 + 툴팁 */}
      <div className="group relative shrink-0">
        <div className="size-10 overflow-hidden rounded-lg bg-indigo-100 ring-2 ring-indigo-200">
          {skill.icon ? (
            <Image
              src={skill.icon}
              alt={skill.skill_name}
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-linear-to-br from-indigo-300 to-violet-400" />
          )}
        </div>

        {/* 툴팁 */}
        {description && (
          <div className={`pointer-events-none absolute left-12 z-50 hidden w-72 rounded-xl bg-gray-900 p-3 shadow-xl group-hover:block ${tooltipUp ? 'bottom-0' : 'top-0'}`}>
            <p className="mb-1 text-xs font-semibold text-white">
              {skill.skill_name}
            </p>
            <div className="mb-2 flex gap-3 text-[10px] text-gray-400">
              <span>재사용 {skill.cooldown}초</span>
              <span>마나 {skill.mana_cost}</span>
            </div>
            <div
              className="text-[11px] leading-5"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        )}
      </div>

      {/* 스킬 이름 + 레벨 */}
      <div className="w-36 shrink-0">
        <p className="max-w-[10ch] truncate text-sm font-semibold text-gray-600">
          {skill.skill_name}
        </p>
        <div className="flex items-center gap-1.5 text-xs">
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

      {/* 트라이포드 3개 */}
      <div className="grid flex-1 grid-cols-3 gap-2">
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
                  setTripodTooltip({ name: tripod, x: e.clientX, y: e.clientY });
                }
              }}
              onMouseMove={(e) => {
                if (tripodTooltip) {
                  setTripodTooltip((prev) => prev && { ...prev, x: e.clientX, y: e.clientY });
                }
              }}
              onMouseLeave={() => setTripodTooltip(null)}
            >
              {tripod || '-'}
            </span>
          </div>
        ))}
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

      {/* 보석 */}
      <div className="flex w-24 shrink-0 gap-1">
        {gems.map((gem, i) => (
          <div
            key={i}
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${GRADE_STYLE[gem.grade] ?? 'bg-gray-100 text-gray-600'}`}
          >
            {gem.level}
            {GEM_SHORT_NAME[gem.name.split(' ')[1]]}
          </div>
        ))}
      </div>

      {/* 룬 */}
      <div className="w-[44.1px]">
        {skill.rune_name && skill.rune_grade && (
          <div
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${GRADE_STYLE[skill.rune_grade] ?? 'bg-gray-100 text-gray-600'}`}
          >
            {skill.rune_name}
          </div>
        )}
      </div>
    </div>
  );
}
