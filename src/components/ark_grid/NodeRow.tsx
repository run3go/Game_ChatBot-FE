import { GRADE_STYLE } from '@/lib/datas/color';
import highlightText from '@/lib/utils/highlightText';
import { ArkGridCoreItem, ArkGridGemItem } from '@/types/ark_grid';
import SkeletonImage from '@/components/common/SkeletonImage';
import { useState } from 'react';
import GemStack from './GemStack';


export default function NodeRow({
  core,
  gems,
  defaultOpen = false,
}: {
  core: ArkGridCoreItem;
  gems: ArkGridGemItem[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const style = GRADE_STYLE[core.grade];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-gray-100/80"
      >
        <SkeletonImage
          src={core.icon}
          alt={core.name}
          width={40}
          height={40}
          className="rounded-lg border-2 object-contain"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className={`truncate text-sm font-semibold ${style.text}`}>
              {core.name}
            </p>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${style.badge}`}
            >
              {core.grade}
            </span>
            <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
              {core.point}P
            </span>
          </div>
        </div>

        <GemStack gems={gems} />

        <span
          className={`ml-3 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          ▾
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-100 bg-gray-50/60 px-4 py-3">
            <div className="flex flex-col gap-0.5">
              {([1, 2, 3, 4, 5, 6] as const).map((i) => {
                const reqPoint = core[`level_${i}_point`];
                const option = core[`level_${i}_option`];
                if (!option) return null;
                const disabled = reqPoint != null && reqPoint > core.point;
                return (
                  <p key={i} className={`text-xs leading-6 ${disabled ? 'opacity-40' : ''}`}>
                    <span className={`font-semibold ${disabled ? 'text-gray-600' : 'text-[#dfB801]'}`}>
                      [{reqPoint}P]
                    </span>{' '}
                    <span className={disabled ? 'text-gray-900' : 'text-gray-700'}>
                      {disabled ? option : highlightText(option)}
                    </span>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
