import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/aic': {
        target: 'https://api.artic.edu/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/aic/, ''),
        headers: {
          'AIC-User-Agent': 'ARTORA (artora@example.com)',
        },
      },
      '/api/iiif': {
        target: 'https://www.artic.edu/iiif/2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/iiif/, ''),
        headers: {
          'AIC-User-Agent': 'ARTORA (artora@example.com)',
        },
      },
    },
  },
});
