import { useEffect, useState } from "react";
import { Filters, Trader } from "../types/trader";

interface UseTradersProps {
  traders: Trader[];
  loading: boolean;
  error: Error | null;
}

export function useTraders(filters: Filters): UseTradersProps {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTraders = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          timeFrame: filters.timeFrame,
          sortBy: filters.sortBy,
          sortDirection: filters.sortDirection,
        });

        if (filters.search) {
          queryParams.append("search", filters.search);
        }

        // Add range filters
        if (filters.xFollowersRange?.min)
          queryParams.append(
            "xFollowersMin",
            filters.xFollowersRange.min.toString()
          );
        if (filters.xFollowersRange?.max)
          queryParams.append(
            "xFollowersMax",
            filters.xFollowersRange.max.toString()
          );

        if (filters.tokensRange?.min)
          queryParams.append("tokensMin", filters.tokensRange.min.toString());
        if (filters.tokensRange?.max)
          queryParams.append("tokensMax", filters.tokensRange.max.toString());

        if (filters.winRateRange?.min)
          queryParams.append("winRateMin", filters.winRateRange.min.toString());
        if (filters.winRateRange?.max)
          queryParams.append("winRateMax", filters.winRateRange.max.toString());

        if (filters.tradesCountRange?.min)
          queryParams.append(
            "tradesMin",
            filters.tradesCountRange.min.toString()
          );
        if (filters.tradesCountRange?.max)
          queryParams.append(
            "tradesMax",
            filters.tradesCountRange.max.toString()
          );

        if (filters.avgBuyRange?.min)
          queryParams.append("avgBuyMin", filters.avgBuyRange.min.toString());
        if (filters.avgBuyRange?.max)
          queryParams.append("avgBuyMax", filters.avgBuyRange.max.toString());

        if (filters.avgEntryRange?.min)
          queryParams.append(
            "avgEntryMin",
            filters.avgEntryRange.min.toString()
          );
        if (filters.avgEntryRange?.max)
          queryParams.append(
            "avgEntryMax",
            filters.avgEntryRange.max.toString()
          );

        if (filters.avgHoldRange?.min)
          queryParams.append("avgHoldMin", filters.avgHoldRange.min.toString());
        if (filters.avgHoldRange?.max)
          queryParams.append("avgHoldMax", filters.avgHoldRange.max.toString());

        if (filters.realizedPnlRange?.min)
          queryParams.append(
            "realizedPnlMin",
            filters.realizedPnlRange.min.toString()
          );
        if (filters.realizedPnlRange?.max)
          queryParams.append(
            "realizedPnlMax",
            filters.realizedPnlRange.max.toString()
          );

        const response = await fetch(`/api/traders?${queryParams}`);
        const data = await response.json();
        setTraders(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchTraders();
  }, [filters]);

  return { traders, loading, error };
}
