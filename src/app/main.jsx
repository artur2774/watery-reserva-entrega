/** Ponto de entrada React que monta a aplicação com verificações de desenvolvimento. */
import { StrictMode } from 'react'
import { createRoot as criarRaiz } from 'react-dom/client'
import './index.css'
import Aplicacao from './App.jsx'

criarRaiz(document.getElementById('root')).render(
  <StrictMode>
    <Aplicacao />
  </StrictMode>,
)
