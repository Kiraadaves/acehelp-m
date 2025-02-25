import React, { ChangeEvent, useState } from "react";
import "animate.css";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const NavBar = ({ onSearch }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  return (
    <div>
      <header className="flex flex-col md:flex-row gap-6 md:gap-0 md:justify-between px-8 py-6 shadow-md">
        <h1 className="text-[#B771E5] animate__animated animate__slideInLeft text-center md:text-left text-2xl md:text-4xl font-bold">
          Chinwe Nwankwo
        </h1>
        <div className="">
          <input
            type="text"
            placeholder="Search cards..."
            onChange={handleSearchTerm}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full md:w-80 lg:w-96 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B771E5] transition-all duration-300 ${
              isFocused ? "md:w-96 lg:w-[28rem]" : ""
            }`}
            aria-label="Search cards"
          />
        </div>
      </header>
    </div>
  );
};

export default NavBar;
