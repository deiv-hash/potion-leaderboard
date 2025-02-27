"use client";

import { useState } from "react";
import { TimeFrameSelector } from "./components/TimeFrameSelector";
import { TimeFrame, Trader, Filters, MainTab } from "@/app/types/trader";
import { Searchbar } from "./components/Searchbar";
import { Filter } from "./components/Filter";
import { Leaderboard } from "./components/Leaderboard";
import { useTraders } from "./hooks/useTraders";
import { TabSelector } from "./components/TabSelector";

export default function Home() {
  const [activeTab, setActiveTab] = useState<MainTab>("traders");
  const [filter, setFilter] = useState<Filters>({
    timeFrame: "daily",
    sortBy: "rank",
    sortDirection: "asc",
    search: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { traders, loading, error, pagination, retry } = useTraders(
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
          <h2 className="text-2xl text-red-500 font-bold mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-400 mb-4">{error.message}</p>
          <button
            onClick={retry}
            className="bg-[#AA00FF] text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-12">
      <main className="px-4 sm:px-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-24 lg:items-center">
            <TabSelector
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab as MainTab)}
              variant="main"
            />
            {activeTab === "traders" && (
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between w-full">
                <TimeFrameSelector
                  selectedTimeFrame={filter.timeFrame}
                  onTimeFrameChange={setSelectedTimeFrame}
                />
                <div className="flex items-center gap-4">
                  <Searchbar onSearch={handleSearch} />
                  <Filter
                    filters={filter}
                    onFilterChange={handleFilterChange}
                    viewType="traders"
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
              viewType="traders"
            />
          ) : (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <h2 className="text-2xl text-purple-500 font-bold mb-2">
                  Coming Soon
                </h2>
                <p className="text-gray-400">
                  {activeTab === "groups"
                    ? "Group leaderboards are under development"
                    : "Token leaderboards are under development"}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
