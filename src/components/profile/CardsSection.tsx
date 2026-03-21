'use client';

import highlightText from '@/lib/utils/highlightText';
import { ArmoryCard, ArmoryCardEffect } from '@/types/profile';

export default function CardsSection({
  cards,
  cardEffects,
}: {
  cards: ArmoryCard[];
  cardEffects: ArmoryCardEffect[];
}) {
  if (cards.length === 0) return null;

  const grouped = cardEffects.reduce<
    Record<string, { tier: string; description: string }[]>
  >((acc, effect) => {
    const match = effect.effect_name.match(/^(.+?)\s+(\d+세트)$/);
    const setName = match ? match[1] : effect.effect_name;
    const tier = match ? match[2] : '';
    if (!acc[setName]) acc[setName] = [];
    acc[setName].push({ tier, description: effect.description });
    return acc;
  }, {});

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm font-bold tracking-wide text-gray-400 uppercase">
        카드 세트
      </p>

      {cardEffects.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(grouped).map(([setName, tiers]) => (
            <div key={setName} className="group relative">
              <span className="cursor-default rounded-full bg-indigo-100 px-2.5 py-1 text-sm font-semibold text-indigo-700">
                {setName}
              </span>
              <div className="absolute bottom-full left-1/2 z-10 mb-2 hidden w-max max-w-64 -translate-x-1/2 rounded-lg bg-gray-800 px-3 py-2 shadow-lg group-hover:block">
                <p className="mb-1.5 text-[12px] font-bold tracking-wide text-gray-400 uppercase">
                  {setName}
                </p>
                <div className="flex flex-col gap-1.5">
                  {tiers.map(({ tier, description }) => (
                    <div key={tier} className="flex items-start gap-1.5">
                      {tier && (
                        <span className="mt-0.5 shrink-0 rounded bg-indigo-500 px-1 py-0.5 text-[11px] font-bold text-white">
                          {tier}
                        </span>
                      )}
                      <p className="text-[13px] leading-relaxed text-gray-200">
                        {highlightText(description)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
