export interface ArkGridCoreItem {
  character_name: string;
  slot_index: number;
  collected_at: string;
  name: string;
  grade: '영웅' | '전설' | '유물' | '고대';
  point: number;
  icon: string;
  level_1_point: number | null;
  level_1_option: string | null;
  level_2_point: number | null;
  level_2_option: string | null;
  level_3_point: number | null;
  level_3_option: string | null;
  level_4_point: number | null;
  level_4_option: string | null;
  level_5_point: number | null;
  level_5_option: string | null;
  level_6_point: number | null;
  level_6_option: string | null;
}

export interface ArkGridEffectItem {
  character_name: string;
  name:
    | '공격력'
    | '추가 피해'
    | '보스 피해'
    | '낙인력'
    | '아군 피해 강화'
    | '아군 공격 강화';
  level: number;
}

export interface ArkGridGemItem {
  character_name: string;
  core_index: number;
  gem_index: number;
  collected_at: string;
  grade: string;
  is_active: boolean;
  icon: string;
  required_willpower: number | null;
  willpower_efficiency: number | null;
  point_type: string | null;
  point_value: number | null;
  effect_1_name: string | null;
  effect_1_level: number | null;
  effect_1_value: string | null;
  effect_2_name: string | null;
  effect_2_level: number | null;
  effect_2_value: string | null;
}

export interface ArkGridData {
  ark_grid_cores_tb: ArkGridCoreItem[];
  ark_grid_effects_tb: ArkGridEffectItem[];
  ark_grid_gems_tb: ArkGridGemItem[];
}

export interface ArkGridResult {
  ui_type: 'ARK_GRID';
  data: ArkGridData;
}
