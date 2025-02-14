import { Trader, TokenTrade } from "../types/trader";

type SortableItem = Trader | TokenTrade;
type SortableKey = keyof Trader | keyof TokenTrade;

function isTrader(item: SortableItem): item is Trader {
  return "winRate" in item && !("roi" in item);
}

function isTokenTrade(item: SortableItem): item is TokenTrade {
  return "roi" in item;
}

export function sortItems(
  items: SortableItem[],
  sortBy: SortableKey,
  sortDirection: "asc" | "desc" = "asc"
): SortableItem[] {
  return [...items].sort((a, b) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;

    // Handle special cases for nested properties
    if (sortBy === "tradesCount") {
      const aTotal = a.tradesCount.buy + a.tradesCount.sell;
      const bTotal = b.tradesCount.buy + b.tradesCount.sell;
      return (aTotal - bTotal) * multiplier;
    }

    if (sortBy === "avgBuy" || sortBy === "invested") {
      const aValue = isTrader(a) ? a.avgBuy.solAmount : a.invested.solAmount;
      const bValue = isTrader(b) ? b.avgBuy.solAmount : b.invested.solAmount;
      return (aValue - bValue) * multiplier;
    }

    if (sortBy === "realizedPnl") {
      const aValue = a.realizedPnl.solAmount;
      const bValue = b.realizedPnl.solAmount;
      return (aValue - bValue) * multiplier;
    }

    if (sortBy === "winRate") {
      const aValue = isTrader(a) ? a.winRate : a.roi;
      const bValue = isTrader(b) ? b.winRate : b.roi;
      return (aValue - bValue) * multiplier;
    }

    if (sortBy === "avgEntry") {
      const aValue = isTrader(a) ? a.avgEntry : a.marketCap;
      const bValue = isTrader(b) ? b.avgEntry : b.marketCap;
      return (aValue - bValue) * multiplier;
    }

    if (sortBy === "avgBuyMarketCap" || sortBy === "avgSellMarketCap") {
      const aValue = (a[sortBy as keyof typeof a] as number) || 0;
      const bValue = (b[sortBy as keyof typeof b] as number) || 0;
      return (aValue - bValue) * multiplier;
    }

    if (sortBy === "avgHold") {
      const aValue = isTrader(a) ? a.avgHold : a.timeHeld;
      const bValue = isTrader(b) ? b.avgHold : b.timeHeld;
      return (aValue - bValue) * multiplier;
    }

    if (sortBy === "lastTrade") {
      const aValue = a[sortBy] as number;
      const bValue = b[sortBy] as number;
      return (aValue - bValue) * multiplier;
    }

    // For simple numeric properties
    const aValue = (a[sortBy as keyof typeof a] as number) || 0;
    const bValue = (b[sortBy as keyof typeof b] as number) || 0;
    return (aValue - bValue) * multiplier;
  });
}
