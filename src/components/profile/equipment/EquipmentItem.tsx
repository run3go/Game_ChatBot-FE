import { GRADE_STYLE } from '@/lib/datas/color';
import { ArmoryEquipment } from '@/types/profile';
import Image from 'next/image';
import QualityBar from '../QualityBar';

const splitEffectLines = (text: string): string[] =>
  text
    .split('\n')
    .flatMap((line) => line.split(/(?<=[\d,])\s*(?=[가-힣])/))
    .filter(Boolean);

export default function EquipmentItem({ item }: { item: ArmoryEquipment }) {
  const gradeStyle = GRADE_STYLE[item.grade] ?? {
    text: 'text-gray-500',
    background: '',
  };
  const enhLabel =
    item.enhancement_level > 0 ? `+${item.enhancement_level}` : null;

  return (
    <div className="group relative flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-gray-50">
      <div className="relative shrink-0">
        <Image
          src={item.icon}
          alt={item.name}
          width={40}
          height={40}
          className={`size-10 rounded-lg object-cover ${gradeStyle.background}`}
        />
        {enhLabel && (
          <span
            className="absolute -right-1 -bottom-1 rounded px-0.5 text-[10px] leading-tight font-bold text-white shadow"
            style={{ background: 'rgba(0,0,0,0.7)' }}
          >
            {enhLabel}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-semibold ${gradeStyle.text}`}>
          {item.name}
        </p>
        <div className="mt-0.5 flex items-center gap-1">
          <span className="rounded bg-gray-100 px-1 py-0.5 text-[12px] text-gray-500">
            {item.type}
          </span>
        </div>
        <QualityBar quality={item.quality} />
      </div>

      {/* 호버 툴팁 */}
      <div className="pointer-events-none absolute bottom-full left-0 z-50 mb-1.5 hidden w-64 rounded-xl bg-gray-900 p-3 shadow-2xl group-hover:block">
        <p className={`text-base font-bold ${gradeStyle.text}`}>{item.name}</p>
        <p className="mt-0.5 text-[12px] text-gray-400">
          {item.grade} {item.type}
          {item.item_tier ? ` · 티어 ${item.item_tier}` : ''}
        </p>

        {item.quality >= 0 && (
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="text-[12px] text-gray-500">품질</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-700">
              <div
                className={`h-full rounded-full ${
                  item.quality === 100
                    ? 'bg-orange-300'
                    : item.quality >= 90
                      ? 'bg-purple-600'
                      : item.quality >= 70
                        ? 'bg-blue-400'
                        : item.quality >= 30
                          ? 'bg-green-500'
                          : 'bg-yellow-300'
                }`}
                style={{ width: `${item.quality}%` }}
              />
            </div>
            <span className="text-[12px] font-bold text-gray-300">
              {item.quality}
            </span>
          </div>
        )}

        {item.basic_effect && (
          <>
            <div className="my-2 border-t border-gray-700" />
            <p className="mb-1 text-[12px] font-semibold text-gray-300">
              기본 효과
            </p>
            {splitEffectLines(item.basic_effect).map((line, i) => (
              <p key={i} className="text-[12px] leading-relaxed text-gray-400">
                {line}
              </p>
            ))}
          </>
        )}

        {item.additional_effect && (
          <>
            <div className="my-2 border-t border-gray-700" />
            <p className="mb-1 text-[12px] font-semibold text-gray-300">
              추가 효과
            </p>
            {splitEffectLines(item.additional_effect).map((line, i) => (
              <p key={i} className="text-[12px] leading-relaxed text-gray-400">
                {line}
              </p>
            ))}
          </>
        )}

        {item.ark_passive_effect && (
          <>
            <div className="my-2 border-t border-gray-700" />
            <p className="text-[12px] font-semibold text-indigo-400">
              아크 패시브 · {item.ark_passive_effect}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
