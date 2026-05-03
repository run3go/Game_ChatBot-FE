'use client';

import { IconArrowRight, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface FeatureCardProps {
  icon: ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
  examples?: string[];
  onExampleClick?: (message: string) => void;
  comingSoon?: boolean;
}

export default function FeatureCard({
  icon,
  iconBgColor,
  title,
  description,
  examples = [],
  onExampleClick,
  comingSoon = false,
}: FeatureCardProps) {
  const [hovered, setHovered] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const hasExamples = !comingSoon && examples.length > 0;

  const handleClick = () => {
    if (isMobile && hasExamples) setPopupOpen(true);
  };

  const mobilePopup = (
    <AnimatePresence>
      {popupOpen && (
        <>
          {/* 백드롭 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setPopupOpen(false)}
          />
          {/* 바텀시트 */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-white px-6 pb-10 pt-6"
          >
            {/* 핸들 */}
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-gray-200" />

            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`grid size-10 place-items-center rounded-xl ${iconBgColor}`}>
                  {icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                  <p className="text-xs text-gray-400">{description}</p>
                </div>
              </div>
              <button
                onClick={() => setPopupOpen(false)}
                className="flex size-8 items-center justify-center rounded-full bg-gray-100 text-gray-500"
              >
                <IconX size={16} />
              </button>
            </div>

            <p className="mb-2 text-xs font-medium text-gray-400">예시 질문</p>
            <div className="flex flex-col gap-2">
              {examples.map((example) => (
                <button
                  key={example}
                  onClick={() => {
                    setPopupOpen(false);
                    onExampleClick?.(example);
                  }}
                  className="flex items-center justify-between gap-2 rounded-xl bg-gray-50 px-4 py-3 text-left text-sm text-gray-700 transition-colors active:bg-violet-50 active:text-violet-700"
                >
                  <span>{example}</span>
                  <IconArrowRight size={14} className="shrink-0 text-gray-300" />
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div
        className={`relative ${comingSoon ? 'opacity-50' : ''} ${hasExamples ? 'cursor-pointer' : ''}`}
        onMouseEnter={() => !isMobile && hasExamples && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        <div className="flex h-full w-full flex-col items-center rounded-2xl border border-gray-200 bg-white p-3 text-center shadow-sm md:items-start md:p-6 md:text-left">
          {comingSoon && (
            <span className="absolute right-2 top-2 rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
              준비 중
            </span>
          )}
          <div className={`mb-2 grid size-9 place-items-center rounded-xl md:mb-4 md:size-12 ${iconBgColor}`}>
            {icon}
          </div>
          <h3 className="text-sm font-semibold leading-snug text-gray-900 md:mb-2 md:text-base">{title}</h3>
          <p className="hidden text-sm leading-relaxed text-gray-500 md:block">{description}</p>
        </div>

        {/* 데스크톱: 호버 플로팅 툴팁 */}
        <AnimatePresence>
          {hovered && examples.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute bottom-[calc(100%+10px)] left-1/2 z-10 w-64 -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl"
            >
              <p className="mb-2 text-xs font-medium text-gray-400">예시 질문</p>
              <div className="flex flex-col gap-1.5">
                {examples.map((example) => (
                  <button
                    key={example}
                    onClick={() => onExampleClick?.(example)}
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-xl bg-gray-50 px-3 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-violet-50 hover:text-violet-700"
                  >
                    <span>{example}</span>
                    <IconArrowRight size={14} className="shrink-0 text-gray-300" />
                  </button>
                ))}
              </div>
              <div className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-r border-b border-gray-100 bg-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 모바일: 바텀시트 팝업 (portal로 렌더링) */}
      {isMobile && createPortal(mobilePopup, document.body)}
    </>
  );
}
