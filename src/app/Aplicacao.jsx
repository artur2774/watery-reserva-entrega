/** Controla a navegação entre apresentação e painel da Watery. */
import { useState } from 'react'
import { PaginaInicial } from '../features/landing/PaginaInicial'
import { PainelComunidade } from '../features/painel/PainelComunidade'

/** Mantém a tela atual no estado React e oferece retorno pelo painel. */
function Aplicacao() {
  const [telaAtual, definirTelaAtual] = useState('inicio')

  if (telaAtual === 'painel') {
    return <PainelComunidade aoVoltar={() => definirTelaAtual('inicio')} />
  }

  return <PaginaInicial aoAbrirPainel={() => definirTelaAtual('painel')} />
}

export default Aplicacao
