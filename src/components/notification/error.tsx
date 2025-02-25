import React from "react";

interface ErrorProps {
  error: string;
}

const Error = ({ error }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <img
        src="/error.png"
        alt="not-found"
        loading="lazy"
        className="w-80 h-80 rounded-lg"
      />
      <p className="text-[#B771E5] text-3xl text-center">{error}</p>
    </div>
  );
};

export default Error;
