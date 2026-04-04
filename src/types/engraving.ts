export type EngravingGrade = '고급' | '희귀' | '영웅' | '전설' | '유물' | '고대';

export interface ArmoryEngraving {
  character_name: string;
  name: string;
  grade: EngravingGrade | string;
  level: number;
  ability_stone_level: number | null;
  description: string;
  icon_url?: string | null;
  legend_final?: string | null;
  relic_final?: string | null;
  basic_effect?: string | null;
  legend_effect?: string | null;
  relic_effect?: string | null;
  stone_effect?: string | null;
}

export interface EngravingData {
  armory_engravings_tb: ArmoryEngraving[];
}

export interface EngravingResult {
  ui_type: 'ENGRAVING';
  data: EngravingData;
}
