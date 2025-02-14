// API route for fetching trader data with filtering, sorting, and pagination
import { NextResponse } from "next/server";
import { Trader } from "@/app/types/trader";
import { sortItems } from "@/app/utils/sort";
import { tradersData } from "@/app/data/mockTraders";

export async function GET(request: Request) {
  // Extract query parameters
  const { searchParams } = new URL(request.url);

  // Get base parameters with defaults
  const timeFrame = (searchParams.get("timeFrame") ||
    "daily") as keyof typeof tradersData;
  const sortBy = searchParams.get("sortBy") || "rank";
  const sortDirection = searchParams.get("sortDirection") || "asc";
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = 5;

  // Clone traders data for the selected time frame
  let traders = [...tradersData[timeFrame]];

  // Apply text search filter
  const search = searchParams.get("search")?.toLocaleLowerCase();
  if (search) {
    traders = traders.filter(
      (trader) =>
        trader.name.toLocaleLowerCase().includes(search) ||
        trader.wallet.toLocaleLowerCase().includes(search)
    );
  }

  // Helper function for range filtering
  const applyRangeFilter = (value: number, min?: string, max?: string) => {
    if (min && value < Number(min)) return false;
    if (max && value > Number(max)) return false;
    return true;
  };

  // Followers range
  const xFollowersMin = searchParams.get("xFollowersMin") || undefined;
  const xFollowersMax = searchParams.get("xFollowersMax") || undefined;
  if (xFollowersMin || xFollowersMax) {
    traders = traders.filter((trader) =>
      applyRangeFilter(trader.xFollowers, xFollowersMin, xFollowersMax)
    );
  }

  // Tokens range
  const tokensMin = searchParams.get("tokensMin") || undefined;
  const tokensMax = searchParams.get("tokensMax") || undefined;
  if (tokensMin || tokensMax) {
    traders = traders.filter((trader) =>
      applyRangeFilter(trader.tokensTraded, tokensMin, tokensMax)
    );
  }

  // Win rate range
  const winRateMin = searchParams.get("winRateMin") || undefined;
  const winRateMax = searchParams.get("winRateMax") || undefined;
  if (winRateMin || winRateMax) {
    traders = traders.filter((trader) =>
      applyRangeFilter(trader.winRate, winRateMin, winRateMax)
    );
  }

  // Trades count range
  const tradesMin = searchParams.get("tradesMin") || undefined;
  const tradesMax = searchParams.get("tradesMax") || undefined;
  if (tradesMin || tradesMax) {
    traders = traders.filter((trader) =>
      applyRangeFilter(
        trader.tradesCount.buy + trader.tradesCount.sell,
        tradesMin,
        tradesMax
      )
    );
  }

  // Average buy range
  const avgBuyMin = searchParams.get("avgBuyMin") || undefined;
  const avgBuyMax = searchParams.get("avgBuyMax") || undefined;
  if (avgBuyMin || avgBuyMax) {
    traders = traders.filter((trader) =>
      applyRangeFilter(trader.avgBuy.solAmount, avgBuyMin, avgBuyMax)
    );
  }

  // Average entry range
  const avgEntryMin = searchParams.get("avgEntryMin") || undefined;
  const avgEntryMax = searchParams.get("avgEntryMax") || undefined;
  if (avgEntryMin || avgEntryMax) {
    traders = traders.filter((trader) =>
      applyRangeFilter(trader.avgEntry, avgEntryMin, avgEntryMax)
    );
  }

  // Average hold range
  const avgHoldMin = searchParams.get("avgHoldMin") || undefined;
  const avgHoldMax = searchParams.get("avgHoldMax") || undefined;
  if (avgHoldMin || avgHoldMax) {
    traders = traders.filter((trader) =>
      applyRangeFilter(trader.avgHold, avgHoldMin, avgHoldMax)
    );
  }

  // Realized PnL range
  const realizedPnlMin = searchParams.get("realizedPnlMin") || undefined;
  const realizedPnlMax = searchParams.get("realizedPnlMax") || undefined;
  if (realizedPnlMin || realizedPnlMax) {
    traders = traders.filter((trader) =>
      applyRangeFilter(
        trader.realizedPnl.solAmount,
        realizedPnlMin,
        realizedPnlMax
      )
    );
  }

  // Sort filtered results
  traders = sortItems(
    traders,
    sortBy as keyof Trader,
    sortDirection as "asc" | "desc"
  ) as Trader[];

  // Apply pagination
  const totalItems = traders.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedTraders = traders.slice(start, end);

  // Return paginated results with metadata
  return NextResponse.json({
    traders: paginatedTraders,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      pageSize,
    },
  });
}
