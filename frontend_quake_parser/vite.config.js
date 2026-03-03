import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path' // 1. Importante: importação necessária para lidar com caminhos

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error',
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      // 2. Esta configuração mapeia o "@" para a pasta "src" no Vite
      "@": path.resolve(__dirname, "./src"),
      "@/lib/utils": path.resolve(__dirname, "./src/components/lib/utils")
    },
  },
  server: {
    proxy: {
      // 3. Mantém a conexão com o seu backend Flask na porta 5000
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});