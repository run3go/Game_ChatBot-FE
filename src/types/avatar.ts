export type AvatarGrade = '고급' | '희귀' | '영웅' | '전설' | '유물' | '고대';

export type AvatarSlotType =
  | '무기 아바타'
  | '머리 아바타'
  | '상의 아바타'
  | '하의 아바타'
  | '얼굴1 아바타'
  | '얼굴2 아바타'
  | '이동 효과';

export interface ArmoryAvatar {
  character_name: string;
  type: AvatarSlotType | string;
  name: string;
  icon: string;
  grade: AvatarGrade | string;
  is_set: boolean;
  is_inner: boolean;
  basic_effect: string | null;
  tendency_stat: string | null;
  source: string | null;
}

export interface ArmoryProfile {
  character_name: string;
  server_name: string;
  character_class_name: string;
  character_level: number;
  item_avg_level: number;
  combat_power: number;
  character_image: string;
  expedition_level: number;
  town_level: number;
  town_name: string;
  title: string | null;
  guild_member_grade: string | null;
  guild_name: string | null;
  using_skill_point: number;
  total_skill_point: number;
  honor_point: number;
  stat_atk: number;
  stat_hp: number;
  stat_crit: number;
  stat_spec: number;
  stat_swift: number;
  stat_dom: number;
  stat_end: number;
  stat_exp: number;
  tend_intellect: number;
  tend_courage: number;
  tend_charm: number;
  tend_kindness: number;
  updated_at: string;
}

export interface AvatarData {
  armory_avatars_tb: ArmoryAvatar[];
  armory_profile_tb: ArmoryProfile[];
}

export interface AvatarResult {
  ui_type: 'AVATAR';
  data: AvatarData;
}
