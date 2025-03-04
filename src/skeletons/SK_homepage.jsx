import React from "react";
import useTheme from "../zustand/them";

const Structure = () => { 
  return (
    <div className="flex flex-col gap-y-1 ">
      <div className="h-6 w-20 bg-gray-300 rounded-lg skeleton-glance"></div>
      <div className="h-6 w-40 bg-gray-300 rounded-lg skeleton-glance"></div>
      <div className="h-6 w-full bg-gray-300 rounded-lg skeleton-glance"></div>
      <div className="h-6 w-full bg-gray-300 rounded-lg skeleton-glance"></div>
    </div>
  );
};

const Skeleton_home = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`w-full pt-20 flex flex-col gap-y-6 p-4 ${
        theme ? "bg-black" : "bg-white"
      }`}
    >
      <Structure />  
      <Structure />  
      <Structure />  
      <Structure />  
      <Structure />  
      <Structure />  
      <Structure />  
    </div>
  );
};

export default Skeleton_home;
