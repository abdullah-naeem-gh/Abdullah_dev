import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          ogl: ['ogl'],
          icons: ['lucide-react']
        }
      }
    },
    target: 'esnext',
    minify: 'esbuild', // Use esbuild for faster builds
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'ogl', 'lucide-react'],
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})
