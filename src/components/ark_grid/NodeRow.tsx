import { ArkGridCoreItem, ArkGridGemItem } from '@/types/ark_grid';
import Image from 'next/image';
import { useState } from 'react';

const GRADE_STYLE: Record<
  string,
  { text: string; badge: string; background: string }
> = {
  고대: {
    text: 'text-[#c8b08e]',
    badge: 'bg-[#c8b08e]/20 text-[#c8b08e] border border-[#c8b08e]/40',
    background: 'bg-ancient-item',
  },
  유물: {
    text: 'text-orange-500',
    badge: 'bg-orange-500/20 text-orange-500 border border-orange-500/40',
    background: 'bg-relic-item',
  },
  전설: {
    text: 'text-yellow-500',
    badge: 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/40',
    background: 'bg-legend-item',
  },
  영웅: {
    text: 'text-purple-500',
    badge: 'bg-purple-500/20 text-purple-500 border border-purple-500/40',
    background: 'bg-heroic-item',
  },
};

export default function NodeRow({
  core,
  gems,
  defaultOpen,
}: {
  core: ArkGridCoreItem;
  gems: ArkGridGemItem[];
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const style = GRADE_STYLE[core.grade];

  function highlightText(text: string) {
    const parts = text
      .split(/([\d]+\.?\d*%?)|(증가|감소|획득?)|('[^']+'|"[^"]+")/)
      .filter(Boolean);
    return parts.map((part, i) => {
      if (/^[\d]+\.?\d*초?$/.test(part)) {
        return (
          <span key={i} className="text-[#dac04d]">
            {part}
          </span>
        );
      }
      if (/^[\d]+\.?\d*%?$/.test(part)) {
        return (
          <span key={i} className="text-[#56c558]">
            {part}
          </span>
        );
      }
      if (/^['"][^'"]+['"]$/.test(part)) {
        return (
          <span key={i} className="text-[#a185d0]">
            {part}
          </span>
        );
      }
      return part;
    });
  }

  function formatCoreOption(text: string) {
    const lines = text.split('\n');
    let currentRequired = 0;
    return lines.map((line, i) => {
      const match = line.match(/^(\[(\d+)P\])\s*(.*)/);
      if (match) {
        currentRequired = parseInt(match[2], 10);
        const disabled = currentRequired > core.point;
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
      const disabled = currentRequired > core.point;
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

  return (
    <div
      className={`overflow-hidden rounded-xl border bg-white transition-shadow duration-200 ${
        open
          ? 'border-gray-300 shadow-md'
          : 'border-gray-300 shadow-sm hover:shadow-md'
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-gray-100/80"
      >
        <Image
          src={core.icon}
          alt={core.name}
          width={40}
          height={40}
          className={`rounded-lg border-2 object-contain`}
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

        <div className="flex shrink-0 items-center">
          {gems.map((gem, idx) => {
            const gemStyle = GRADE_STYLE[gem.grade];
            return (
              <div
                key={gem.gem_index}
                className="group relative -ml-2 first:ml-0"
                style={{ zIndex: gems.length - idx }}
              >
                <Image
                  width={28}
                  height={28}
                  src={gem.icon}
                  alt={`gem-${gem.gem_index}`}
                  className={`${gemStyle.background} rounded-full border-2 border-white object-contain transition-transform duration-150 group-hover:z-50 group-hover:scale-125`}
                />
              </div>
            );
          })}
        </div>

        <span
          className={`ml-3 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="border-t border-gray-100 bg-gray-50/60 px-4 py-3">
          <div className="flex flex-col gap-0.5">
            {formatCoreOption(core.core_option)}
          </div>
        </div>
      )}
    </div>
  );
}
