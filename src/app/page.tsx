import Home from '@/components/home/Home';
import SkillList from '@/components/skill/SkillList';
import { ArmorySkill } from '@/types/skill';

const DUMMY_SKILLS: ArmorySkill[] = [
  {
    character_name: '첫번째도구',
    skill_name: '수호의 연주',
    icon: '',
    skill_level: 14,
    type: '홀딩',
    skill_type: '0',
    cooldown: 20,
    mana_cost: 110,
    weak_point: 0,
    stagger: '상',
    attack_type: null,
    is_counter: false,
    tripod_1_name: '강인함',
    tripod_2_name: '끝나지 않는 수호',
    tripod_3_name: '수호의 바람',
    rune_name: '작렬',
    rune_grade: '유물',
    tooltip: '아군에게 보호막을 부여합니다.',
  },
  {
    character_name: '첫번째도구',
    skill_name: '저스티스',
    icon: '',
    skill_level: 10,
    type: '지점',
    skill_type: '0',
    cooldown: 24,
    mana_cost: 120,
    weak_point: 0,
    stagger: '중상',
    attack_type: '집중',
    is_counter: false,
    tripod_1_name: '빛의 심판',
    tripod_2_name: '성스러운 땅',
    tripod_3_name: '저스티스의 심판',
    rune_name: '질풍',
    rune_grade: '전설',
    tooltip: '빛의 기운을 모아 강력한 타격을 가합니다.',
  },
  {
    character_name: '첫번째도구',
    skill_name: '신성한 검기',
    icon: '',
    skill_level: 12,
    type: '차지',
    skill_type: '0',
    cooldown: 16,
    mana_cost: 90,
    weak_point: 0,
    stagger: '중',
    attack_type: null,
    is_counter: true,
    tripod_1_name: '빛의 강화',
    tripod_2_name: '성검의 기운',
    tripod_3_name: '신성한 검격',
    rune_name: '각성',
    rune_grade: '영웅',
    tooltip: '성스러운 기운을 검에 담아 전방으로 베어냅니다.',
  },
  {
    character_name: '첫번째도구',
    skill_name: '웅장한 선율',
    icon: '',
    skill_level: 7,
    type: '홀딩',
    skill_type: '0',
    cooldown: 30,
    mana_cost: 150,
    weak_point: 0,
    stagger: '최상',
    attack_type: null,
    is_counter: false,
    tripod_1_name: '선율의 증폭',
    tripod_2_name: '공명',
    tripod_3_name: '웅장한 울림',
    rune_name: '작렬',
    rune_grade: '유물',
    tooltip: '성스러운 선율을 연주해 아군의 능력을 강화합니다.',
  },
  {
    character_name: '첫번째도구',
    skill_name: '성역',
    icon: '',
    skill_level: 11,
    type: '지점',
    skill_type: '0',
    cooldown: 20,
    mana_cost: 100,
    weak_point: 0,
    stagger: '하',
    attack_type: null,
    is_counter: false,
    tripod_1_name: '신성한 땅',
    tripod_2_name: '성역의 축복',
    tripod_3_name: '영원한 성역',
    rune_name: '집중',
    rune_grade: '희귀',
    tooltip: '신성한 공간을 만들어 아군을 회복시킵니다.',
  },
  {
    character_name: '첫번째도구',
    skill_name: '검의 기도',
    icon: '',
    skill_level: 4,
    type: '일반',
    skill_type: '0',
    cooldown: 12,
    mana_cost: 70,
    weak_point: 0,
    stagger: '중',
    attack_type: '집중',
    is_counter: false,
    tripod_1_name: '기도의 힘',
    tripod_2_name: '검의 성장',
    tripod_3_name: '정의의 검',
    rune_name: null,
    rune_grade: null,
    tooltip: '검에 성스러운 기운을 담아 기도합니다.',
  },
  {
    character_name: '첫번째도구',
    skill_name: '성스러운 보호',
    icon: '',
    skill_level: 9,
    type: '캐스팅',
    skill_type: '0',
    cooldown: 18,
    mana_cost: 95,
    weak_point: 0,
    stagger: '중상',
    attack_type: null,
    is_counter: false,
    tripod_1_name: '보호의 강화',
    tripod_2_name: '성스러운 방패',
    tripod_3_name: '완벽한 보호',
    rune_name: '신속',
    rune_grade: '전설',
    tooltip: '성스러운 기운으로 아군 전체를 보호합니다.',
  },
  {
    character_name: '첫번째도구',
    skill_name: '신의 분노',
    icon: '',
    skill_level: 10,
    type: '지점',
    skill_type: '0',
    cooldown: 36,
    mana_cost: 200,
    weak_point: 2,
    stagger: '최상',
    attack_type: '집중',
    is_counter: false,
    tripod_1_name: '분노의 강화',
    tripod_2_name: '신의 심판',
    tripod_3_name: '절대적 분노',
    rune_name: '작렬',
    rune_grade: '유물',
    tooltip: '신의 분노를 담아 강력한 광역 공격을 가합니다.',
  },
];

export default function page() {
  let ui_type = 'HOME';

  ui_type = 'SKILL';
  return (
    <div className="w-full">
      {(() => {
        switch (ui_type) {
          case 'HOME':
            return <Home />;
          case 'SKILL':
            return (
              <SkillList
                question="첫번째도구 스킬을 보여줘"
                responseText="'첫번째도구' 캐릭터의 스킬 정보를 가져왔습니다"
                skills={DUMMY_SKILLS}
              />
            );
        }
      })()}
    </div>
  );
}
