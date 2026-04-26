import { ArmoryProfile } from './profile';

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
  tendency_charm: number;
  tendency_courage: number;
  tendency_intellect: number;
  tendency_kindness: number;
  source: string | null;
}

export interface AvatarData {
  armory_avatars_tb: ArmoryAvatar[];
  armory_profile_tb: ArmoryProfile[];
}

export interface AvatarResult {
  ui_type: 'AVATAR';
  data: AvatarData;
}
