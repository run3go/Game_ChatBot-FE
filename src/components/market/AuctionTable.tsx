'use client';

import Pagination from '@/components/common/Pagination';
import {
  ACCESSORY_STAT_RANGE,
  MAINSTREAM_STATS,
  TIER_RULES,
  TIER_STYLE,
  type OptionTier,
} from '@/components/profile/equipment/utils';
import { DataRow } from '@/types/market';
import { useEffect, useState } from 'react';

type SortKey = 'quality' | 'buy_price' | 'stat_pct';
type SortDir = 'asc' | 'desc';

const PAGE_SIZE = 6;
const BASE_STATS = new Set(['힘', '민첩', '지능', '체력', '깨달음']);

const GRADE_STYLE: Record<string, string> = {
  고대: 'bg-amber-100 text-amber-700',
  유물: 'bg-orange-100 text-orange-700',
  전설: 'bg-yellow-100 text-yellow-700',
  영웅: 'bg-purple-100 text-purple-700',
  희귀: 'bg-blue-100 text-blue-700',
  고급: 'bg-green-100 text-green-700',
};

function parseOptions(raw: unknown): Record<string, number> | null {
  if (!raw) return null;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (typeof raw === 'object') return raw as Record<string, number>;
  return null;
}

function extractStatName(key: string): string {
  return key.replace(/\s*[%+]+$/, '').trim();
}
const BRACELET_EXCLUDE = new Set(['도약', '부여 효과 수량']);

function getOptTier(statKey: string, rawVal: string): OptionTier | null {
  const statName = extractStatName(statKey);
  if (!MAINSTREAM_STATS.has(statName)) return null;
  const num = parseFloat(rawVal.replace(/,/g, ''));
  if (isNaN(num)) return null;
  const rules = TIER_RULES.filter((r) => r.stat === statName);
  if (!rules.length) return null;
  const isPct = statKey.trimEnd().endsWith('%');
  const rule =
    rules.length === 1
      ? rules[0]
      : (rules.find((r) => r.pct === isPct) ?? rules[0]);
  if (num >= rule.상) return '상';
  if (num >= rule.중) return '중';
  return '하';
}

function getStatPercent(name: string, value: number): number | null {
  const type = ['목걸이', '귀걸이', '반지'].find((t) => name.includes(t));
  if (!type) return null;
  const range = ACCESSORY_STAT_RANGE[type];
  if (!range) return null;
  return Math.max(
    0,
    Math.min(
      100,
      Math.round(((value - range.min) / (range.max - range.min)) * 100),
    ),
  );
}

function formatOptValue(key: string, rawVal: string): string {
  const num = parseFloat(rawVal.replace(/,/g, ''));
  if (isNaN(num)) return rawVal;
  const isPercent = key.trimEnd().endsWith('%');
  return isPercent ? `+${num}%` : `+${num.toLocaleString('ko-KR')}`;
}

function getImportantOpts(row: DataRow): { key: string; value: string }[] {
  const opts = parseOptions(row.options);
  if (!opts) return [];
  return Object.entries(opts)
    .filter(([key]) => !BASE_STATS.has(extractStatName(key)))
    .slice(0, 3)
    .map(([key, value]) => ({ key: key.trim(), value: String(value) }));
}

