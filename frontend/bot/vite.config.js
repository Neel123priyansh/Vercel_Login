import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  optimizeDeps: {
    include: ["react", "react-router-dom"]
  }
})
