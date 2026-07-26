import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { seoHtmlPlugin } from './vite.seo-plugin.js';

export default defineConfig({
  plugins: [react(), seoHtmlPlugin()],
  build: {
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
