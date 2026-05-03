'use client';

import { getRecentNickname } from '@/lib/apis/user';
import {
  IconAlertTriangle,
  IconArrowsLeftRight,
  IconBuildingStore,
  IconCards,
  IconRefresh,
  IconUser,
  IconUserPlus,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import FeatureCard from './FeatureCard';

const STATIC_CARDS = [
  {
    icon: <IconBuildingStore size={24} color="#0d9488" />,
    iconBgColor: 'bg-teal-100',
    title: '경매장/거래소',
    description: '아이템 시세, 거래소 가격 정보를 조회합니다',
    examples: [
      '10레벨 겁화 시세',
      '딜러 상중 반지는 얼마야?',
      '현재 유물 각인서 시세를 알려줘',
    ],
    comingSoon: false,
  },
  {
    icon: <IconCards size={24} color="#6366f1" />,
    iconBgColor: 'bg-indigo-100',
    title: '롤토체스',
    description: '롤토체스 정보를 조회합니다',
    examples: [],
    comingSoon: true,
  },
];

const TIPS = [
  {
    icon: <IconUser size={15} />,
    text: '닉네임과 함께 물어봐주시면 더 정확하게 찾아드려요!',
  },
  {
    icon: <IconUserPlus size={15} />,
    text: '처음 조회하는 캐릭터는 데이터 수집이 필요해요.',
  },
  {
    icon: <IconArrowsLeftRight size={15} />,
    text: '두 캐릭터 비교가 가능해요(예: A랑 B 스킬 비교해줘)',
  },
  {
    icon: <IconRefresh size={15} />,
    text: '최신 정보를 위해 데이터는 계속해서 갱신 중이에요.',
  },
];

interface HomeProps {
  onSend?: (message: string) => void;
}

export default function Home({ onSend }: HomeProps) {
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    getRecentNickname()
      .then(setNickname)
      .catch(() => {});
  }, []);

  const characterName = nickname ? `'${nickname}'` : '000';

  const featureCards = [
    {
      icon: <IconUser size={24} color="#7c3aed" />,
      iconBgColor: 'bg-violet-100',
      title: '캐릭터',
      description: '전투력, 스펙, 보유 캐릭터 등 캐릭터 정보를 조회합니다',
      examples: [
        `${characterName}의 전투력이 어떻게 돼?`,
        `${characterName}의 정보`,
        '요즘 고기 워로드는 어떤 코어를 많이 써?',
      ],
      comingSoon: false,
    },
    ...STATIC_CARDS,
  ];

  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center px-4 py-8 md:px-8 md:py-12">
      <div className="flex flex-col items-center">
        <Image
          src="/icon.png"
          alt="무물봇"
          width={120}
          height={120}
          priority
          className="size-16 md:size-30"
          unoptimized
        />
        <h1 className="text-xl font-bold text-gray-900 md:text-4xl">무물봇</h1>
        <span className="mt-2 text-sm text-gray-400 md:mt-3">
          구글링보다 빠른 게임 데이터 검색, 무물봇에게 한마디만 하세요!
        </span>
      </div>

      <div className="mt-4 flex w-full max-w-3xl items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 md:mt-6">
        <IconAlertTriangle
          size={16}
          className="mt-0.5 shrink-0 text-amber-500"
        />
        <p>
          현재 베타 운영 중으로, 답변 가능한 질문이 제한되어 있어요. 아래 예시를
          참고해 주세요.
        </p>
      </div>

      {/* 모바일에서 숨김 — 중요도가 낮고 공간 차지 큼 */}
      <div className="mt-3 hidden w-full max-w-3xl grid-cols-2 md:grid">
        {TIPS.map((tip, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-lg bg-gray-50 px-2 py-3 text-sm text-gray-600"
          >
            <span className="mt-0.5 shrink-0 text-gray-400">{tip.icon}</span>
            {tip.text}
          </div>
        ))}
      </div>

      <div className="mt-4 w-full max-w-3xl md:mt-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
            지원 카테고리
          </p>
          <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-600">
            Beta
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {featureCards.map((card) => (
            <FeatureCard
              key={card.title}
              icon={card.icon}
              iconBgColor={card.iconBgColor}
              title={card.title}
              description={card.description}
              examples={card.examples}
              onExampleClick={onSend}
              comingSoon={card.comingSoon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
