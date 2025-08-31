import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173, // optional, sets frontend port
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // backend URL from Forgeon
        changeOrigin: true,
        secure: false,
        
      },
    },
  },
});
