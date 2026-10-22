import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Professional Portfolio Vite Configuration
export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [react()],
  publicDir: path.resolve(__dirname, 'public'),
  css: {
    postcss: path.resolve(__dirname, 'postcss.config.js'),
  },
  server: {
    port: 3001,
    host: true,
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: false,
  },
});
