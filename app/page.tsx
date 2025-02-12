"use client";

import { useState } from "react";
import { Header } from "./components/Header";
import { TimeFrameSelector } from "./components/TimeFrameSelector";
import { TimeFrame, Trader } from "@/app/types/trader";
import { Searchbar } from "./components/Searchbar";
import { Filter } from "./components/Filter";
import { Leaderboard } from "./components/Leaderboard";
import { useTraders } from "./hooks/useTraders";

export default function Home() {
  const [filter, setFilter] = useState({
    timeFrame: "daily" as TimeFrame,
    sortBy: "rank" as keyof Trader,
    sortDirection: "asc" as "asc" | "desc",
  });

  const { traders, loading, error } = useTraders(filter);

  const setSelectedTimeFrame = (timeFrame: TimeFrame) => {
    setFilter((prev) => ({ ...prev, timeFrame }));
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-red-500 font-bold">Error</h2>
          <p className="text-gray-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main>
          <div className="flex gap-24">
            <div className="text-gray-400 flex gap-4">
              <button className="btn-tab">Traders</button>
              <button>Groups</button>
            </div>
            <div className="w-full flex justify-between">
              <TimeFrameSelector
                selectedTimeFrame={filter.timeFrame}
                onTimeFrameChange={setSelectedTimeFrame}
              />
              <div className="flex gap-4">
                <Searchbar />
                <Filter />
              </div>
            </div>
          </div>
          <Leaderboard traders={traders} loading={loading} />
        </main>
      </div>
    </div>
  );
}
