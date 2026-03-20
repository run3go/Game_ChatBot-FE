'use client';

import { ArkGridCoreItem, ArkGridData } from '@/types/ark_grid';
import NodeRow from './NodeRow';

const STAT_GROWTH_PER_LEVEL = {
  공격력: 0.0366,
  '추가 피해': 0.0808,
  '보스 피해': 0.082,
  낙인력: 0.1666,
  '아군 공격 강화': 0.13,
  '아군 피해 강화': 0.0523,
};

export default function ArkGrid({ data }: { data: ArkGridData }) {
  const effects = (data.ark_grid_effects_tb || []).map((effect) => {
    const name = effect.name as keyof typeof STAT_GROWTH_PER_LEVEL;
    const growthRate = STAT_GROWTH_PER_LEVEL[name] ?? 0;

    return {
      name: effect.name,
      level: effect.level,
      value: (Math.ceil(effect.level * growthRate * 100) / 100).toFixed(2),
    };
  });

  const gems = data.ark_grid_gems_tb || [];

  return (
    <div className="flex flex-col gap-4 py-4">
      {/* 효과 요약 */}
      <div className="grid grid-cols-3 gap-3">
        {effects.map((effect) => (
          <div
            key={effect.name}
            className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
          >
            <p className="text-sm text-gray-700">
              <span className="mr-1 font-semibold">{effect.name}</span>
              Lv {effect.level}
            </p>
            <p className="text-xs">
              <span className="text-red-500">+{effect.value}%</span>
            </p>
          </div>
        ))}
      </div>

      {/* 코어 노드 목록 */}
      <div className="flex flex-col gap-2">
        {(data.ark_grid_cores_tb || []).map((core) => (
          <NodeRow
            key={core.slot_index}
            core={core as ArkGridCoreItem}
            gems={gems.filter((g) => g.core_index === core.slot_index)}
          />
        ))}
      </div>
    </div>
  );
}
