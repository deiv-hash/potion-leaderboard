import { Trader } from "@/app/types/trader";

interface LeaderboardProps {
  traders: Trader[];
}

export function Leaderboard({ traders }: LeaderboardProps) {
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
            {trader.name}
          </div>
        ))}
      </div>
    </div>
  );
}
