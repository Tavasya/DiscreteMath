import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    cors: true, // Enable CORS as previously suggested
    host: 'localhost',
    port: 5173
  }
});
