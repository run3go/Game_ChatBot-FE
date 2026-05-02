'use client';

import { ArmoryEquipment } from '@/types/profile';
import { useEffect, useRef, useState } from 'react';
import EquipmentItemInfo from './EquipmentItemInfo';
import EquipmentItemTooltip from './EquipmentItemTooltip';

export default function EquipmentItem({ item }: { item: ArmoryEquipment }) {
  const [open, setOpen] = useState(false);
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

  function handleMouseEnter() {
    if (isMobile.current) return;
    setOpen(true);
  }

  function handleMouseLeave() {
    if (isMobile.current) return;
    setOpen(false);
  }

  function handleClick(e: React.MouseEvent) {
    if (!isMobile.current) return;
    e.stopPropagation();
    setOpen((prev) => !prev);
  }

  useEffect(() => {
    if (!open || !isMobile.current) return;
    function handleOutside() {
      setOpen(false);
    }
    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, [open]);

  return (
    <div
      className="relative flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-gray-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <EquipmentItemInfo item={item} />
      <EquipmentItemTooltip item={item} open={open} />
    </div>
  );
}
