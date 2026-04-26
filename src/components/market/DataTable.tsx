import Pagination from '@/components/common/Pagination';
import { DataRow } from '@/types/market';
import { useMemo, useState } from 'react';

const COLUMN_LABELS: Record<string, string> = {
  name: '아이템명',
  item_name: '아이템명',
  item_type: '부위',
  grade: '등급',
  tier: '티어',
  quality: '품질',
  buy_price: '즉구가',
  bid_price: '입찰가',
  end_date: '종료 일시',
  current_min_price: '현재 최저가',
  yday_avg_price: '전일 평균가',
  yesterday_avg_price: '전일 평균가',
  recent_price: '최근가',
  bundle_count: '묶음 수량',
  unit_price: '개당 가격',
  price_date: '날짜',
  collected_at: '수집 일시',
  level: '레벨',
  gem_type: '보석 종류',
  price_diff: '가격 변동',
  price_change: '가격 변동',
  trade_remain_count: '거래 가능 횟수',
};

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'object') return JSON.stringify(value);
  if (typeof value === 'number') return value.toLocaleString('ko-KR');
  const str = String(value);
  // ISO 날짜 문자열 포맷
  if (/^\d{4}-\d{2}-\d{2}(T.*)?$/.test(str)) {
    return str.slice(0, 10);
  }
  return str;
}

function getLabel(col: string): string {
  return COLUMN_LABELS[col] ?? col;
}

export default function DataTable({ data }: { data: DataRow[] }) {
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil((data?.length ?? 0) / pageSize));
  const safePage = Math.min(page, pageCount - 1);

  const pageData = useMemo(
    () => (data ?? []).slice(safePage * pageSize, (safePage + 1) * pageSize),
    [data, safePage],
  );

  if (!data || data.length === 0) return null;

  const columns = Object.keys(data[0]);

  return (
    <div className="rounded-2xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500"
                >
                  {getLabel(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60"
              >
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2.5 text-gray-700">
                    {formatValue(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <div className="border-t border-gray-100 px-4 py-3">
          <Pagination
            page={safePage}
            totalPages={pageCount}
            onPrevious={() => setPage((prev) => Math.max(0, prev - 1))}
            onNext={() => setPage((prev) => Math.min(pageCount - 1, prev + 1))}
          />
        </div>
      )}
    </div>
  );
}
