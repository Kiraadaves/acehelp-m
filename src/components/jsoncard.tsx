import React from "react";

export interface PostsProps {
  id: number;
  title: string;
  body: string;
}

interface JsonCardProps {
  post: PostsProps;
  openModal: (post: PostsProps) => void;
}

const JsonCard = ({ post, openModal }: JsonCardProps) => {
  return (
    <div className="animate__animated animate__slideInUp bg-white shadow-lg pb-6 flex flex-col gap-4 rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-2 text-[#B771E5]">
          {post.title.length < 30
            ? `${post.title}`
            : `${post.title.slice(0, 30)}...`}
        </h2>
        <p className="text-gray-600">
          {post.body.length < 100
            ? `${post.body}`
            : `${post.body.slice(0, 100)}...`}
        </p>
      </div>
      <div className="mt-auto">
        <button
          onClick={() => openModal(post)}
          className="bg-[#B771E5] text-white p-2 rounded-md"
        >
          Read more
        </button>
      </div>
    </div>
  );
};

export default JsonCard;
