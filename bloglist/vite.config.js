import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/login': {
        target: 'http://localhost:3030',
      },
      '/api/blogs': {
        target: 'http://localhost:3030',
      },
    }
  }
})
