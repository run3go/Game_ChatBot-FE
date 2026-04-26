'use client';

import SkeletonImage from '@/components/common/SkeletonImage';
import { GRADE_STYLE } from '@/lib/datas/color';
import { ArmoryGem, ArmoryGemEffect } from '@/types/skill';

function GemBadge({ level, grade }: { level: number; grade: string }) {
  const style = GRADE_STYLE[grade] ?? { solidBadge: 'bg-gray-400 text-white' };
  return (
    <span
      className={`absolute -right-1 -bottom-1 flex size-4 items-center justify-center rounded-full text-[9px] font-bold shadow ${style.solidBadge}`}
    >
      {level}
    </span>
  );
}

export default function GemsSection({
  gems,
  gemEffect,
}: {
  gems: ArmoryGem[];
  gemEffect: ArmoryGemEffect | undefined;
}) {
  if (gems.length === 0) return null;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-bold tracking-wide text-gray-400 uppercase">
          보석
        </p>
        {gemEffect && (
          <span className="rounded-full bg-green-50 px-2 py-0.5 text-sm font-semibold text-green-600">
            {gemEffect.description}
          </span>
        )}
      </div>
      <div className="flex justify-between">
        {[...gems]
          .sort((a, b) => {
            if (a.effect_type_name !== b.effect_type_name)
              return a.effect_type_name.localeCompare(b.effect_type_name);
            return b.level - a.level;
          })
          .map((gem) => (
            <div
              key={gem.slot}
              className="group relative flex flex-col items-center"
            >
              <div className="relative">
                <SkeletonImage
                  src={gem.icon}
                  alt={gem.name}
                  width={40}
                  height={40}
                  className={`size-10 rounded-lg object-cover ${GRADE_STYLE[gem.grade]?.background ?? ''}`}
                />
                <GemBadge level={gem.level} grade={gem.grade} />
              </div>
              <div className="absolute bottom-full z-10 mb-2 hidden w-max max-w-52 rounded-xl bg-gray-900 px-3 py-2 text-center shadow-xl group-hover:block">
                <p className="text-sm font-semibold text-white">
                  {gem.skill_name}
                </p>
                <p className="mt-0.5 text-[12px] text-gray-400">
                  {gem.effect_type_name}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
