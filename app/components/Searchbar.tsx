"use client";
import { useState } from "react";
import { RequireWallet } from "./RequireWallet";

interface SearchbarProps {
  onSearch: (value: string) => void;
}

export const Searchbar = ({ onSearch }: SearchbarProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    onSearch(value);
  };

  return (
    <RequireWallet onAction={handleSubmit}>
      <div className="relative w-full sm:w-64">
        <input
          type="text"
          placeholder="Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          className="bg-[#25223D] text-white px-4 py-2 rounded-lg pr-10 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          onClick={handleSubmit}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </RequireWallet>
  );
};
