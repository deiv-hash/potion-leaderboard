import { SearchIcon } from "./icons/SearchIcon";

export function Searchbar() {
  return (
    <form className="w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          placeholder="Search by name or wallet"
          className="w-full pl-10 pr-4 py-2 bg-transparent border border-purple-200 rounded-full"
        />
      </div>
    </form>
  );
}
