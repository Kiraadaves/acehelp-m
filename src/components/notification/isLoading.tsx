import React from "react";

const IsLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <img
        src="/loading.png"
        alt="not-found"
        loading="lazy"
        className="w-80 h-80 rounded-lg"
      />
      <p className="text-[#B771E5] text-3xl text-center">
        Fetching cards, please wait...
      </p>
    </div>
  );
};

export default IsLoading;
