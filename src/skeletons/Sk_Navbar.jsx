import React from 'react';
import useTheme from '../zustand/them';

const SkeletonLoader = () => {
  const {theme} = useTheme();
  return (
    <div className={`w-full h-20 flex items-center justify-between p-4 ${theme ? 'bg-black' : 'bg-white'}`}>
        <div>
            <h1 className="h-6 w-20 bg-gray-300 rounded-lg skeleton-glance"></h1>            
        </div>

        <div>
            <div
            className='h-6 w-40 bg-gray-300 rounded-lg skeleton-glance'
            >

            </div>
        </div>
    </div>
  );
};

export default SkeletonLoader;
