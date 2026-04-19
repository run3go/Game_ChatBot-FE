import type { HourlyStat, LLMLog, MonitorSummary } from '@/types/monitor';

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchSummary(): Promise<MonitorSummary> {
  const res = await fetch(`${BASE}/monitor/summary`);
  if (!res.ok) throw new Error('Failed to fetch summary');
  return res.json();
}

export async function fetchLogs(
  generatorType?: string,
  limit = 50,
  offset = 0,
): Promise<LLMLog[]> {
  const params = new URLSearchParams();
  if (generatorType) params.set('generator_type', generatorType);
  params.set('limit', String(limit));
  params.set('offset', String(offset));

  const res = await fetch(`${BASE}/monitor/logs?${params}`);
  if (!res.ok) throw new Error('Failed to fetch logs');
  return res.json();
}

export async function fetchStats(hours = 24): Promise<HourlyStat[]> {
  const res = await fetch(`${BASE}/monitor/stats?hours=${hours}`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}
