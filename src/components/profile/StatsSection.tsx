'use client';

import { ArmoryProfile } from '@/types/profile';

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-base font-bold text-gray-800">
        {value.toLocaleString()}
      </span>
    </div>
  );
}

export default function StatsSection({ profile }: { profile: ArmoryProfile }) {
  const combatStats = [
    { label: '치명', value: profile.stat_crit },
    { label: '특화', value: profile.stat_spec },
    { label: '신속', value: profile.stat_swift },
    { label: '제압', value: profile.stat_dom },
    { label: '인내', value: profile.stat_end },
    { label: '숙련', value: profile.stat_exp },
  ];

  const tendencies = [
    { label: '지성', value: profile.tend_intellect },
    { label: '용기', value: profile.tend_courage },
    { label: '매력', value: profile.tend_charm },
    { label: '친절', value: profile.tend_kindness },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-sm font-bold tracking-wide text-gray-400 uppercase">
          전투 특성
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {combatStats.map((s) => (
            <StatRow key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
        <div className="mt-3 border-t pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">공격력</span>
            <span className="text-base font-bold text-gray-700">
              {profile.stat_atk.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">체력</span>
            <span className="text-base font-bold text-gray-700">
              {profile.stat_hp.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-sm font-bold tracking-wide text-gray-400 uppercase">
          성향
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {tendencies.map((t) => (
            <div key={t.label} className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{t.label}</span>
              <span className="text-base font-bold text-gray-700">{t.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 border-t pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">스킬 포인트</span>
            <span className="text-base font-bold text-gray-700">
              {profile.using_skill_point} / {profile.total_skill_point}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">명예 점수</span>
            <span className="text-base font-bold text-gray-700">
              {profile.honor_point}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
