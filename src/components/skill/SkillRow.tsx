import { ArmoryGem, ArmorySkill } from '@/types/skill';
import Image from 'next/image';

const GRADE_STYLE: Record<string, string> = {
  고급: 'bg-green-100 text-green-700 border border-green-200',
  희귀: 'bg-blue-100 text-blue-700 border border-blue-200',
  영웅: 'bg-purple-100 text-purple-700 border border-purple-200',
  전설: 'bg-orange-100 text-orange-700 border border-orange-200',
  유물: 'bg-red-100 text-red-700 border border-red-200',
  고대: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
};

const GEM_SHORT_NAME: Record<string, string> = {
  겁화의: '겁',
  작열의: '작',
  멸화의: '멸',
  홍염의: '홍',
};

interface Props {
  skill: ArmorySkill;
  gems?: ArmoryGem[];
}

const TRIPOD_COLORS = ['bg-teal-400', 'bg-indigo-400', 'bg-violet-400'];

export default function SkillRow({ skill, gems = [] }: Props) {
  const tripods = [
    skill.tripod_1_name,
    skill.tripod_2_name,
    skill.tripod_3_name,
  ];

  return (
    <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
      {/* 스킬 아이콘 */}
      <div className="size-10 shrink-0 overflow-hidden rounded-lg bg-indigo-100 ring-2 ring-indigo-200">
        {skill.icon ? (
          <Image
            src={skill.icon}
            alt={skill.skill_name}
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-indigo-300 to-violet-400" />
        )}
      </div>

      {/* 스킬 이름 + 레벨 */}
      <div className="w-32 shrink-0">
        <p className="truncate text-sm font-semibold text-gray-600">
          {skill.skill_name}
        </p>
        <div className="flex gap-2 text-xs">
          <p className="text-gray-400">{skill.skill_level}레벨</p>
        </div>
      </div>

      {/* 트라이포드 3개 */}
      <div className="grid flex-1 grid-cols-3 gap-2">
        {tripods.map((tripod, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-2 py-1"
          >
            <div
              className={`size-2.5 shrink-0 rounded-full ${TRIPOD_COLORS[i]}`}
            />
            <span className="truncate text-xs text-gray-600">
              {tripod || '-'}
            </span>
          </div>
        ))}
      </div>

      {/* 보석 */}
      <div className="flex w-24 shrink-0 gap-1">
        {gems.map((gem, i) => (
          <div
            key={i}
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${GRADE_STYLE[gem.grade] ?? 'bg-gray-100 text-gray-600'}`}
          >
            {gem.level}
            {GEM_SHORT_NAME[gem.name.split(' ')[1]]}
          </div>
        ))}
      </div>

      {/* 룬 */}
      <div className="w-[44.1px]">
        {skill.rune_name && skill.rune_grade && (
          <div
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${GRADE_STYLE[skill.rune_grade] ?? 'bg-gray-100 text-gray-600'}`}
          >
            {skill.rune_name}
          </div>
        )}
      </div>
    </div>
  );
}
