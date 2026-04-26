export type DataRow = Record<string, string | number | null | object>;

export interface MarketResult {
  ui_type: 'MARKET';
  data: DataRow[];
}

export interface AuctionResult {
  ui_type: 'AUCTION';
  data: DataRow[];
}
