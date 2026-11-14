/** Entrada principal do React e carregamento do estilo compartilhado. */
import { StrictMode } from 'react'
import { createRoot as criarRaizReact } from 'react-dom/client'
import './shared/styles/base.css'
import Aplicacao from './app/Aplicacao.jsx'

/** Inicializa a árvore de componentes com verificações do modo estrito. */
criarRaizReact(document.getElementById('root')).render(
  <StrictMode>
    <Aplicacao />
  </StrictMode>,
)
