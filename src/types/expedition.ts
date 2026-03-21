export interface ExpeditionCharacter {
  ServerName: string;
  CharacterName: string;
  CharacterLevel: number;
  CharacterClassName: string;
  ItemAvgLevel: string;
}

export interface ExpeditionData {
  expedition_tb: ExpeditionCharacter[];
}

export interface ExpeditionResult {
  ui_type: 'EXPEDITION';
  data: ExpeditionData;
}
