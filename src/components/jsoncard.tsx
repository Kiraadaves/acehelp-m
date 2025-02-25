import React from "react";
import Pagination from "./pagination";

interface Card {
  id: number;
  title: string;
  body: string;
}

interface JsonCardProps {
  post: Card;
}

const JsonCard = ({ post }: JsonCardProps) => {
  return (
    <main className="flex-grow space-y-4">
      <h1 className="text-[#B771E5] text-center text-2xl md:text-4xl font-bold">
        View our Posts!
      </h1>
      <div className="bg-[#b771e52f] px-8 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
        JsonCard <Pagination />
      </div>
    </main>
  );
};

export default JsonCard;
