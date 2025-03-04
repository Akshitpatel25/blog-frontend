import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import getUser from '../utils/getUser';

const useUser = create(
  devtools(
    persist(
      (set) => ({
        user: null, 
        fetchUser: async () => {
          const userID = await getUser();
          set({ user: userID }); 
        },
      }),
      { name: 'userDetails' } // Store to local storage using this name
    )
  )
);
// Automatically called when application loads, so we get user details
useUser.getState().fetchUser();

export default useUser;