function GemCard({ row }: { row: DataRow }) {
  const opts = parseOptions(row.options);
  console.log('[GemCard] row.options raw:', row.options, '→ parsed:', opts);
  const skillEntry = Object.entries(opts ?? {})[0];
  const skillName = skillEntry
    ? skillEntry[0].replace(/\s*%$/, '').trim()
    : null;
  const skillPct = skillEntry ? Number(skillEntry[1]) : null;
  const grade = String(row.grade ?? '');

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm leading-snug font-semibold text-gray-800">
          {String(row.name ?? '-')}
        </span>
        {grade && (
          <span
            className={`shrink-0 rounded-md px-1.5 py-0.5 text-xs font-semibold ${GRADE_STYLE[grade] ?? 'bg-gray-100 text-gray-500'}`}
          >
            {grade}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
        {skillName ? (
          <>
            <span className="text-sm text-gray-600">{skillName}</span>
            {skillPct != null && (
              <span className="text-sm font-bold text-orange-500">
                +{skillPct}%
              </span>
            )}
          </>
        ) : (
          <span className="w-full text-center text-sm text-gray-300">-</span>
        )}
      </div>

      <div className="flex justify-end">
        <span className="text-sm font-bold text-indigo-600">
          {row.buy_price != null
            ? Number(row.buy_price).toLocaleString('ko-KR') + 'G'
            : '-'}
        </span>
      </div>
    </div>
  );
}

function QualityBadge({ value }: { value: number }) {
  const color =
    value === 100
      ? 'bg-amber-100 text-amber-700'
      : value >= 90
        ? 'bg-green-100 text-green-700'
        : value >= 70
          ? 'bg-blue-100 text-blue-700'
          : 'bg-gray-100 text-gray-500';
  return (
    <span className={`rounded-md px-1.5 py-0.5 text-xs font-semibold ${color}`}>
      {value}
    </span>
  );
}

function getBraceletStatColor(val: number): string {
  if (val >= 120)
    return 'text-orange-500 [text-shadow:0_0_8px_rgba(249,115,22,0.6)]';
  if (val >= 100) return 'text-purple-600';
  if (val >= 81) return 'text-blue-600';
  return 'text-green-600';
}

function BraceletCard({ row }: { row: DataRow }) {
  const opts = parseOptions(row.options);
  const grantCount = Object.entries(opts ?? {}).find(
    ([k]) => extractStatName(k) === '부여 효과 수량',
  )?.[1];
  const combatStats = Object.entries(opts ?? {}).filter(
    ([key]) => !BRACELET_EXCLUDE.has(extractStatName(key)),
  );

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm leading-snug font-semibold text-gray-800">
          {String(row.name ?? '-')}
        </span>
        {row.quality != null && <QualityBadge value={Number(row.quality)} />}
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-xl bg-gray-50 px-3 py-2">
        {combatStats.map(([key, val]) => (
          <span key={key} className="text-xs text-gray-500">
            {key}{' '}
            <span
              className={`font-semibold ${getBraceletStatColor(Number(val))}`}
            >
              {Number(val).toLocaleString('ko-KR')}
            </span>
          </span>
        ))}
        {grantCount != null && (
          <span className="ml-auto rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
            {grantCount}부여
          </span>
        )}
      </div>

      <div className="flex justify-end">
        <span className="text-sm font-bold text-indigo-600">
          {row.buy_price != null
            ? Number(row.buy_price).toLocaleString('ko-KR') + 'G'
            : '-'}
        </span>
      </div>
    </div>
  );
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="ml-1 text-gray-300">↕</span>;
  return (
    <span className="ml-1 text-indigo-400">{dir === 'asc' ? '↑' : '↓'}</span>
  );
}

