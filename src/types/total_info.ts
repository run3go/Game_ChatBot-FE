import { ProfileData } from './profile';
import { ArkGridData } from './ark_grid';
import { ArkPassiveData } from './ark_passive';
import { EngravingData } from './engraving';
import { AvatarData } from './avatar';
import { CollectibleData } from './collectible';
import { SkillData } from './skill';

export type TotalInfoData =
  ProfileData &
  ArkGridData &
  ArkPassiveData &
  EngravingData &
  Omit<AvatarData, 'armory_profile_tb'> &
  CollectibleData &
  Omit<SkillData, 'armory_gem_effects_tb' | 'armory_gem_tb'>;

export interface TotalInfoResult {
  ui_type: 'TOTAL_INFO';
  data: TotalInfoData;
}
