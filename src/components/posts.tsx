import React, { useEffect, useMemo, useState } from "react";
import NavBar from "./nav";
import JsonCard from "./jsoncard";
import Pagination from "./pagination";
import axios from "axios";
import Modal from "./modal";
interface PostsProps {
  id: number;
  title: string;
  body: string;
}

const Posts = () => {
  const [cards, setCards] = useState<PostsProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostsProps | null>(null);
  const cardsPerPage = 12;

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setCards(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      });
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
  const openModal = (post: PostsProps) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };
  return (
    <div className="min-h-screen  flex flex-col gap-8 md:gap-16">
      <NavBar onSearch={onSearch} />
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-[#B771E5] text-3xl text-center">
            Fetching cards, please wait...
          </p>
        </div>
      ) : (
        <main className="mx-8">
          <h1 className="text-[#B771E5] text-center text-2xl md:text-4xl font-bold">
            View our Posts!
          </h1>
          <div className="bg-[#b771e531] p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 text-center">
            {currentCards.map((card) => (
              <JsonCard key={card.id} post={card} openModal={openModal} />
            ))}
          </div>
          <Pagination
            postsPerPage={cardsPerPage}
            totalPosts={filteredCards.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </main>
      )}
      {isModalOpen && selectedPost && (
        <Modal
          onClose={closeModal}
          id={selectedPost.id}
          title={selectedPost.title}
          body={selectedPost.body}
        />
      )}
      <footer className="bg-[#B771E5] text-white text-center py-4 mt-auto">
        copyright Chinwe Nwankwo
      </footer>
    </div>
  );
};

export default Posts;
