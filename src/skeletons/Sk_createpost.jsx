import React from 'react';
import useTheme from '../zustand/them';

const SkeletonLoader = () => {
  const {theme} = useTheme();
  return (
    <div className={`w-screen h-screen pt-20 flex flex-col gap-y-2 p-4 ${theme ? 'bg-black' : 'bg-white'}`}>
        <div>
            <h1 className="h-20 w-full bg-gray-300 rounded-lg skeleton-glance"></h1>            
        </div>

        <div>
            <div
            className='h-60 w-full bg-gray-300 rounded-lg skeleton-glance'
            >

            </div>
        </div>
    </div>
  );
};

export default SkeletonLoader;
