'use client';

import type { GeneratorStats } from '@/types/monitor';

interface Props {
  byGenerator: Record<string, GeneratorStats>;
}

const LABEL: Record<string, string> = {
  analysis: 'Analysis Generator',
  sql: 'SQL Generator',
  answer: 'Answer Generator',
};

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function fmtCost(n: number): string {
  if (n === 0) return '$0';
  if (n < 0.000001) return `$${n.toFixed(9)}`;
  if (n < 0.001) return `$${n.toFixed(6)}`;
  if (n < 1) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(2)}`;
}

export default function GeneratorTable({ byGenerator }: Props) {
  const entries = Object.entries(byGenerator);

  if (entries.length === 0) {
    return <p className="text-sm text-gray-400">데이터가 없습니다.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold text-gray-500">
            <th className="px-4 py-3">Generator</th>
            <th className="px-4 py-3 text-right">호출수</th>
            <th className="px-4 py-3 text-right">Input 토큰</th>
            <th className="px-4 py-3 text-right">Output 토큰</th>
            <th className="px-4 py-3 text-right">총 토큰</th>
            <th className="px-4 py-3 text-right">평균 응답</th>
            <th className="px-4 py-3 text-right">비용</th>
            <th className="px-4 py-3 text-right">에러율</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([key, stats]) => (
            <tr key={key} className="border-b border-gray-50 hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{LABEL[key] ?? key}</td>
              <td className="px-4 py-3 text-right">{stats.calls}</td>
              <td className="px-4 py-3 text-right">{fmt(stats.prompt_tokens)}</td>
              <td className="px-4 py-3 text-right">{fmt(stats.completion_tokens)}</td>
              <td className="px-4 py-3 text-right">{fmt(stats.total_tokens)}</td>
              <td className="px-4 py-3 text-right">{(stats.avg_latency_ms / 1000).toFixed(1)}s</td>
              <td className="px-4 py-3 text-right font-mono text-xs">{fmtCost(stats.total_cost)}</td>
              <td className="px-4 py-3 text-right">
                <span className={stats.error_rate > 5 ? 'font-semibold text-red-600' : 'text-green-600'}>
                  {stats.error_rate}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
