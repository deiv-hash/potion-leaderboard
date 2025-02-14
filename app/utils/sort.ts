import { Trader, TokenTrade, FilterRange, Filters } from "../types/trader";

type SortableItem = Trader | TokenTrade;
type SortableKey = keyof Trader | keyof TokenTrade;

function isTrader(item: SortableItem): item is Trader {
  return "winRate" in item && !("roi" in item);
}

export function applyRangeFilter(
  value: number | undefined,
  range: FilterRange | undefined
): boolean {
  if (!range || !value) return true;
  const { min, max } = range;
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
}

export function filterTraders(
  traders: Trader[],
  searchTerm: string,
  filters: Filters
): Trader[] {
  return traders.filter((trader) => {
    // Search term filter
    if (
      searchTerm &&
      !trader.wallet.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !trader.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Range filters
    if (!applyRangeFilter(trader.xFollowers, filters.xFollowersRange))
      return false;
    if (!applyRangeFilter(trader.tokensTraded, filters.tokensRange))
      return false;
    if (!applyRangeFilter(trader.winRate, filters.winRateRange)) return false;
    if (
      !applyRangeFilter(
        trader.tradesCount.buy + trader.tradesCount.sell,
        filters.tradesCountRange
      )
    )
      return false;
    if (!applyRangeFilter(trader.avgBuy.solAmount, filters.avgBuyRange))
      return false;
    if (!applyRangeFilter(trader.avgEntry, filters.avgEntryRange)) return false;
    if (!applyRangeFilter(trader.avgHold, filters.avgHoldRange)) return false;
    if (
      !applyRangeFilter(trader.realizedPnl.solAmount, filters.realizedPnlRange)
    )
      return false;

    return true;
  });
}

export function filterTokenTrades(
  tokenTrades: TokenTrade[],
  searchTerm: string,
  filters: Filters
): TokenTrade[] {
  return tokenTrades.filter((trade) => {
    // Search term filter
    if (
      searchTerm &&
      !trade.tokenName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Range filters
    if (!applyRangeFilter(trade.roi, filters.winRateRange)) return false; // Using winRateRange for ROI
    if (
      !applyRangeFilter(
        trade.tradesCount.buy + trade.tradesCount.sell,
        filters.tradesCountRange
      )
    )
      return false;
    if (!applyRangeFilter(trade.invested.solAmount, filters.avgBuyRange))
      return false; // Using avgBuyRange for invested amount
    if (
      !applyRangeFilter(trade.realizedPnl.solAmount, filters.realizedPnlRange)
    )
      return false;

    return true;
  });
}

export function sortItems(
  items: SortableItem[],
  sortBy: SortableKey,
  sortDirection: "asc" | "desc" = "asc"
): SortableItem[] {
  return [...items].sort((a, b) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;

    // Handle nested properties like tradesCount
    if (sortBy === "tradesCount") {
      const aTotal = a.tradesCount.buy + a.tradesCount.sell;
      const bTotal = b.tradesCount.buy + b.tradesCount.sell;
      return (aTotal - bTotal) * multiplier;
    }

    // Handle properties with different names between Trader/TokenTrade
    if (sortBy === "avgBuy" || sortBy === "invested") {
      const aValue = isTrader(a) ? a.avgBuy.solAmount : a.invested.solAmount;
      const bValue = isTrader(b) ? b.avgBuy.solAmount : b.invested.solAmount;
      return (aValue - bValue) * multiplier;
    }

    // Handle numeric properties with nested structure
    if (sortBy === "realizedPnl") {
      const aValue = a.realizedPnl.solAmount;
      const bValue = b.realizedPnl.solAmount;
      return (aValue - bValue) * multiplier;
    }

    // Handle properties that map between winRate and ROI
    if (sortBy === "winRate") {
      const aValue = isTrader(a) ? a.winRate : a.roi;
      const bValue = isTrader(b) ? b.winRate : b.roi;
      return (aValue - bValue) * multiplier;
    }

    // Handle properties that map between avgEntry and marketCap
    if (sortBy === "avgEntry") {
      const aValue = isTrader(a) ? a.avgEntry : a.marketCap;
      const bValue = isTrader(b) ? b.avgEntry : b.marketCap;
      return (aValue - bValue) * multiplier;
    }

    // Handle optional market cap properties
    if (sortBy === "avgBuyMarketCap" || sortBy === "avgSellMarketCap") {
      const aValue = (a[sortBy as keyof typeof a] as number) || 0;
      const bValue = (b[sortBy as keyof typeof b] as number) || 0;
      return (aValue - bValue) * multiplier;
    }

    // Handle properties that map between avgHold and timeHeld
    if (sortBy === "avgHold") {
      const aValue = isTrader(a) ? a.avgHold : a.timeHeld;
      const bValue = isTrader(b) ? b.avgHold : b.timeHeld;
      return (aValue - bValue) * multiplier;
    }

    // Handle simple numeric properties
    const aValue = (a[sortBy as keyof typeof a] as number) || 0;
    const bValue = (b[sortBy as keyof typeof b] as number) || 0;
    return (aValue - bValue) * multiplier;
  });
}
