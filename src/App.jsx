/** Aplicação que alterna entre a página pública e a demonstração do painel. */
import { useState } from 'react'
import { PaginaInicial } from './pages/PaginaInicial'
import { PainelComunidade } from './pages/PainelComunidade'

/** Mantém a navegação mínima enquanto o MVP tem apenas duas telas. */
function Aplicacao() {
  const [telaAtual, definirTelaAtual] = useState('inicio')

  return telaAtual === 'painel'
    ? <PainelComunidade aoVoltar={() => definirTelaAtual('inicio')} />
    : <PaginaInicial aoAbrirPainel={() => definirTelaAtual('painel')} />
}

export default Aplicacao
