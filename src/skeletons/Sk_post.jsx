import React from "react";
import useTheme from "../zustand/them";

const Sk_post = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`w-screen h-screen pt-20 flex flex-col gap-y-6 p-4 ${
        theme ? "bg-black" : "bg-white"
      }`}
    >
      <div className="h-60 w-full bg-gray-300 rounded-lg skeleton-glance"></div>

    </div>
  );
};

export default Sk_post;
