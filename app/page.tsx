"use client";

import { useState } from "react";
import { Header } from "./components/Header";
import { TimeFrameSelector } from "./components/TimeFrameSelector";
import { TimeFrame } from "@/types/trader";
import { Searchbar } from "./components/Searchbar";

export default function Home() {
  const [filter, setFilter] = useState<TimeFrame>("daily");

  const setSelectedTimeFrame = (timeFrame: TimeFrame) => {
    setFilter(timeFrame);
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
                selectedTimeFrame={filter}
                onTimeFrameChange={setSelectedTimeFrame}
              />
              <Searchbar />
            </div>
          </div>
          <div>LIST OF TRADERS</div>
        </main>
      </div>
    </div>
  );
}
