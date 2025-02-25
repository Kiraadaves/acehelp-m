import React, { useState } from "react";
import NavBar from "./nav";
import JsonCard from "./jsoncard";
import Pagination from "./pagination";

const Posts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const onSearch = (term: string) => {
    console.log(term);
  };
  return (
    <div className="min-h-screen flex flex-col gap-8 md:gap-16">
      <NavBar onSearch={onSearch} />
      <main className="flex-grow space-y-4">
        <h1 className="text-[#B771E5] text-center text-2xl md:text-4xl font-bold">
          View our Posts!
        </h1>
        <div className="bg-[#b771e52f] px-8 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
          JsonCard <Pagination />
        </div>
      </main>
      <footer className="bg-[#B771E5] text-white text-center py-4 mt-auto">
        copyright Chinwe Nwankwo
      </footer>
    </div>
  );
};

export default Posts;
