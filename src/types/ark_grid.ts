export interface ArkGridCoreItem {
  character_name: string;
  slot_index: number;
  name: string;
  grade: '영웅' | '전설' | '유물' | '고대';
  point: number;
  icon: string;
  core_option: string;
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
  grade: string;
  is_active: boolean;
  icon: string;
  gem_effect: string;
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
