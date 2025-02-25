import React, { useEffect, useMemo, useState } from "react";
import NavBar from "./nav";
import JsonCard from "./jsoncard";
import Pagination from "./pagination";
import axios from "axios";
interface PostsProps {
  id: number;
  title: string;
  body: string;
}

const Posts = () => {
  const [cards, setCards] = useState<PostsProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setCards(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  });

  const filteredCards = useMemo(() => {
    return cards.filter(
      (card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cards, searchTerm]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const onSearch = (term: string) => {
    //console.log(term);
    setSearchTerm(term);
    setCurrentPage(1);
  };
  return (
    <div className="min-h-screen  flex flex-col gap-8 md:gap-16">
      <NavBar onSearch={onSearch} />
      <main className="mx-8">
        <h1 className="text-[#B771E5] text-center text-2xl md:text-4xl font-bold">
          View our Posts!
        </h1>
        <div className="bg-[#b771e531] p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 text-center">
          {currentCards.map((card) => (
            <JsonCard key={card.id} post={card} />
          ))}
        </div>
        <Pagination
          postsPerPage={cardsPerPage}
          totalPosts={filteredCards.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>

      <footer className="bg-[#B771E5] text-white text-center py-4 mt-auto">
        copyright Chinwe Nwankwo
      </footer>
    </div>
  );
};

export default Posts;
