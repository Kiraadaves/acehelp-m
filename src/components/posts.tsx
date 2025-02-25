import { useEffect, useMemo, useState } from "react";
import NavBar from "./nav";
import JsonCard from "./jsoncard";
import Pagination from "./pagination";
import axios from "axios";
import Modal from "./modal";
import debounce from "lodash.debounce";
import Error from "./notification/error";
import IsLoading from "./notification/isLoading";
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
  const [error, setError] = useState<string | null>(null);
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
        setError("Network error. Please reload and try again.");
      });
  }, []);

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

  const onSearch = debounce((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, 200);
  const openModal = (post: PostsProps) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };
  return (
    <div className="min-h-screen  flex flex-col gap-8 md:gap-12">
      <NavBar onSearch={onSearch} />
      {isLoading && <IsLoading />}{" "}
      {!isLoading && !error && (
        <main className="mx-8">
          <h1 className="animate__animated animate__fadeInRight text-[#B771E5] text-center text-2xl md:text-4xl font-bold">
            View Cards!
          </h1>
          <div
            className={`bg-[#b771e531] p-4 grid gap-6 mt-8 text-center ${
              filteredCards.length === 0 && searchTerm !== ""
                ? "grid-cols-1"
                : "grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {currentCards.map((card) => (
              <JsonCard key={card.id} post={card} openModal={openModal} />
            ))}
            {filteredCards.length === 0 && searchTerm !== "" && (
              <div className="flex flex-col justify-center items-center p-4">
                <img
                  src="/notfound.png"
                  alt="not-found"
                  loading="lazy"
                  className="w-80 h-80 rounded-lg"
                />
                <p className="text-center text-[#B771E5] font-bold mt-8">
                  No cards found matching "{searchTerm}"
                </p>
              </div>
            )}
          </div>
          <Pagination
            postsPerPage={cardsPerPage}
            totalPosts={filteredCards.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </main>
      )}
      {!isLoading && error && <Error error={error} />}
      {isModalOpen && selectedPost && (
        <Modal
          onClose={closeModal}
          id={selectedPost.id}
          title={selectedPost.title}
          body={selectedPost.body}
          modalOpen={isModalOpen}
        />
      )}
      <footer className="bg-[#B771E5] space-y-2 text-white text-center py-4 mt-auto">
        <p>&copy; {new Date().getFullYear()} Chinwe Nwankwo </p>
        <div className="flex justify-center gap-6">
          <a href="https://github.com/Kiraadaves">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-github"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a href="https://x.com/CKiraadaves">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-twitter"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/chinwe-chukwuogor-400404118/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-linkedin"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Posts;
