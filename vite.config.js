import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
/** Configuração do Vite com React JSX e o plugin oficial do Tailwind. */
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Em desenvolvimento, encaminha as rotas relativas para a API HTTPS informada pela equipe.
  server: {
    proxy: {
      '/reserva/api': {
        target: 'https://184.192.182.39',
        changeOrigin: true,
      },
    },
  },
})
