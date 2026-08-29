import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
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
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
