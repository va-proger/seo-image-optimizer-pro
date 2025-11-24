import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,  // -5% размер, no debug noise
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',  // JS, not JSX
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    minify: 'esbuild'  // Fast minify
  },
  base: './'  // Relative для Pages (custom domain ok)
})