'use client';

import {
  IconMessageChatbotFilled,
  IconNews,
  IconTrendingUp,
  IconUsersGroup,
} from '@tabler/icons-react';
import FeatureCard from './FeatureCard';
import SuggestionButton from './SuggestionButton';

const FEATURE_CARDS = [
  {
    icon: <IconUsersGroup size={24} color="#7c3aed" />,
    iconBgColor: 'bg-violet-100',
    title: '내 원정대',
    description: "'첫번째도구'가 속한 원정대 정보를 불러옵니다",
  },
  {
    icon: <IconNews size={24} color="#7c3aed" />,
    iconBgColor: 'bg-violet-100',
    title: '최신 패치노트',
    description: '가장 최신 업데이트 내역을 가져옵니다',
  },
  {
    icon: <IconTrendingUp size={24} color="#0d9488" />,
    iconBgColor: 'bg-teal-100',
    title: '거래소 시세 추이',
    description: '거래소 물품의 시세 변동을 가져옵니다',
  },
];

const SUGGESTIONS = [
  '4막 2관 보스 체력을 알려줘',
  "'첫번째도구' 전투력이 어떻게 돼?",
  '지금 진행중인 이벤트',
  '요즘 처단자는 어떤 코어를 많이 써?',
];

interface HomeProps {
  onSend?: (message: string) => void;
}

export default function Home({ onSend }: HomeProps) {
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

      <div className="mt-10 grid w-full max-w-3xl grid-cols-3 gap-4">
        {FEATURE_CARDS.map((card) => (
          <FeatureCard
            key={card.title}
            icon={card.icon}
            iconBgColor={card.iconBgColor}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>

      <div className="mt-6 w-full max-w-3xl">
        <p className="mb-3 text-xs font-medium tracking-wider text-gray-400 uppercase">
          이렇게 물어보세요
        </p>
        <div className="grid grid-cols-2 gap-2">
          {SUGGESTIONS.map((label) => (
            <SuggestionButton key={label} label={label} onClick={() => onSend?.(label)} />
          ))}
        </div>
      </div>
    </div>
  );
}
