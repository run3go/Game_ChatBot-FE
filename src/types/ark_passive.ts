export interface ArkPassiveEffectItem {
  character_name: string;
  name: ArkPassiveName;
  icon: string;
  tier: '1티어' | '2티어' | '3티어' | '4티어' | '5티어' | string;
  effect_name: string;
  level: number;
}

export interface ArkPassivePointItem {
  character_name: string;
  name: ArkPassiveName;
  value: number;
  description: string;
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
