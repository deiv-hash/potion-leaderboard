"use client";

import { useState } from "react";
import { Header } from "./components/Header";
import { TimeFrameSelector } from "./components/TimeFrameSelector";
import { TimeFrame, Trader } from "@/app/types/trader";
import { Searchbar } from "./components/Searchbar";
import { Filter } from "./components/Filter";
import { Leaderboard } from "./components/Leaderboard";
import { useTraders } from "./hooks/useTraders";

type Tab = "traders" | "groups";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("traders");
  const [filter, setFilter] = useState({
    timeFrame: "daily" as TimeFrame,
    sortBy: "rank" as keyof Trader,
    sortDirection: "asc" as "asc" | "desc",
  });

  const { traders, loading, error } = useTraders(filter);

  const setSelectedTimeFrame = (timeFrame: TimeFrame) => {
    setFilter((prev) => ({ ...prev, timeFrame }));
  };

  const handleSort = (sortBy: keyof Trader) => {
    setFilter((prev) => ({
      ...prev,
      sortBy,
      sortDirection: prev.sortDirection === "asc" ? "desc" : "asc",
    }));
  };

  const handleSearch = (search: string) => {
    setFilter((prev) => ({ ...prev, search }));
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
              <button
                className={
                  activeTab === "traders" ? "btn-tab" : "hover:text-white"
                }
                onClick={() => setActiveTab("traders")}
              >
                Traders
              </button>
              <button
                className={
                  activeTab === "groups" ? "btn-tab" : "hover:text-white"
                }
                onClick={() => setActiveTab("groups")}
              >
                Groups
              </button>
            </div>
            {activeTab === "traders" && (
              <div className="w-full flex justify-between">
                <TimeFrameSelector
                  selectedTimeFrame={filter.timeFrame}
                  onTimeFrameChange={setSelectedTimeFrame}
                />
                <div className="flex gap-4">
                  <Searchbar onSearch={handleSearch} />
                  <Filter />
                </div>
              </div>
            )}
          </div>
          {activeTab === "traders" ? (
            <Leaderboard
              traders={traders}
              loading={loading}
              onSort={handleSort}
            />
          ) : (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <h2 className="text-2xl text-purple-500 font-bold mb-2">
                  Coming Soon
                </h2>
                <p className="text-gray-400">
                  Group leaderboards are under development
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
