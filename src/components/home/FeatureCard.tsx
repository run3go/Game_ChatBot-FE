'use client';

import { IconArrowRight } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { type ReactNode, useState } from 'react';

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

  return (
    <div
      className={`relative ${comingSoon ? 'opacity-50' : ''}`}
      onMouseEnter={() => !comingSoon && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {comingSoon && (
          <span className="absolute right-3 top-3 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-400">
            준비 중
          </span>
        )}
        <div
          className={`mb-4 grid size-12 place-items-center rounded-xl ${iconBgColor}`}
        >
          {icon}
        </div>
        <h3 className="mb-2 text-base font-semibold text-gray-900">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-500">{description}</p>
      </div>

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
                  <IconArrowRight
                    size={14}
                    className="shrink-0 text-gray-300"
                  />
                </button>
              ))}
            </div>
            <div className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-r border-b border-gray-100 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
