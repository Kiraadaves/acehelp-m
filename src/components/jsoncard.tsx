import React from "react";

export interface PostsProps {
  id: number;
  title: string;
  body: string;
}

interface JsonCardProps {
  post: PostsProps;
}

const JsonCard = ({ post }: JsonCardProps) => {
  return (
    <div className="bg-white shadow-lg  rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          {post.title.length < 30
            ? `${post.title}`
            : `${post.title.slice(0, 30)}...`}
        </h2>
        <p className="text-gray-600">
          {post.body.length < 150
            ? `${post.body}`
            : `${post.body.slice(0, 150)}...`}
        </p>
        <div>
          <button className="bg-[#B771E5] text-white p-2 rounded-md">Read more</button>
        </div>
      </div>
    </div>
  );
};

export default JsonCard;
