import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Use the Vite React plugin for handling React components
  server: {
    port: 3000, // Specify the port for the development server to run on
    open: true, // Automatically open a browser when the development server starts
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001', // Proxy requests to '/graphql' to the specified target
        secure: false, // Disable SSL certificate verification
        changeOrigin: true // Set the 'Host' header to match the target URL
      }
    }
  }
})