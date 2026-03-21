import { ArmoryGem, ArmoryGemEffect } from './skill';

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
  title: string;
  guild_member_grade: string;
  guild_name: string;
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

export interface ArmoryEquipment {
  character_name: string;
  type: string;
  name: string;
  icon: string;
  grade: string;
  enhancement_level: number;
  quality: number;
  item_tier: number | null;
  basic_effect: string | null;
  additional_effect: string | null;
  ark_passive_effect: string | null;
  advanced_reinforcement: number;
}

export interface ArmoryCard {
  character_name: string;
  slot: number;
  name: string;
  icon: string;
  grade: string;
  awake_count: number;
  awake_total: number;
  description: string;
}

export interface ArmoryCardEffect {
  character_name: string;
  effect_name: string;
  description: string;
}

export interface ProfileData {
  armory_profile_tb: ArmoryProfile[];
  armory_equipment_tb: ArmoryEquipment[];
  armory_card_tb: ArmoryCard[];
  armory_card_effects_tb: ArmoryCardEffect[];
  armory_gem_effects_tb: ArmoryGemEffect[];
  armory_gem_tb: ArmoryGem[];
}

export interface ProfileResult {
  ui_type: 'PROFILE';
  data: ProfileData;
}
