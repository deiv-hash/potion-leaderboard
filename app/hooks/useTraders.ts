import { useEffect, useState } from "react";
import { Filters, Trader } from "../types/trader";

/* interface UseTradersProps {
  traders: Trader[];
  loading: boolean;
  error: Error | null;
} */

export function useTraders(filters: Filters) {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTraders = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          sortBy: filters.sortBy,
          sortDirection: filters.sortDirection,
        });
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
