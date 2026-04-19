'use client';

import type { HourlyStat } from '@/types/monitor';

interface Props {
  stats: HourlyStat[];
}

export default function HourlyChart({ stats }: Props) {
  if (stats.length === 0) {
    return <p className="text-sm text-gray-400">시간대별 데이터가 없습니다.</p>;
  }

  const maxCalls = Math.max(...stats.map((s) => s.calls), 1);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="mb-4 text-sm font-semibold text-gray-600">시간대별 호출량</h3>
      <div className="flex items-end gap-1" style={{ minHeight: 120 }}>
        {stats.map((s) => {
          const h = Math.max((s.calls / maxCalls) * 100, 4);
          const hour = s.hour.slice(11, 16);
          return (
            <div key={s.hour} className="group flex flex-1 flex-col items-center">
              <div className="relative w-full">
                <div
                  className="mx-auto w-full max-w-[28px] rounded-t bg-indigo-400 transition-colors group-hover:bg-indigo-600"
                  style={{ height: `${h}px` }}
                />
                <div className="pointer-events-none absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white group-hover:block">
                  {s.calls}회 / {s.avg_latency_ms}ms
                </div>
              </div>
              <span className="mt-1 text-[10px] text-gray-400">{hour}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
