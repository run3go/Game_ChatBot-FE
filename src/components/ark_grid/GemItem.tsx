'use client';

import { GRADE_STYLE } from '@/lib/datas/color';
import { ArkGridGemItem } from '@/types/ark_grid';
import SkeletonImage from '@/components/common/SkeletonImage';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import GemTooltip from './GemTooltip';

export default function GemItem({
  gem,
  zIndex,
}: {
  gem: ArkGridGemItem;
  zIndex: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const isMobile = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    isMobile.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      isMobile.current = e.matches;
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  function calcPos() {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });
  }

  function handleMouseEnter() {
    if (isMobile.current) return;
    calcPos();
  }

  function handleMouseLeave() {
    if (isMobile.current) return;
    setPos(null);
  }

  function handleClick(e: React.MouseEvent) {
    if (!isMobile.current) return;
    e.stopPropagation();
    if (pos) {
      setPos(null);
    } else {
      calcPos();
    }
  }

  useEffect(() => {
    if (!pos || !isMobile.current) return;
    function handleOutside() {
      setPos(null);
    }
    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, [pos]);

  return (
    <div
      ref={ref}
      className="relative -ml-2 first:ml-0"
      style={{ zIndex }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <SkeletonImage
        width={28}
        height={28}
        src={gem.icon}
        alt={`gem-${gem.gem_index}`}
        className={`${GRADE_STYLE[gem.grade].background} cursor-pointer rounded-full border-2 border-white object-contain transition-transform duration-150 hover:scale-125`}
      />
      {pos &&
        createPortal(
          <div
            className="pointer-events-none fixed z-9999 -translate-x-1/2"
            style={{ top: pos.top, left: pos.left }}
          >
            <GemTooltip gem={gem} />
          </div>,
          document.body,
        )}
    </div>
  );
}
