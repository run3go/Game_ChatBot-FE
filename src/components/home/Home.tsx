'use client';

import { getRecentNickname } from '@/lib/apis/user';
import {
  IconAlertTriangle,
  IconBuildingStore,
  IconMessageChatbotFilled,
  IconShieldHalf,
  IconUser,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import FeatureCard from './FeatureCard';

const STATIC_CARDS = [
  {
    icon: <IconShieldHalf size={24} color="#e11d48" />,
    iconBgColor: 'bg-rose-100',
    title: '레이드',
    description: '레이드 보스 정보, 관문별 체력 등을 안내합니다',
    examples: ['4막 2관 보스 체력을 알려줘', '1740에 갈 수 있는 적정 레이드'],
  },
  {
    icon: <IconBuildingStore size={24} color="#0d9488" />,
    iconBgColor: 'bg-teal-100',
    title: '경매장/거래소',
    description: '아이템 시세, 거래소 가격 정보를 조회합니다',
    examples: ['강화 재료 시세', '10레벨 보석 가격이 얼마야?'],
  },
];

interface HomeProps {
  onSend?: (message: string) => void;
}

export default function Home({ onSend }: HomeProps) {
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    getRecentNickname().then(setNickname);
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
        '요즘 처단자는 어떤 코어를 많이 써?',
      ],
    },
    ...STATIC_CARDS,
  ];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-12">
      <div className="flex flex-col items-center">
        <div className="grid size-20 place-items-center rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 shadow-lg shadow-violet-200">
          <IconMessageChatbotFilled size={50} color="white" />
        </div>
        <h1 className="mt-6 text-4xl font-bold text-gray-900">
          My Game Chat Bot
        </h1>
        <span className="mt-3 text-sm text-gray-400">
          나에게 특화된 게임 챗봇
        </span>
      </div>

      <div className="mt-6 flex w-full max-w-3xl items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
        <IconAlertTriangle
          size={16}
          className="mt-0.5 shrink-0 text-amber-500"
        />
        <p>
          현재 베타 운영 중으로, 답변 가능한 질문이 제한되어 있어요. 아래 예시를
          참고해 질문해 주시면 더 정확한 답변을 받을 수 있어요.
        </p>
      </div>

      <div className="mt-10 w-full max-w-3xl">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
            지원 카테고리
          </p>
          <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-600">
            Beta
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {featureCards.map((card) => (
            <FeatureCard
              key={card.title}
              icon={card.icon}
              iconBgColor={card.iconBgColor}
              title={card.title}
              description={card.description}
              examples={card.examples}
              onExampleClick={onSend}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
