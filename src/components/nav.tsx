import React, { ChangeEvent } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const NavBar = ({ onSearch }: SearchBarProps) => {
  const handleSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  return (
    <div>
      <header className="flex flex-col md:flex-row gap-6 md:gap-0 md:justify-between px-8 py-8 shadow-md">
        <h1 className="text-[#B771E5] text-center md:text-left text-2xl md:text-4xl font-bold">
          Chinwe Nwankwo
        </h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            onChange={handleSearchTerm}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B771E5]"
            aria-label="Search posts"
          />
        </div>
      </header>
    </div>
  );
};

export default NavBar;
