import React from 'react'
import { Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Sk_Navbar from './skeletons/Sk_Navbar';
import { useOnlineStatus } from './utils/Network';
import NO_Internet_Loader from './pages/No_Internet';
import useTheme from './zustand/them';
const Navbar = lazy(() => import('./components/Navbar'));



function App() {
  const isOnline = useOnlineStatus();
  const {theme} = useTheme();
  

  if (!isOnline) {
    return (
      <>
        <div className={`w-screen h-screen flex justify-center items-center
           ${theme ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <NO_Internet_Loader/>
        </div>
      </>
    )
  }
  
  return (
    <>
      <Suspense fallback={<Sk_Navbar />}>
        <Navbar />
      </Suspense>
      <div
      className='w-screen h-screen overflow-auto overflow-x-hidden'
      >
        <Outlet/>
      </div>
    </>
  );
}

export default App;
