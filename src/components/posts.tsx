import React, { useState } from "react";
import NavBar from "./nav";
import JsonCard from "./jsoncard";

const Posts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const onSearch = (term: string) => {
    console.log(term);
  };
  return (
    <div className="min-h-screen flex flex-col gap-8 md:gap-16">
      <NavBar onSearch={onSearch} />
      <JsonCard />
      <footer className="bg-[#B771E5] text-white text-center py-4 mt-auto">
        copyright Chinwe Nwankwo
      </footer>
    </div>
  );
};

export default Posts;
