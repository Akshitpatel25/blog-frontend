import React from 'react';
import useTheme from '../zustand/them';

const SkeletonLoader = () => {
  const {theme} = useTheme();
  return (
    <div className={`w-full h-screen flex flex-col items-center justify-center gap-5 ${theme ? 'bg-black ' : 'bg-white '}`}>
      {/* Title Skeleton */}
      <div className={`w-40 h-10 rounded-lg skeleton-glance`}></div>

      {/* Text Skeleton */}
      <div className={`w-40 h-10 rounded-lg skeleton-glance`}></div>
      <div className={`w-40 h-10 rounded-lg skeleton-glance`}></div>
      <div className={`w-40 h-10 rounded-lg skeleton-glance`}></div>
    </div>
  );
};

export default SkeletonLoader;
