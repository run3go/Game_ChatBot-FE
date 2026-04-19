'use client';

import type { LLMLog } from '@/types/monitor';
import { Fragment, useState } from 'react';

interface Props {
  logs: LLMLog[];
}

const TYPE_BADGE: Record<string, string> = {
  analysis: 'bg-purple-100 text-purple-700',
  sql: 'bg-blue-100 text-blue-700',
  answer: 'bg-emerald-100 text-emerald-700',
};

function formatTime(ts: string): string {
  const d = new Date(ts);
  return d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function formatDate(ts: string): string {
  const d = new Date(ts);
  return d.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' });
}

function formatCost(n: number): string {
  if (n === 0) return '$0';
  if (n < 0.000001) return `$${n.toFixed(9)}`;
  if (n < 0.001) return `$${n.toFixed(6)}`;
  if (n < 1) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(2)}`;
}

export default function LogTable({ logs }: Props) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  if (logs.length === 0) {
    return <p className="text-sm text-gray-400">로그가 없습니다.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold text-gray-500">
            <th className="px-4 py-3">시간</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3 text-right">Input</th>
            <th className="px-4 py-3 text-right">Output</th>
            <th className="px-4 py-3 text-right">총 토큰</th>
            <th className="px-4 py-3 text-right">응답시간</th>
            <th className="px-4 py-3 text-right">비용</th>
            <th className="px-4 py-3 text-center">상태</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <Fragment key={i}>
              <tr
                className="cursor-pointer border-b border-gray-50 hover:bg-gray-50"
                onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
              >
                <td className="px-4 py-3">
                  <span className="text-gray-400">{formatDate(log.timestamp)}</span>{' '}
                  {formatTime(log.timestamp)}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TYPE_BADGE[log.generator_type] ?? 'bg-gray-100 text-gray-600'}`}>
                    {log.generator_type}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono text-xs">{log.prompt_tokens.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-mono text-xs">{log.completion_tokens.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-mono text-xs">{log.total_tokens.toLocaleString()}</td>
                <td className="px-4 py-3 text-right">{(log.latency_ms / 1000).toFixed(1)}s</td>
                <td className="px-4 py-3 text-right font-mono text-xs">{formatCost(log.total_cost)}</td>
                <td className="px-4 py-3 text-center">
                  {log.success ? (
                    <span className="inline-block size-2 rounded-full bg-green-400" />
                  ) : (
                    <span className="inline-block size-2 rounded-full bg-red-400" />
                  )}
                </td>
              </tr>
              {expandedIdx === i && (
                <tr>
                  <td colSpan={8} className="bg-gray-50 px-6 py-4">
                    <LogDetail log={log} />
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LogDetail({ log }: { log: LLMLog }) {
  const { detail } = log;

  return (
    <div className="space-y-3 text-xs">
      {!log.success && log.error_message && (
        <div className="rounded-lg bg-red-50 p-3 text-red-700">
          <span className="font-semibold">Error: </span>
          {log.error_message}
        </div>
      )}

      {(log.total_cost > 0 || log.prompt_cost > 0) && (
        <div className="flex gap-4 rounded-lg bg-orange-50 p-3 text-orange-700">
          <span>Input: {formatCost(log.prompt_cost)}</span>
          <span>Output: {formatCost(log.completion_cost)}</span>
          <span className="font-semibold">Total: {formatCost(log.total_cost)}</span>
        </div>
      )}

      {log.retry_count > 0 && (
        <p className="text-amber-600">재시도 횟수: {log.retry_count}</p>
      )}

      {detail.input && (
        <div>
          <p className="mb-1 font-semibold text-gray-600">Input</p>
          <DetailBlock data={detail.input} />
        </div>
      )}

      {detail.output && Object.keys(detail.output).length > 0 && (
        <div>
          <p className="mb-1 font-semibold text-gray-600">Output</p>
          <DetailBlock data={detail.output} />
        </div>
      )}

      {detail.method && (
        <p className="text-gray-400">method: {detail.method}</p>
      )}
    </div>
  );
}

function DetailBlock({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="space-y-1">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex gap-2">
          <span className="shrink-0 font-medium text-gray-500">{key}:</span>
          <span className="break-all text-gray-700">
            {typeof value === 'object' ? (
              <pre className="max-h-40 overflow-auto rounded bg-white p-1 whitespace-pre-wrap">
                {JSON.stringify(value, null, 2)}
              </pre>
            ) : typeof value === 'string' && value.length > 200 ? (
              <details>
                <summary className="cursor-pointer text-indigo-500">
                  {value.slice(0, 100)}...
                </summary>
                <pre className="mt-1 max-h-40 overflow-auto rounded bg-white p-1 whitespace-pre-wrap">
                  {value}
                </pre>
              </details>
            ) : (
              String(value)
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
