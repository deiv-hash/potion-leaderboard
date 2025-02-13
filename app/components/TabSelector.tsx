import { MainTab, TraderTab } from "@/app/types/trader";

interface TabSelectorProps {
  activeTab: MainTab | TraderTab;
  onTabChange: (tab: MainTab | TraderTab) => void;
  variant: "main" | "trader";
}

export function TabSelector({
  activeTab,
  onTabChange,
  variant,
}: TabSelectorProps) {
  if (variant === "main") {
    return (
      <div className="text-gray-400 flex gap-4">
        <button
          className={activeTab === "traders" ? "btn-tab" : "hover:text-white"}
          onClick={() => onTabChange("traders")}
        >
          Traders
        </button>
        <button
          className={activeTab === "groups" ? "btn-tab" : "hover:text-white"}
          onClick={() => onTabChange("groups")}
        >
          Groups
        </button>
      </div>
    );
  }

  return (
    <div className="text-gray-400 flex gap-4">
      <button
        className={activeTab === "trades" ? "btn-tab" : "hover:text-white"}
        onClick={() => onTabChange("trades")}
      >
        Trades
      </button>
      <button
        className={activeTab === "tokens" ? "btn-tab" : "hover:text-white"}
        onClick={() => onTabChange("tokens")}
      >
        Tokens
      </button>
      <button
        className={activeTab === "group" ? "btn-tab" : "hover:text-white"}
        onClick={() => onTabChange("group")}
      >
        Group
      </button>
    </div>
  );
}
