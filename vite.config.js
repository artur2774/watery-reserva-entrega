import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { loadEnv } from 'vite'
/** Configuração do Vite com React JSX e o plugin oficial do Tailwind. */
import { defineConfig } from 'vite'

/** Carrega a origem da API por ambiente sem expor esse destino ao código do navegador. */
export default defineConfig(({ mode }) => {
  const ambiente = loadEnv(mode, '.', '')
  const enderecoApiEquipe = ambiente.API_PROXY_TARGET || 'https://184.192.182.39'

  return {
    plugins: [react(), tailwindcss()],
    // Encaminha chamadas locais para a API externa durante o desenvolvimento.
    server: {
      proxy: {
        '/reserva/api': {
          target: enderecoApiEquipe,
          changeOrigin: true,
        },
      },
    },
  }
})
