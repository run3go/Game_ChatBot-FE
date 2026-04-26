'use client';

import { GRADE_STYLE } from '@/lib/datas/color';
import { ArmoryAvatar } from '@/types/avatar';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  avatar: ArmoryAvatar;
  children: React.ReactNode;
  align?: 'left' | 'right'; // 툴팁 방향: left = 오른쪽패널(왼쪽으로 펼침), right = 왼쪽패널(오른쪽으로 펼침)
}

export default function AvatarTooltip({
  avatar,
  children,
  align = 'right',
}: Props) {
  const gradeStyle = GRADE_STYLE[avatar.grade];
  const hasTooltipContent =
    avatar.basic_effect ||
    avatar.tendency_charm ||
    avatar.tendency_courage ||
    avatar.tendency_intellect ||
    avatar.tendency_kindness;

  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  if (!hasTooltipContent) return <>{children}</>;

  const GAP = 12;
  const TOOLTIP_WIDTH = 208; // w-52

  function handleMouseEnter() {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const left =
      align === 'right' ? rect.right + GAP : rect.left - GAP - TOOLTIP_WIDTH;
    setPos({ top: centerY, left });
  }

  function handleMouseLeave() {
    setPos(null);
  }

  const tendency_line = [
    { label: '매력', value: avatar.tendency_charm },
    { label: '담력', value: avatar.tendency_courage },
    { label: '지성', value: avatar.tendency_intellect },
    { label: '친절', value: avatar.tendency_kindness },
  ];

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {pos &&
        createPortal(
          <div
            className="pointer-events-none fixed z-9999 w-52 -translate-y-1/2 rounded-xl border border-white/10 bg-[#1c2128] p-3 shadow-2xl"
            style={{ top: pos.top, left: pos.left }}
          >
            {/* 이름 */}
            <p
              className={`text-base leading-snug font-bold ${gradeStyle?.text ?? 'text-gray-200'}`}
            >
              {avatar.name}
            </p>

            {/* 등급 · 슬롯 */}
            <p className="mt-0.5 text-[13px] text-gray-500">
              {avatar.grade} {avatar.type}
            </p>

            {/* 기본 효과 */}
            {avatar.basic_effect && (
              <div className="mt-2.5 border-t border-white/10 pt-2.5">
                <p className="mb-1 text-[12px] font-semibold tracking-wide text-gray-500 uppercase">
                  기본 효과
                </p>
                <p className="text-sm text-gray-300">{avatar.basic_effect}</p>
              </div>
            )}

            {/* 성향 */}
            <div className="mt-2.5 border-t border-white/10 pt-2.5">
              <p className="mb-1 text-[12px] font-semibold tracking-wide text-gray-500 uppercase">
                성향
              </p>
              <div className="space-y-0.5">
                {tendency_line.map((line, i) => (
                  <p key={i} className="text-sm text-gray-300">
                    {line.label}: {line.value}
                  </p>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
