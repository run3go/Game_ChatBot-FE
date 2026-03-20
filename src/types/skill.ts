export interface ArmoryGemEffect {
  character_name: string;
  description: string;
}

export interface ArmorySkill {
  character_name: string;
  skill_name: string;
  icon: string;
  skill_level: number;
  type: SkillType;
  skill_type: string; // 예: "0"
  cooldown: number;
  mana_cost: number;
  weak_point: number;
  stagger: Stagger;
  attack_type: string | null;
  is_counter: boolean;
  tripod_1_name: string;
  tripod_2_name: string;
  tripod_3_name: string;
  rune_name: string | null;
  rune_grade: RuneGrade;
  tooltip: string;
}

type SkillType = '일반' | '콤보' | '지점' | '차지' | '캐스팅' | '홀딩' | '토글';

type Stagger = '하' | '중' | '중상' | '상' | '최상' | null;

type RuneGrade = '고급' | '희귀' | '영웅' | '전설' | null;

export interface ArmoryGem {
  character_name: string;
  slot: number;
  name: string;
  grade: '고급' | '희귀' | '영웅' | '전설' | '유물' | '고대' | string;
  level: number;
  skill_name: string;
  effect_type: string;
  effect_option: string;
  icon: string;
}

export interface SkillData {
  armory_skills_tb: ArmorySkill[];
  armory_gem_effects_tb: ArmoryGemEffect[];
  armory_gem_tb: ArmoryGem[];
}

export interface SkillResult {
  ui_type: 'SKILL';
  data: SkillData;
}
