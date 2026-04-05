import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages deployment, update the base URL to your repository name:
// base: '/assignment-cover-page-generator/',

export default defineConfig({
  plugins: [react()],
  base: '/',  // Change this to your GitHub Pages URL path if needed
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
  },
})
