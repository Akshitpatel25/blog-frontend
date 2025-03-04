import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getAllPosts } from '../utils/getAllPosts';

const usePosts = create(
  devtools(
    persist(
      (set) => ({
        posts: null, 
        fetchPosts: async () => {
          const allPosts = await getAllPosts();
          set({ posts: allPosts }); 
        },
      }),
      { name: 'AllPosts' } // Store to local storage using this name
    )
  )
);
// Automatically called when application loads, so we get user details
usePosts.getState().fetchPosts();

export  {usePosts};
