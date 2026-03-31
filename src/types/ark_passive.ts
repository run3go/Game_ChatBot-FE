export interface ArkPassiveEffectItem {
  character_name: string;
  name: ArkPassiveName;
  collected_at: string;
  icon: string | null;
  tier: string | null;
  effect_name: string;
  level: number | null;
  level_effect: string | null;
  req_points: string | null;
  max_level: string | null;
}

export interface ArkPassivePointItem {
  character_name: string;
  name: ArkPassiveName;
  collected_at: string;
  value: number;
  point_rank: number | null;
  point_level: number | null;
}

export type ArkPassiveName = '진화' | '깨달음' | '도약';

export interface ArkPassiveData {
  ark_passive_effects_tb: ArkPassiveEffectItem[];
  ark_passive_points_tb: ArkPassivePointItem[];
}

export interface ArkPassiveResult {
  ui_type: 'ARK_PASSIVE';
  data: ArkPassiveData;
}
