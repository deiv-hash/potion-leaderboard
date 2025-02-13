"use client";
import Loading from "@/app/components/Loading";
import { TimeFrameSelector } from "@/app/components/TimeFrameSelector";
import { TimeFrame, Trader, Tab, Filters } from "@/app/types/trader";
import {
  formatNumber,
  formatHoldTime,
  shortenWalletAddress,
} from "@/app/utils/format";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RefreshIcon } from "@/app/components/icons/RefreshIcon";
import { ShareIcon } from "@/app/components/icons/ShareIcon";
import { ShareModal } from "@/app/components/ShareModal";
import { TraderStats } from "@/app/components/TraderStats";
import { TabSelector } from "@/app/components/TabSelector";
import { Searchbar } from "@/app/components/Searchbar";
import { Filter } from "@/app/components/Filter";

const getTrader = async (
  wallet: string,
  timeFrame: TimeFrame
): Promise<Trader> => {
  const response = await fetch(
    `/api/traders?search=${encodeURIComponent(wallet)}&timeFrame=${timeFrame}`
  );
  const data = await response.json();
  if (data.traders.length === 0) throw new Error("Trader not found");
  return data.traders[0];
};

export default function TraderPage() {
  const { wallet } = useParams();
  const [trader, setTrader] = useState<Trader | null>(null);
  const [loading, setLoading] = useState(true);
  const [sharingTrader, setSharingTrader] = useState<Trader | null>(null);
  const [selectedTimeFrame, setSelectedTimeFrame] =
    useState<TimeFrame>("daily");
  const [activeTab, setActiveTab] = useState<Tab>("traders");

  const [filter, setFilter] = useState<Filters>({
    timeFrame: "daily",
    sortBy: "rank",
    sortDirection: "asc",
    search: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTrader = async () => {
      setLoading(true);
      try {
        const trader = await getTrader(wallet as string, selectedTimeFrame);
        setTrader(trader);
      } catch (error) {
        console.error("Error fetching trader:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrader();
  }, [wallet, selectedTimeFrame]);

  const handleShare = (trader: Trader) => {
    setSharingTrader(trader);
  };

  const handleCloseShare = () => {
    setSharingTrader(null);
  };

  const handleTimeFrameChange = (timeFrame: TimeFrame) => {
    setSelectedTimeFrame(timeFrame);
  };

  const handleSearch = (search: string) => {
    setFilter((prev) => ({ ...prev, search }));
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilter(newFilters);
    setCurrentPage(1); // Reset to first page when filtering
  };

  if (loading) {
    return <Loading />;
  }

  if (!trader) {
    return <div>Trader not found</div>;
  }

  return (
    <>
      <div className="flex gap-12">
        {sharingTrader && (
          <ShareModal trader={sharingTrader} onClose={handleCloseShare} />
        )}
        <div className="w-4/12">
          <div className="flex items-center gap-6">
            <Image
              src={trader.image}
              alt={trader.name}
              width={100}
              height={100}
              className="rounded-full"
            />
            <div>
              <h3 className="text-white capitalize text-3xl font-bold">
                {trader.name}
              </h3>
              <p className="text-gray-400">
                {shortenWalletAddress(trader.wallet)}
              </p>
            </div>
          </div>
          <div className="stats-container mt-8 border-0 border-b-[0.5px] border-gray-400">
            <h3>X Account</h3>
            <div className="text-right text-sm">
              <p>{trader.xTag}</p>
              <p className="text-gray-400">
                {formatNumber(trader.xFollowers)} Followers
              </p>
            </div>
          </div>
          <div className="stats-container">
            <h3>Last Trade</h3>
            <div className="text-right">
              <p>{formatHoldTime(trader.lastTrade)}</p>
            </div>
          </div>
        </div>
        <div className="w-8/12">
          <div className="flex justify-between items-center w-full">
            <TimeFrameSelector
              selectedTimeFrame={selectedTimeFrame}
              onTimeFrameChange={handleTimeFrameChange}
            />
            <div className="flex gap-6">
              <button className="flex items-center gap-2">
                <span className="text-gray-400">
                  last refreshed few seconds ago
                </span>
                <RefreshIcon className="h-5 w-5 text-gray-400 hover:text-purple-300" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(trader);
                }}
              >
                <ShareIcon className="h-5 w-5 text-purple-600 hover:text-purple-300" />
              </button>
            </div>
          </div>
          <TraderStats trader={trader} />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <TabSelector
            activeTab={activeTab}
            onTabChange={setActiveTab}
            showTokens
          />
          <div className="flex gap-4">
            <Searchbar onSearch={handleSearch} />
            <Filter filters={filter} onFilterChange={handleFilterChange} />
          </div>
        </div>
        {activeTab !== "traders" && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl text-purple-500 font-bold mb-2">
                Coming Soon
              </h2>
              <p className="text-gray-400">
                {activeTab === "groups"
                  ? "Group leaderboards are under development"
                  : "Token are under development"}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
