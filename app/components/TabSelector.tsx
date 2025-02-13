import { Tab } from "@/app/types/trader";

interface TabSelectorProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  showTokens?: boolean;
}

export function TabSelector({
  activeTab,
  onTabChange,
  showTokens = false,
}: TabSelectorProps) {
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
      {showTokens && (
        <button
          className={activeTab === "tokens" ? "btn-tab" : "hover:text-white"}
          onClick={() => onTabChange("tokens")}
        >
          Tokens
        </button>
      )}
    </div>
  );
}
