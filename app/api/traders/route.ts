import { NextResponse } from "next/server";
import { Trader } from "@/app/types/trader";

// Mock data for different time frames
const tradersData = {
  daily: [
    {
      id: "3",
      name: "Mike Rodriguez",
      wallet: "Np5...9Qw4",
      image: "/avatar.jpg",
      rank: 1,
      xFollowers: 15200,
      xTag: "@mrodriguez",
      tokensTraded: 158,
      winRate: 75.8,
      tradesCount: { buy: 58, sell: 52 },
      avgBuy: { solAmount: 18.2, usdAmount: 1820 },
      avgEntry: 92000,
      avgHold: 330,
      realizedPnl: { solAmount: 28.5, usdAmount: 2850 },
    },
    {
      id: "1",
      name: "Alex Thompson",
      wallet: "Hx7...3Kj9",
      image: "/avatar.jpg",
      rank: 2,
      xFollowers: 12500,
      xTag: "@alexthompson",
      tokensTraded: 125,
      winRate: 78.5,
      tradesCount: { buy: 45, sell: 38 },
      avgBuy: { solAmount: 15.8, usdAmount: 1580 },
      avgEntry: 95000,
      avgHold: 150,
      realizedPnl: { solAmount: 24.8, usdAmount: 2480 },
    },
    {
      id: "2",
      name: "Sarah Chen",
      wallet: "Kp9...7Yt2",
      image: "/avatar.jpg",
      rank: 3,
      xFollowers: 8900,
      xTag: "@sarahchen",
      tokensTraded: 98,
      winRate: 82.3,
      tradesCount: { buy: 32, sell: 29 },
      avgBuy: { solAmount: 12.4, usdAmount: 1240 },
      avgEntry: 88000,
      avgHold: 72,
      realizedPnl: { solAmount: 19.6, usdAmount: 1960 },
    },
  ],
  weekly: [
    {
      id: "3",
      name: "Mike Rodriguez",
      wallet: "Np5...9Qw4",
      image: "/avatar.jpg",
      rank: 1,
      xFollowers: 15200,
      xTag: "@mrodriguez",
      tokensTraded: 980,
      winRate: 73.4,
      tradesCount: { buy: 380, sell: 340 },
      avgBuy: { solAmount: 19.5, usdAmount: 1950 },
      avgEntry: 91000,
      avgHold: 360,
      realizedPnl: { solAmount: 186.5, usdAmount: 18650 },
    },
    {
      id: "1",
      name: "Alex Thompson",
      wallet: "Hx7...3Kj9",
      image: "/avatar.jpg",
      rank: 2,
      xFollowers: 12500,
      xTag: "@alexthompson",
      tokensTraded: 850,
      winRate: 76.2,
      tradesCount: { buy: 320, sell: 280 },
      avgBuy: { solAmount: 16.2, usdAmount: 1620 },
      avgEntry: 94000,
      avgHold: 180,
      realizedPnl: { solAmount: 156.8, usdAmount: 15680 },
    },
    {
      id: "2",
      name: "Sarah Chen",
      wallet: "Kp9...7Yt2",
      image: "/avatar.jpg",
      rank: 3,
      xFollowers: 8900,
      xTag: "@sarahchen",
      tokensTraded: 620,
      winRate: 80.5,
      tradesCount: { buy: 240, sell: 210 },
      avgBuy: { solAmount: 13.1, usdAmount: 1310 },
      avgEntry: 87000,
      avgHold: 90,
      realizedPnl: { solAmount: 142.6, usdAmount: 14260 },
    },
  ],
  monthly: [
    {
      id: "3",
      name: "Mike Rodriguez",
      wallet: "Np5...9Qw4",
      image: "/avatar.jpg",
      rank: 1,
      xFollowers: 15200,
      xTag: "@mrodriguez",
      tokensTraded: 4200,
      winRate: 72.6,
      tradesCount: { buy: 1580, sell: 1420 },
      avgBuy: { solAmount: 20.2, usdAmount: 2020 },
      avgEntry: 90000,
      avgHold: 380,
      realizedPnl: { solAmount: 786.5, usdAmount: 78650 },
    },
    {
      id: "1",
      name: "Alex Thompson",
      wallet: "Hx7...3Kj9",
      image: "/avatar.jpg",
      rank: 2,
      xFollowers: 12500,
      xTag: "@alexthompson",
      tokensTraded: 3600,
      winRate: 75.8,
      tradesCount: { buy: 1250, sell: 1100 },
      avgBuy: { solAmount: 16.8, usdAmount: 1680 },
      avgEntry: 93000,
      avgHold: 200,
      realizedPnl: { solAmount: 685.8, usdAmount: 68580 },
    },
    {
      id: "2",
      name: "Sarah Chen",
      wallet: "Kp9...7Yt2",
      image: "/avatar.jpg",
      rank: 3,
      xFollowers: 8900,
      xTag: "@sarahchen",
      tokensTraded: 2800,
      winRate: 79.2,
      tradesCount: { buy: 980, sell: 850 },
      avgBuy: { solAmount: 13.8, usdAmount: 1380 },
      avgEntry: 86000,
      avgHold: 110,
      realizedPnl: { solAmount: 598.6, usdAmount: 59860 },
    },
  ],
  "all-time": [
    {
      id: "3",
      name: "Mike Rodriguez",
      wallet: "Np5...9Qw4",
      image: "/avatar.jpg",
      rank: 1,
      xFollowers: 15200,
      xTag: "@mrodriguez",
      tokensTraded: 15800,
      winRate: 71.2,
      tradesCount: { buy: 5800, sell: 5200 },
      avgBuy: { solAmount: 21.0, usdAmount: 2100 },
      avgEntry: 89000,
      avgHold: 400,
      realizedPnl: { solAmount: 2865.0, usdAmount: 286500 },
    },
    {
      id: "1",
      name: "Alex Thompson",
      wallet: "Hx7...3Kj9",
      image: "/avatar.jpg",
      rank: 2,
      xFollowers: 12500,
      xTag: "@alexthompson",
      tokensTraded: 12500,
      winRate: 74.5,
      tradesCount: { buy: 4500, sell: 3800 },
      avgBuy: { solAmount: 17.2, usdAmount: 1720 },
      avgEntry: 92000,
      avgHold: 220,
      realizedPnl: { solAmount: 2458.0, usdAmount: 245800 },
    },
    {
      id: "2",
      name: "Sarah Chen",
      wallet: "Kp9...7Yt2",
      image: "/avatar.jpg",
      rank: 3,
      xFollowers: 8900,
      xTag: "@sarahchen",
      tokensTraded: 9800,
      winRate: 77.8,
      tradesCount: { buy: 3200, sell: 2900 },
      avgBuy: { solAmount: 14.2, usdAmount: 1420 },
      avgEntry: 85000,
      avgHold: 130,
      realizedPnl: { solAmount: 1986.0, usdAmount: 198600 },
    },
  ],
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Get time frame from query params, default to daily
  const timeFrame = (searchParams.get("timeFrame") ||
    "daily") as keyof typeof tradersData;
  const sortBy = searchParams.get("sortBy") || "rank";
  const sortDirection = searchParams.get("sortDirection") || "asc";

  // Get traders for the selected time frame
  const traders = [...tradersData[timeFrame]];

  // Apply sort
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

    // Special handling for realizedPnl
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
