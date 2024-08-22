import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
  //   plugins: [react()],
  // })
  
  
  export default defineConfig({
    plugins: [react()],
      base: '/',
  server: {
    historyApiFallback: true, // This ensures that the server redirects to index.html for unknown routes
  },
});