"use client";
import { useState } from "react";
import { FilterIcon } from "./icons/FilterIcon";
import { FilterRange, Filters } from "../types/trader";
import { RequireWallet } from "./RequireWallet";

interface FilterProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

interface RangeFilterProps {
  label: string;
  range: FilterRange | undefined;
  onChange: (range: FilterRange) => void;
}

function RangeFilter({ label, range, onChange }: RangeFilterProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-400 mb-2">{label}</label>
      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Min"
          value={range?.min || ""}
          onChange={(e) =>
            onChange({
              ...range,
              min: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="w-full bg-[#1C1C28] border border-purple-200 rounded-lg px-3 py-2"
        />
        <input
          type="number"
          placeholder="Max"
          value={range?.max || ""}
          onChange={(e) =>
            onChange({
              ...range,
              max: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="w-full bg-[#1C1C28] border border-purple-200 rounded-lg px-3 py-2"
        />
      </div>
    </div>
  );
}

export function Filter({ filters, onFilterChange }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof Filters, value: FilterRange) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  // Count active filters
  const activeFiltersCount = [
    filters.xFollowersRange,
    filters.tokensRange,
    filters.winRateRange,
    filters.tradesCountRange,
    filters.avgBuyRange,
    filters.avgEntryRange,
    filters.avgHoldRange,
    filters.realizedPnlRange,
  ].filter(
    (range) => range && (range.min !== undefined || range.max !== undefined)
  ).length;

  return (
    <>
      <RequireWallet onAction={() => setIsOpen(true)}>
        <button className="btn-tab flex items-center gap-2 relative">
          <FilterIcon className="h-5 w-5" />
          {activeFiltersCount > 0 && (
            <div className="absolute -bottom-2 -right-[-5px] bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </div>
          )}
        </button>
      </RequireWallet>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-[#11121B] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Filters</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-100px)]">
            <RangeFilter
              label="ROI (%)"
              range={filters.winRateRange}
              onChange={(range) => updateFilter("winRateRange", range)}
            />
            <RangeFilter
              label="Total Trades"
              range={filters.tradesCountRange}
              onChange={(range) => updateFilter("tradesCountRange", range)}
            />
            <RangeFilter
              label="Invested (SOL)"
              range={filters.avgBuyRange}
              onChange={(range) => updateFilter("avgBuyRange", range)}
            />
            <RangeFilter
              label="Realized PnL (SOL)"
              range={filters.realizedPnlRange}
              onChange={(range) => updateFilter("realizedPnlRange", range)}
            />

            <div className="mt-6 flex gap-4">
              <RequireWallet
                onAction={() => {
                  onFilterChange({
                    ...filters,
                    winRateRange: undefined,
                    tradesCountRange: undefined,
                    avgBuyRange: undefined,
                    realizedPnlRange: undefined,
                  });
                }}
              >
                <button className="w-full py-2 px-4 border border-purple-200 text-purple-200 rounded-lg hover:bg-purple-200 hover:text-black transition-colors">
                  Reset
                </button>
              </RequireWallet>
              <RequireWallet onAction={() => setIsOpen(false)}>
                <button className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Apply
                </button>
              </RequireWallet>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
