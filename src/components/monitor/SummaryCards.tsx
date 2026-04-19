'use client';

import type { MonitorSummary } from '@/types/monitor';

interface Props {
  summary: MonitorSummary;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function formatCost(n: number): string {
  if (n === 0) return '$0';
  if (n < 0.000001) return `$${n.toFixed(9)}`;
  if (n < 0.001) return `$${n.toFixed(6)}`;
  if (n < 1) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(2)}`;
}

const cards = (s: MonitorSummary) => [
  { label: '모델', value: s.model_name, color: 'bg-violet-50 text-violet-700' },
  { label: '총 호출', value: formatNumber(s.total_calls), color: 'bg-blue-50 text-blue-700' },
  { label: '총 토큰', value: formatNumber(s.total_tokens), color: 'bg-emerald-50 text-emerald-700' },
  { label: 'Input 토큰', value: formatNumber(s.total_prompt_tokens), color: 'bg-cyan-50 text-cyan-700' },
  { label: 'Output 토큰', value: formatNumber(s.total_completion_tokens), color: 'bg-teal-50 text-teal-700' },
  { label: '평균 응답', value: `${(s.avg_latency_ms / 1000).toFixed(1)}s`, color: 'bg-amber-50 text-amber-700' },
  { label: '에러율', value: `${s.error_rate}%`, color: s.error_rate > 5 ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700' },
  { label: '총 비용', value: formatCost(s.total_cost), color: 'bg-orange-50 text-orange-700' },
  { label: 'Input 비용', value: formatCost(s.total_prompt_cost), color: 'bg-rose-50 text-rose-700' },
  { label: 'Output 비용', value: formatCost(s.total_completion_cost), color: 'bg-pink-50 text-pink-700' },
];

export default function SummaryCards({ summary }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
      {cards(summary).map((c) => (
        <div key={c.label} className={`rounded-xl p-4 ${c.color}`}>
          <p className="text-xs font-medium opacity-70">{c.label}</p>
          <p className="mt-1 text-xl font-bold">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
