import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const useTheme = create(
  devtools(
    persist(
      (set) => ({
        theme: false,
        toggleTheme: () => set((state) => ({ theme: !state.theme })) // Fixed function name
      }),
      { name: 'theme' } // Store to local storage using this name
    )
  )
)

export default useTheme
