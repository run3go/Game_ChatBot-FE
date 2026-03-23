'use client';

import { AvatarData } from '@/types/avatar';
import Image from 'next/image';
import LeftAvatar from './LeftAvatar';
import RightAvatar from './RightAvatar';

const SLOT_ORDER = [
  '무기 아바타',
  '머리 아바타',
  '상의 아바타',
  '하의 아바타',
  '얼굴1 아바타',
  '얼굴2 아바타',
  '이동 효과',
];

const FACE_TYPES = ['얼굴1 아바타', '얼굴2 아바타'];

export default function AvatarList({ data }: { data: AvatarData }) {
  const avatars = data.armory_avatars_tb;
  const profile = data.armory_profile_tb[0];

  const sorted = [...avatars].sort(
    (a, b) => SLOT_ORDER.indexOf(a.type) - SLOT_ORDER.indexOf(b.type),
  );

  const leftAvatars = sorted.filter(
    (a) => a.is_inner || FACE_TYPES.includes(a.type),
  );

  const rightAvatars = sorted.filter(
    (a) => !a.is_inner && !FACE_TYPES.includes(a.type),
  );

  return (
    <div className="rounded-2xl bg-[#14181d]">
      {/* 헤더 */}
      {profile && (
        <div className="border-b border-white/10 px-5 py-3">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-white">
              {profile.character_name}
            </span>
            <span className="text-sm text-gray-400">
              {profile.character_class_name}
            </span>
            <span className="text-sm text-gray-500">
              Lv.{profile.character_level}
            </span>
          </div>
        </div>
      )}

      {/* 3단 레이아웃 */}
      <div className="relative grid grid-cols-[1fr_auto_1fr] overflow-hidden">
        {/* 가운데 — 캐릭터 이미지 (절대 위치로 전체 너비에 걸쳐 배치) */}
        {profile?.character_image && (
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
            <div className="relative">
              <div className="absolute inset-x-0 bottom-0 h-3/4 rounded-full bg-indigo-500/10 blur-3xl" />
              <Image
                src={profile.character_image}
                alt={profile.character_name}
                width={300}
                height={540}
                quality={100}
                className="relative h-110 w-auto object-cover object-top drop-shadow-2xl"
                style={{ imageRendering: 'crisp-edges' }}
              />
              <div className="absolute right-0 bottom-0 left-0 z-10 h-12 bg-linear-to-t from-[#14181d] to-transparent" />
            </div>
          </div>
        )}

        {/* 왼쪽 — 아바타 (그라디언트로 바깥은 불투명, 안쪽은 투명) */}
        <div className="relative z-10 bg-linear-to-r from-[#14181d] via-[#14181d]/80 to-transparent py-4 pr-2 pl-4">
          <p className="mb-3 text-xs font-semibold tracking-widest text-gray-500 uppercase">
            아바타
          </p>
          <div className="space-y-1">
            {leftAvatars.map((avatar) => (
              <LeftAvatar
                key={`${avatar.type}-${avatar.name}`}
                avatar={avatar}
              />
            ))}
          </div>
        </div>

        {/* 가운데 — 이미지 높이 유지용 스페이서 */}
        <div className="min-w-32 min-h-110" />

        {/* 오른쪽 — 덧입기 아바타 (그라디언트로 바깥은 불투명, 안쪽은 투명) */}
        <div className="relative z-10 bg-linear-to-l from-[#14181d] via-[#14181d]/80 to-transparent py-4 pr-4 pl-2">
          <p className="mb-3 text-right text-xs font-semibold tracking-widest text-gray-500 uppercase">
            덧입기 아바타
          </p>
          <div className="space-y-1">
            {rightAvatars.map((avatar) => (
              <RightAvatar
                key={`${avatar.type}-${avatar.name}`}
                avatar={avatar}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
