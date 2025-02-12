import { NextResponse } from "next/server";
import { Trader } from "@/app/types/trader";

//Mock data (avgHold is in minutes)
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
    avgEntry: 95000,
    avgHold: 150,
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
    avgEntry: 88000,
    avgHold: 72,
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
    avgEntry: 92000,
    avgHold: 330,
    realizedPnl: { solAmount: 286.5, usdAmount: 28650 },
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // apply sort
  const sortBy = searchParams.get("sortBy") || "rank";
  const sortDirection = searchParams.get("sortDirection") || "asc";

  traders.sort((a: Trader, b: Trader) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;

    // Special handling for tradesCount
    if (sortBy === "tradesCount") {
      const aTotal = a.tradesCount.buy + a.tradesCount.sell;
      const bTotal = b.tradesCount.buy + b.tradesCount.sell;
      return (aTotal - bTotal) * multiplier;
    }

    // Special handling for avgBuy
    if (sortBy === "avgBuy") {
      const aValue = a.avgBuy.solAmount;
      const bValue = b.avgBuy.solAmount;
      return (aValue - bValue) * multiplier;
    }
    // special handling for realizedPnl
    if (sortBy === "realizedPnl") {
      const aValue = a.realizedPnl.solAmount;
      const bValue = b.realizedPnl.solAmount;
      return (aValue - bValue) * multiplier;
    }

    const aValue = a[sortBy as keyof Trader] as number;
    const bValue = b[sortBy as keyof Trader] as number;
    return (aValue - bValue) * multiplier;
  });

  return NextResponse.json(traders);
}
