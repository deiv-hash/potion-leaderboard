export type TimeFrame = "daily" | "weekly" | "monthly" | "all-time";

export interface Trader {
  id: string;
  name: string;
  wallet: string;
  image: string;
  rank: number;
  xFollowers: number;
  xTag: string;
  tokensTraded: number;
  winRate: number;
  tradesCount: { buy: number; sell: number };
  avgBuy: { solAmount: number; usdAmount: number };
  avgEntry: number;
  avgHold: number;
  realizedPnl: { solAmount: number; usdAmount: number };
}

export interface Filters {
  timeFrame: TimeFrame;
  sortBy: keyof Trader;
  sortDirection: "asc" | "desc";
}
