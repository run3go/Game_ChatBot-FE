'use client';

import { ArmoryCollectible, CollectibleData } from '@/types/collectible';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import CollectibleDetail from './CollectibleDetail';

import adventureMedalLeafIcon from '@/assets/images/icons/adventure_medal_leaf.png';
import crimsnailIcon from '@/assets/images/icons/crimsnail.png';
import giantHeartsIcon from '@/assets/images/icons/giant_hearts.png';
import greatpicturesIcon from '@/assets/images/icons/greatpictures.png';
import islandIcon from '@/assets/images/icons/island.png';
import mokokoIcon from '@/assets/images/icons/mokoko.png';
import nukmanIcon from '@/assets/images/icons/nukman.png';
import orgelIcon from '@/assets/images/icons/orgel.png';
import orpeusStarIcon from '@/assets/images/icons/orpeus_star.png';
import voyageAdventureLeafIcon from '@/assets/images/icons/voyage_adventure_leaf.png';
import worldtreeLeafIcon from '@/assets/images/icons/worldtree_leaf.png';

const ICON_IMAGE: Record<string, StaticImageData> = {
  '모코코 씨앗': mokokoIcon,
  '섬의 마음': islandIcon,
  '거인의 심장': giantHeartsIcon,
  '세계수의 잎': worldtreeLeafIcon,
  '오르페우스의 별': orpeusStarIcon,
  '위대한 미술품': greatpicturesIcon,
  '항해 모험물': voyageAdventureLeafIcon,
  '이그네아의 징표': adventureMedalLeafIcon,
  '기억의 오르골': orgelIcon,
  '크림스네일의 해도': crimsnailIcon,
  '누크만의 환영석': nukmanIcon,
};

export default function Collectible({ data }: { data: CollectibleData }) {
  const { armory_collectibles_tb, armory_collectible_details_tb } = data;
  const [selected, setSelected] = useState<ArmoryCollectible | undefined>(
    armory_collectibles_tb[0],
  );

  if (!selected) return null;

  const details = armory_collectible_details_tb.filter(
    (d) => d.type === selected.type,
  );

  return (
    <div className="flex gap-4">
      {/* 좌측: 수집품 목록 */}
      <div className="self-start">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {armory_collectibles_tb.map((item) => {
            const isSelected = item.type === selected.type;
            const isComplete = item.point === item.max_point;
            return (
              <button
                key={item.type}
                onClick={() => setSelected(item)}
                className={`group relative flex cursor-pointer flex-col items-center gap-1 rounded-lg p-2 transition-all duration-150 ${
                  isSelected
                    ? 'bg-indigo-50 ring-2 ring-indigo-300'
                    : 'hover:bg-gray-100 hover:shadow-sm'
                }`}
              >
                {!isComplete && (
                  <span className="absolute -top-1 -right-1 rounded-full bg-orange-400 px-1 py-0.5 text-[10px] leading-none font-bold text-white">
                    미완료
                  </span>
                )}
                <div className="relative">
                  <Image
                    src={ICON_IMAGE[item.type]}
                    alt={item.type}
                    width={40}
                    height={40}
                    className={`transition-opacity ${!isComplete ? 'opacity-60 group-hover:opacity-80' : ''}`}
                  />
                </div>
                <span
                  className={`text-xs font-medium ${
                    isComplete ? 'text-gray-700' : 'text-orange-500'
                  }`}
                >
                  {item.point} / {item.max_point}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 우측: 상세 정보 */}
      <div className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white">
        <CollectibleDetail selected={selected} details={details} />
      </div>
    </div>
  );
}
