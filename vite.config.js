import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: import.meta.env.VITE_BASENAME || "/",  // ✅ Use import.meta.env
  plugins: [react(), tailwindcss()],
})
