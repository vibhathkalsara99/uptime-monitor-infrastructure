import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    css: false,
  },
  plugins: [react()],

  // ── Path Aliases ──────────────────────────────────────────
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  // ── Dev Server ────────────────────────────────────────────
  server: {
    port: 5173,
    strictPort: true,
    open: false,
    proxy: {
      // Proxy /api requests to the Express backend
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // ── Build ─────────────────────────────────────────────────
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        // Code-split vendor chunks for better caching
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react';
          }
        },
      },
    },
  },
});
