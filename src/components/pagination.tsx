import { KeyboardEvent } from "react";

interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    number: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      paginate(number);
    } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const buttons = Array.from(
        event.currentTarget.parentElement?.parentElement?.querySelectorAll(
          "button"
        ) || []
      );
      const currentIndex = buttons.indexOf(event.currentTarget);
      let nextIndex;

      if (event.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % buttons.length;
      } else {
        nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
      }
      (buttons[nextIndex] as HTMLButtonElement).focus();
    }
  };

  return (
    <nav className="mt-8">
      <ul className="flex flex-wrap justify-center gap-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              onKeyDown={(e) => handleKeyDown(e, number)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === number
                  ? "bg-[#B771E5] text-white"
                  : "bg-[#b771e531] text-gray-700 hover:bg-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#B771E5]`}
              aria-label={`Go to page ${number}`}
              aria-current={currentPage === number ? "page" : undefined}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
