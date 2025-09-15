import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 3000, // Change this to your desired port
    host: true, // listen on all addresses
    origin: 'https://f84f8975a0a7.ngrok-free.app/', // 👈 your public ngrok URL
    cors: true, // allow cross-origin requests
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Your backend server URL
        changeOrigin: true,
        secure: false,
      },
    },

    
   
  }
})
