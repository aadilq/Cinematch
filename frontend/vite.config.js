import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server :{
    proxy:{
      // We want to Forward API requests to your backend server
      '/api':{
        target: 'http://localhost:5000', 
        changeOrigin: true,
        secure: false
      }
    }
  }
})
