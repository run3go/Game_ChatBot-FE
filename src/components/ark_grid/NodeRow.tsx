import { GRADE_STYLE } from '@/lib/datas/color';
import { ArkGridCoreItem, ArkGridGemItem } from '@/types/ark_grid';
import Image from 'next/image';
import { useState } from 'react';
import GemStack from './GemStack';

function highlightText(text: string) {
  const parts = text
    .split(/([\d]+\.?\d*%?)|(증가|감소|획득?)|('[^']+'|"[^"]+")/)
    .filter(Boolean);

  return parts.map((part, i) => {
    if (/^[\d]+\.?\d*초?$/.test(part))
      return (
        <span key={i} className="text-[#dac04d]">
          {part}
        </span>
      );
    if (/^[\d]+\.?\d*%?$/.test(part))
      return (
        <span key={i} className="text-[#56c558]">
          {part}
        </span>
      );
    if (/^['"][^'"]+['"]$/.test(part))
      return (
        <span key={i} className="text-[#a185d0]">
          {part}
        </span>
      );
    return part;
  });
}

function formatCoreOption(text: string, point: number) {
  let currentRequired = 0;
  return text.split('\n').map((line, i) => {
    const match = line.match(/^(\[(\d+)P\])\s*(.*)/);
    if (match) {
      currentRequired = parseInt(match[2], 10);
      const disabled = currentRequired > point;
      return (
        <p
          key={i}
          className={`text-xs leading-6 ${disabled ? 'opacity-40' : ''}`}
        >
          <span
            className={`font-semibold ${disabled ? 'text-gray-600' : 'text-[#dfB801]'}`}
          >
            {match[1]}
          </span>{' '}
          <span className={disabled ? 'text-gray-900' : 'text-gray-700'}>
            {disabled ? match[3] : highlightText(match[3])}
          </span>
        </p>
      );
    }
    const disabled = currentRequired > point;
    return (
      <p
        key={i}
        className={`pl-8.5 text-xs leading-6 ${disabled ? 'text-gray-400 opacity-40' : 'text-gray-700'}`}
      >
        {disabled ? line : highlightText(line)}
      </p>
    );
  });
}

export default function NodeRow({
  core,
  gems,
}: {
  core: ArkGridCoreItem;
  gems: ArkGridGemItem[];
}) {
  const [open, setOpen] = useState(false);
  const style = GRADE_STYLE[core.grade];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-gray-100/80"
      >
        <Image
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
              {formatCoreOption(core.core_option, core.point)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
