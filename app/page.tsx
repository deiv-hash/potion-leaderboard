"use client";

import { useState } from "react";
import { Header } from "./components/Header";
import { TimeFrameSelector } from "./components/TimeFrameSelector";
import { TimeFrame, Trader, Filters } from "@/app/types/trader";
import { Searchbar } from "./components/Searchbar";
import { Filter } from "./components/Filter";
import { Leaderboard } from "./components/Leaderboard";
import { useTraders } from "./hooks/useTraders";

type Tab = "traders" | "groups";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("traders");
  const [filter, setFilter] = useState<Filters>({
    timeFrame: "daily",
    sortBy: "rank",
    sortDirection: "asc",
    search: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { traders, loading, error, pagination } = useTraders(
    filter,
    currentPage
  );

  const setSelectedTimeFrame = (timeFrame: TimeFrame) => {
    setFilter((prev) => ({ ...prev, timeFrame }));
    setCurrentPage(1); // Reset to first page when changing timeframe
  };

  const handleSort = (sortBy: keyof Trader) => {
    setFilter((prev) => ({
      ...prev,
      sortBy,
      sortDirection: prev.sortDirection === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handleSearch = (search: string) => {
    setFilter((prev) => ({ ...prev, search }));
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilter(newFilters);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
                  <Filter
                    filters={filter}
                    onFilterChange={handleFilterChange}
                  />
                </div>
              </div>
            )}
          </div>
          {activeTab === "traders" ? (
            <Leaderboard
              traders={traders}
              loading={loading}
              onSort={handleSort}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={pagination?.totalPages || 1}
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
