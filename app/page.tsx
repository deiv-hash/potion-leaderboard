"use client";

import { useState } from "react";
import { Header } from "./components/Header";
import { TimeFrameSelector } from "./components/TimeFrameSelector";
import { TimeFrame } from "@/app/types/trader";
import { Searchbar } from "./components/Searchbar";
import { Filter } from "./components/Filter";
import { Leaderboard } from "./components/Leaderboard";

export default function Home() {
  const [filter, setFilter] = useState({
    timeFrame: "daily" as TimeFrame,
    sortBy: "rank",
    sortDirection: "asc" as "asc" | "desc",
  });

  const setSelectedTimeFrame = (timeFrame: TimeFrame) => {
    setFilter((prev) => ({ ...prev, timeFrame }));
  };

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
          <Leaderboard traders={traders} />
        </main>
      </div>
    </div>
  );
}
