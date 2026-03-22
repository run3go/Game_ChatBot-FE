'use client';

import { TotalInfoData } from '@/types/total_info';
import { useEffect, useRef, useState } from 'react';
import ArkGrid from '../ark_grid/ArkGrid';
import ArkPassive from '../ark_passive/ArkPassive';
import AvatarList from '../avatar/AvatarList';
import Collectible from '../collectible/Collectible';
import EngravingList from '../engraving/EngravingList';
import Profile from '../profile/Profile';
import SkillList from '../skill/SkillList';

const TABS = [
  { key: 'profile', label: '프로필' },
  { key: 'skill', label: '스킬' },
  { key: 'ark_grid', label: '아크 그리드' },
  { key: 'ark_passive', label: '아크 패시브' },
  { key: 'engraving', label: '각인' },
  { key: 'avatar', label: '아바타' },
  { key: 'collectible', label: '수집품' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function TotalInfo({ data }: { data: TotalInfoData }) {
  const [activeTab, setActiveTab] = useState<TabKey>('profile');
  const [hoveredTab, setHoveredTab] = useState<TabKey | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayTab = hoveredTab ?? activeTab;

  useEffect(() => {
    const idx = TABS.findIndex((t) => t.key === displayTab);
    const btn = tabRefs.current[idx];
    const container = containerRef.current;
    if (!btn || !container) return;
    const containerLeft = container.getBoundingClientRect().left;
    const btnRect = btn.getBoundingClientRect();
    setIndicatorStyle({
      left: btnRect.left - containerLeft + container.scrollLeft,
      width: btnRect.width,
    });
  }, [displayTab]);

  return (
    <div className="mt-4 flex flex-col gap-0">
      {/* 탭 헤더 */}
      <div
        ref={containerRef}
        className="relative flex gap-1 overflow-x-auto border-b border-white/10 px-1 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
        onMouseLeave={() => setHoveredTab(null)}
      >
        {/* 슬라이딩 인디케이터 */}
        <span
          className="pointer-events-none absolute bottom-0 h-0.5 bg-blue-400 transition-all duration-200"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        />
        {TABS.map((tab, idx) => (
          <button
            key={tab.key}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            onClick={() => setActiveTab(tab.key)}
            onMouseEnter={() => setHoveredTab(tab.key)}
            className={`cursor-pointer px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? 'text-blue-400'
                : 'text-black-500 hover:text-blue-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="pt-3">
        {activeTab === 'profile' && (
          <Profile
            data={{
              armory_profile_tb: data.armory_profile_tb,
              armory_equipment_tb: data.armory_equipment_tb,
              armory_card_tb: data.armory_card_tb,
              armory_card_effects_tb: data.armory_card_effects_tb,
              armory_gem_effects_tb: data.armory_gem_effects_tb,
              armory_gem_tb: data.armory_gem_tb,
            }}
          />
        )}
        {activeTab === 'skill' && (
          <SkillList
            data={{
              armory_skills_tb: data.armory_skills_tb,
              armory_gem_effects_tb: data.armory_gem_effects_tb,
              armory_gem_tb: data.armory_gem_tb,
            }}
          />
        )}
        {activeTab === 'ark_grid' && (
          <ArkGrid
            data={{
              ark_grid_cores_tb: data.ark_grid_cores_tb,
              ark_grid_effects_tb: data.ark_grid_effects_tb,
              ark_grid_gems_tb: data.ark_grid_gems_tb,
            }}
          />
        )}
        {activeTab === 'ark_passive' && (
          <ArkPassive
            data={{
              ark_passive_effects_tb: data.ark_passive_effects_tb,
              ark_passive_points_tb: data.ark_passive_points_tb,
            }}
          />
        )}
        {activeTab === 'engraving' && (
          <EngravingList
            data={{
              armory_engravings_tb: data.armory_engravings_tb,
            }}
          />
        )}
        {activeTab === 'avatar' && (
          <AvatarList
            data={{
              armory_avatars_tb: data.armory_avatars_tb,
              armory_profile_tb: data.armory_profile_tb,
            }}
          />
        )}
        {activeTab === 'collectible' && (
          <Collectible
            data={{
              armory_collectibles_tb: data.armory_collectibles_tb,
              armory_collectible_details_tb: data.armory_collectible_details_tb,
            }}
          />
        )}
      </div>
    </div>
  );
}
