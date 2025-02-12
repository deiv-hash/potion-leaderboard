import { Trader } from "@/app/types/trader";
import Image from "next/image";

interface LeaderboardProps {
  traders: Trader[];
  loading: boolean;
}

export function Leaderboard({ traders, loading }: LeaderboardProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  return (
    <div className="w-full mt-12 bg-[#11121B] overflow-hidden">
      {/*header*/}
      <div className="bg-[#25223D] grid grid-cols-12 gap-2 px-6 py-3 ">
        <div className="text-gray-400 ">Rank</div>
        <div className="text-gray-400 col-span-2">Trader</div>
        <div className="text-gray-400 cursor-pointer">Followers</div>
        <div className="text-gray-400 cursor-pointer">Tokens</div>
        <div className="text-gray-400 cursor-pointer">Win Rate</div>
        <div className="text-gray-400 cursor-pointer">Trades</div>
        <div className="text-gray-400 cursor-pointer">Avg Buy</div>
        <div className="text-gray-400 cursor-pointer">Avg Entry</div>
        <div className="text-gray-400 cursor-pointer">Avg Hold</div>
        <div className="text-gray-400 cursor-pointer">Realized PNL</div>
        <div className="text-gray-400 cursor-pointer">Share</div>
      </div>
      {/*rows*/}
      <div className="divide-y divide-gray-800">
        {traders.map((trader) => (
          <div
            key={trader.id}
            className="grid grid-cols-12 gap-2 px-6 py-4 hover:[#1C1C28]"
          >
            <div className="flex items-center gap-2">
              <div
                className={` flex items-center justify-center font-bold ${
                  trader.rank <= 3
                    ? "bg-yellow-500 text-black  w-8 h-8 rounded-full"
                    : "bg-gray-400"
                }`}
              >
                {trader.rank}
              </div>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <Image
                alt={`${trader.name}'s profile`}
                src={trader.image}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className=" ">
                <div className="text-white">{trader.name}</div>
                <div className="text-gray-400 text-sm">{trader.wallet}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