export default function AuctionTable({ data }: { data: DataRow[] }) {
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<SortKey>('buy_price');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  useEffect(() => {
    const update = () => {
      const next = window.innerWidth < 640 ? 3 : PAGE_SIZE;
      setPageSize((prev) => {
        if (prev !== next) setPage(0);
        return next;
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!data || data.length === 0) return null;

  console.log(data);
  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(0);
  }

  function getRowSortVal(row: DataRow): number {
    if (sortKey === 'stat_pct') {
      const opts = parseOptions(row.options);
      const trioVal = opts?.['힘 +'] ?? opts?.['민첩 +'] ?? opts?.['지능 +'];
      if (trioVal == null) return -1;
      return getStatPercent(String(row.name ?? ''), trioVal) ?? -1;
    }
    return Number(row[sortKey] ?? 0);
  }

  const isBraceletData = data.some((r) =>
    Object.keys(parseOptions(r.options) ?? {}).some(
      (k) => extractStatName(k) === '부여 효과 수량',
    ),
  );

  const isGemData = data.some((r) => String(r.name ?? '').includes('의 보석'));

  const sortKeys =
    isBraceletData || isGemData
      ? (['buy_price'] as SortKey[])
      : (['quality', 'buy_price', 'stat_pct'] as SortKey[]);

  const sorted = [...data].sort((a, b) => {
    const av = getRowSortVal(a);
    const bv = getRowSortVal(b);
    return sortDir === 'asc' ? av - bv : bv - av;
  });

  const totalPages = Math.ceil(sorted.length / pageSize);
  const pageData = sorted.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="flex flex-col gap-4">
      {/* 정렬 버튼 */}
      <div className="flex gap-2">
        {sortKeys.map((key) => {
          const label =
            key === 'quality'
              ? '품질순'
              : key === 'buy_price'
                ? '가격순'
                : '스탯순';
          const active = sortKey === key;
          return (
            <button
              key={key}
              onClick={() => toggleSort(key)}
              className={`flex items-center rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
              <SortIcon active={active} dir={sortDir} />
            </button>
          );
        })}
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {pageData.map((row, i) => {
          const opts = parseOptions(row.options);
          if (
            Object.keys(opts ?? {}).some(
              (k) => extractStatName(k) === '부여 효과 수량',
            )
          )
            return <BraceletCard key={i} row={row} />;

          if (String(row.name ?? '').includes('의 보석'))
            return <GemCard key={i} row={row} />;

          const trioVal =
            opts?.['힘 +'] ?? opts?.['민첩 +'] ?? opts?.['지능 +'];
          const important = getImportantOpts(row);

          const tiers = important.map((opt) => getOptTier(opt.key, opt.value));
          const statPct =
            trioVal != null
              ? getStatPercent(String(row.name ?? ''), trioVal)
              : null;

          return (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm"
            >
              {/* 아이템명 + 품질 */}
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm leading-snug font-semibold text-gray-800">
                  {String(row.name ?? '-')}
                </span>
                {row.quality != null && (
                  <QualityBadge value={Number(row.quality)} />
                )}
              </div>

              {/* 옵션 3개 */}
              <div className="grid grid-cols-3 divide-x divide-gray-100 rounded-xl bg-gray-50 py-2">
                {[0, 1, 2].map((idx) => {
                  const opt = important[idx];
                  const tier = tiers[idx];
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-1 px-2"
                    >
                      <span
                        className="w-full text-center text-xs leading-tight break-keep text-gray-400"
                        title={opt?.key}
                      >
                        {opt
                          ? opt.key.length > 7
                            ? opt.key.slice(0, 6) + '…'
                            : opt.key
                          : '-'}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          tier === '상'
                            ? 'text-yellow-500 [text-shadow:0_0_8px_rgba(234,179,8,0.6)]'
                            : tier
                              ? TIER_STYLE[tier]
                              : 'text-gray-300'
                        }`}
                      >
                        {opt ? formatOptValue(opt.key, opt.value) : '-'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* 힘/민/지 + 즉구가 */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  힘/민/지{' '}
                  <span className="text-gray-600">
                    {trioVal != null ? trioVal.toLocaleString('ko-KR') : '-'}
                  </span>
                  {statPct != null && (
                    <span
                      className={`rounded px-1.5 py-0.5 text-xs font-semibold ${
                        statPct >= 70
                          ? 'bg-amber-100 text-amber-700'
                          : statPct >= 40
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {statPct}%
                    </span>
                  )}
                </span>
                <span className="text-sm font-bold text-indigo-600">
                  {row.buy_price != null
                    ? Number(row.buy_price).toLocaleString('ko-KR') + 'G'
                    : '-'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="px-2">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPrevious={() => setPage((p) => Math.max(0, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          />
        </div>
      )}
    </div>
  );
}
