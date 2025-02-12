import { NextResponse } from "next/server";
import { Trader } from "@/app/types/trader";

const traders: Trader[] = [
  {
    id: "1",
    name: "Alex Thompson",
    wallet: "Hx7...3Kj9",
    image: "/avatar.jpg",
    rank: 1,
    xFollowers: 12500,
    xTag: "@alexthompson",
    tokensTraded: 1250,
    winRate: 78.5,
    tradesCount: { buy: 450, sell: 380 },
    avgBuy: { solAmount: 15.8, usdAmount: 1580 },
    avgEntry: 95.5,
    avgHold: 48, // hours
    realizedPnl: { solAmount: 245.8, usdAmount: 24580 },
  },
  {
    id: "2",
    name: "Sarah Chen",
    wallet: "Kp9...7Yt2",
    image: "/avatar.jpg",
    rank: 2,
    xFollowers: 8900,
    xTag: "@sarahchen",
    tokensTraded: 980,
    winRate: 82.3,
    tradesCount: { buy: 320, sell: 290 },
    avgBuy: { solAmount: 12.4, usdAmount: 1240 },
    avgEntry: 88.2,
    avgHold: 36,
    realizedPnl: { solAmount: 198.6, usdAmount: 19860 },
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    wallet: "Np5...9Qw4",
    image: "/avatar.jpg",
    rank: 3,
    xFollowers: 15200,
    xTag: "@mrodriguez",
    tokensTraded: 1580,
    winRate: 75.8,
    tradesCount: { buy: 580, sell: 520 },
    avgBuy: { solAmount: 18.2, usdAmount: 1820 },
    avgEntry: 92.8,
    avgHold: 24,
    realizedPnl: { solAmount: 286.5, usdAmount: 28650 },
  },
];

export async function GET() {
  return NextResponse.json(traders);
}
