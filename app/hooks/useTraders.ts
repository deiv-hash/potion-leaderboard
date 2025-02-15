import { useEffect, useState, useCallback } from "react";
import { Filters, Trader } from "../types/trader";

interface UseTradersProps {
  traders: Trader[];
  loading: boolean;
  error: Error | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
  } | null;
  retry: () => void;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

/**
 * Hook to fetch and manage traders data with filtering and pagination
 */
export function useTraders(filters: Filters, page: number): UseTradersProps {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] =
    useState<UseTradersProps["pagination"]>(null);
  const [retryCount, setRetryCount] = useState(0);

  /**
   * Fetches traders data with retry mechanism
   */
  const fetchTraders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        timeFrame: filters.timeFrame,
        sortBy: filters.sortBy,
        sortDirection: filters.sortDirection,
        page: page.toString(),
      });

      // Add search parameter if present
      if (filters.search) {
        queryParams.append("search", filters.search);
      }

      // Add range filters with validation
      const addRangeFilter = (
        key: string,
        range?: { min?: number; max?: number }
      ) => {
        if (range?.min !== undefined)
          queryParams.append(`${key}Min`, range.min.toString());
        if (range?.max !== undefined)
          queryParams.append(`${key}Max`, range.max.toString());
      };

      addRangeFilter("xFollowers", filters.xFollowersRange);
      addRangeFilter("tokens", filters.tokensRange);
      addRangeFilter("winRate", filters.winRateRange);
      addRangeFilter("trades", filters.tradesCountRange);
      addRangeFilter("avgBuy", filters.avgBuyRange);
      addRangeFilter("avgEntry", filters.avgEntryRange);
      addRangeFilter("avgHold", filters.avgHoldRange);
      addRangeFilter("realizedPnl", filters.realizedPnlRange);

      const response = await fetch(`/api/traders?${queryParams}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setTraders(data.traders);
      setPagination(data.pagination);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      console.error("Error fetching traders:", error);
      setError(
        error instanceof Error
          ? error
          : new Error("Failed to load traders data")
      );

      // Implement retry logic
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          fetchTraders();
        }, RETRY_DELAY * (retryCount + 1));
      }
    } finally {
      setLoading(false);
    }
  }, [filters, page, retryCount]);

  // Effect to fetch data when filters or page changes
  useEffect(() => {
    fetchTraders();
  }, [fetchTraders]);

  return {
    traders,
    loading,
    error,
    pagination,
    retry: () => {
      setRetryCount(0);
      fetchTraders();
    },
  };
}
