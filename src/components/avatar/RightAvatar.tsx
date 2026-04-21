import { GRADE_STYLE } from '@/lib/datas/color';
import { ArmoryAvatar } from '@/types/avatar';
import SkeletonImage from '@/components/common/SkeletonImage';
import AvatarTooltip from './AvatarTooltip';

const SLOT_LABEL: Record<string, string> = {
  '무기 아바타': '무기',
  '머리 아바타': '머리',
  '상의 아바타': '상의',
  '하의 아바타': '하의',
  '얼굴1 아바타': '얼굴1',
  '얼굴2 아바타': '얼굴2',
  '이동 효과': '이동',
};

export default function RightAvatar({ avatar }: { avatar: ArmoryAvatar }) {
  const gradeStyle = GRADE_STYLE[avatar.grade];
  return (
    <AvatarTooltip avatar={avatar} align="left">
      <div className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5 transition-colors hover:bg-white/5">
        {/* 텍스트 */}
        <div className="min-w-0 flex-1 text-right">
          <span className="inline-block rounded bg-white/10 px-1.5 py-px text-[10px] text-gray-400">
            {SLOT_LABEL[avatar.type] ?? avatar.type}
          </span>
          <p
            className={`mt-1 truncate text-sm leading-tight font-semibold ${gradeStyle?.text ?? 'text-gray-300'}`}
          >
            {avatar.name}
          </p>
          {avatar.basic_effect && (
            <p className="mt-0.5 truncate text-xs leading-tight text-gray-500">
              {avatar.basic_effect}
            </p>
          )}
        </div>

        {/* 아이콘 */}
        <div className="relative shrink-0">
          <div
            className={`rounded-lg p-0.5 ${gradeStyle?.badge ?? 'border border-white/10 bg-white/5'}`}
          >
            {avatar.icon ? (
              <SkeletonImage
                src={avatar.icon}
                alt={avatar.name}
                width={44}
                height={44}
                className="size-11 rounded-md object-cover"
              />
            ) : (
              <div className="size-11 rounded-md bg-white/10" />
            )}
          </div>
        </div>
      </div>
    </AvatarTooltip>
  );
}
