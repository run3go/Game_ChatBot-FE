'use client';

import GeneratorTable from '@/components/monitor/GeneratorTable';
import HourlyChart from '@/components/monitor/HourlyChart';
import LogTable from '@/components/monitor/LogTable';
import SummaryCards from '@/components/monitor/SummaryCards';
import { fetchLogs, fetchStats, fetchSummary } from '@/lib/apis/monitor';
import type { HourlyStat, LLMLog, MonitorSummary } from '@/types/monitor';
import { useCallback, useEffect, useState } from 'react';

type GeneratorFilter = '' | 'analysis' | 'sql' | 'answer';

export default function MonitorPage() {
  const [summary, setSummary] = useState<MonitorSummary | null>(null);
  const [logs, setLogs] = useState<LLMLog[]>([]);
  const [stats, setStats] = useState<HourlyStat[]>([]);
  const [filter, setFilter] = useState<GeneratorFilter>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [s, l, st] = await Promise.all([
        fetchSummary(),
        fetchLogs(filter || undefined),
        fetchStats(),
      ]);
      setSummary(s);
      setLogs(l);
      setStats(st);
    } catch (e) {
      setError(e instanceof Error ? e.message : '데이터를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 10_000);
    return () => clearInterval(interval);
  }, [load]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 overflow-y-auto p-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">LLM 모니터링</h1>
        <button
          onClick={load}
          disabled={loading}
          className="rounded-lg bg-indigo-500 px-4 py-2 text-sm text-white transition-colors hover:bg-indigo-600 disabled:opacity-50"
        >
          {loading ? '로딩 중...' : '새로고침'}
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* 요약 카드 */}
      {summary && <SummaryCards summary={summary} />}

      {/* 시간대별 차트 */}
      <HourlyChart stats={stats} />

      {/* Generator별 통계 */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-700">Generator별 통계</h2>
        {summary && <GeneratorTable byGenerator={summary.by_generator} />}
      </div>

      {/* 로그 테이블 */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700">호출 로그</h2>
          <div className="flex gap-2">
            {(['', 'analysis', 'sql', 'answer'] as GeneratorFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  filter === f
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f || '전체'}
              </button>
            ))}
          </div>
        </div>
        <LogTable logs={logs} />
      </div>
    </div>
  );
}
