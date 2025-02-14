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
      <div className="flex items-center w-48 sm:w-64 bg-[#25223D] rounded-full">
        <button
          onClick={handleSubmit}
          className=" text-gray-400 hover:text-white px-2 py-2"
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
          className="bg-[#25223D] text-white px-4 py-2 rounded-r-full pr-4 w-full focus:outline-none "
        />
      </div>
    </RequireWallet>
  );
};
