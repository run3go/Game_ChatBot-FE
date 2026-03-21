export interface ArmoryCollectible {
  character_name: string;
  type: string;
  icon: string;
  point: number;
  max_point: number;
}

export interface ArmoryCollectibleDetail {
  character_name: string;
  type: string;
  point_name: string;
  point: number;
  max_point: number;
}

export interface CollectibleData {
  armory_collectibles_tb: ArmoryCollectible[];
  armory_collectible_details_tb: ArmoryCollectibleDetail[];
}

export interface CollectibleResult {
  ui_type: 'COLLECTIBLE';
  data: CollectibleData;
}
