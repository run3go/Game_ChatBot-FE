'use client';

import { ArmoryProfile } from '@/types/profile';
import Image from 'next/image';

export default function CharacterHeader({
  profile,
}: {
  profile: ArmoryProfile;
}) {
  return (
    <div className="relative flex items-stretch gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
      <div className="min-w-0 flex-1 pr-32">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xl font-bold text-gray-900">
            {profile.character_name}
          </span>
          {profile.title && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-sm font-medium text-amber-700">
              {profile.title}
            </span>
          )}
        </div>
        <p className="text-base text-gray-500">
          {profile.character_class_name} · Lv.{profile.character_level} ·{' '}
          {profile.server_name}
        </p>
        {profile.guild_name && (
          <p className="text-sm text-gray-400">
            {profile.guild_name} ({profile.guild_member_grade})
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-3">
          <div className="text-center">
            <p className="text-xs text-gray-400">아이템 레벨</p>
            <p className="text-lg font-bold text-amber-600">
              {profile.item_avg_level.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">전투력</p>
            <p className="text-lg font-bold">
              {profile.combat_power.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">원정대</p>
            <p className="text-lg font-bold text-purple-800">
              Lv.{profile.expedition_level}
            </p>
          </div>
        </div>
      </div>
      {profile.character_image && (
        <div className="absolute top-0 right-0 bottom-0 w-100 overflow-hidden">
          <Image
            src={profile.character_image}
            alt={profile.character_name}
            sizes={'100'}
            fill
            quality={100}
            className="origin-center scale-[1.2] object-cover object-top"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/30 to-transparent" />
        </div>
      )}
    </div>
  );
}
