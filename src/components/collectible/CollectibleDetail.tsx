'use client';

import {
  ArmoryCollectible,
  ArmoryCollectibleDetail,
} from '@/types/collectible';
import Image from 'next/image';
import { useState } from 'react';

export default function CollectibleDetail({
  selected,
  details,
}: {
  selected: ArmoryCollectible;
  details: ArmoryCollectibleDetail[];
}) {
  const [hideAcquired, setHideAcquired] = useState(false);

  const filteredDetails = hideAcquired
    ? details.filter((d) => d.point < d.max_point)
    : details;

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
        <Image
          src={selected.icon}
          alt={selected.type}
          width={24}
          height={24}
          className="shrink-0"
        />
        <span className="font-bold text-gray-800">
          {selected.type} {selected.point}/{selected.max_point}
        </span>
        <label className="ml-auto flex cursor-pointer items-center gap-1.5 text-xs text-gray-500 hover:text-black">
          <input
            type="checkbox"
            checked={hideAcquired}
            onChange={(e) => setHideAcquired(e.target.checked)}
            className="accent-indigo-500"
          />
          미획득 항목만 보기
        </label>
      </div>

      {/* 상세 목록 */}
      <ul className="max-h-116 divide-y divide-gray-50 overflow-y-auto">
        {filteredDetails.length === 0 ? (
          <li className="px-4 py-6 text-center text-sm text-gray-400">
            {hideAcquired ? '미획득 항목이 없습니다.' : '세부 정보가 없습니다.'}
          </li>
        ) : (
          filteredDetails.map((detail, i) => {
            const isComplete = detail.point === detail.max_point;
            return (
              <li
                key={`${detail.point_name}-${i}`}
                className="flex items-center px-4 py-2.5 text-sm"
              >
                <span className="mr-2 text-xs text-gray-400">{i + 1}.</span>
                <span
                  className={isComplete ? 'text-gray-700' : 'text-gray-500'}
                >
                  {detail.point_name}
                </span>
                <span
                  className={`ml-auto font-medium ${
                    isComplete ? 'text-indigo-600' : 'text-orange-500'
                  }`}
                >
                  {detail.point} / {detail.max_point}
                </span>
              </li>
            );
          })
        )}
      </ul>
    </>
  );
}
