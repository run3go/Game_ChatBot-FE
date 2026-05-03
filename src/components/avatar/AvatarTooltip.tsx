'use client';

import { GRADE_STYLE } from '@/lib/datas/color';
import { ArmoryAvatar } from '@/types/avatar';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  avatar: ArmoryAvatar;
  children: React.ReactNode;
  align?: 'left' | 'right'; // 툴팁 방향: left = 오른쪽패널(왼쪽으로 펼침), right = 왼쪽패널(오른쪽으로 펼침)
}

type Placement = 'side' | 'above' | 'below';
type TooltipPos = { top: number; left: number; placement: Placement };

const TOOLTIP_WIDTH = 208; // w-52
const TOOLTIP_HEIGHT_EST = 200;
const GAP = 8;

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

  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<TooltipPos | null>(null);

  useEffect(() => {
    if (!pos) return;
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (tooltipRef.current?.contains(target)) return;
      setPos(null);
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [pos]);

  if (!hasTooltipContent) return <>{children}</>;

  function getSidePos(): TooltipPos {
    const rect = triggerRef.current!.getBoundingClientRect();
    const top = rect.top + rect.height / 2;
    const left =
      align === 'right' ? rect.right + GAP : rect.left - GAP - TOOLTIP_WIDTH;
    return { top, left, placement: 'side' };
  }

  function getMobilePos(): TooltipPos {
    const rect = triggerRef.current!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const left = Math.max(
      8,
      Math.min(centerX - TOOLTIP_WIDTH / 2, window.innerWidth - TOOLTIP_WIDTH - 8),
    );
    const spaceBelow = window.innerHeight - rect.bottom;
    if (spaceBelow >= TOOLTIP_HEIGHT_EST + GAP) {
      return { top: rect.bottom + GAP, left, placement: 'below' };
    }
    return { top: rect.top - GAP, left, placement: 'above' };
  }

  function handlePointerEnter(e: React.PointerEvent) {
    if (e.pointerType !== 'mouse') return;
    if (triggerRef.current) setPos(getSidePos());
  }

  function handlePointerLeave(e: React.PointerEvent) {
    if (e.pointerType !== 'mouse') return;
    setPos(null);
  }

  function handleClick() {
    if (pos?.placement === 'side') return; // 데스크탑 hover 중 클릭 무시
    if (pos) {
      setPos(null);
    } else if (triggerRef.current) {
      setPos(getMobilePos());
    }
  }

  const tendency_line = [
    { label: '매력', value: avatar.tendency_charm },
    { label: '담력', value: avatar.tendency_courage },
    { label: '지성', value: avatar.tendency_intellect },
    { label: '친절', value: avatar.tendency_kindness },
  ];

  const tooltipTransform =
    pos?.placement === 'side'
      ? 'translateY(-50%)'
      : pos?.placement === 'above'
        ? 'translateY(-100%)'
        : undefined;

  return (
    <div
      ref={triggerRef}
      className="relative"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {children}

      {pos &&
        createPortal(
          <div
            ref={tooltipRef}
            className="pointer-events-auto fixed z-9999 w-52 rounded-xl border border-white/10 bg-[#1c2128] p-3 shadow-2xl"
            style={{ top: pos.top, left: pos.left, transform: tooltipTransform }}
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
