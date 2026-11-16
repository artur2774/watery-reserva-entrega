/** Controla a navegação entre apresentação e painel da Watery. */
import { useCallback, useState } from 'react'
import { PaginaInicial } from '../features/landing/PaginaInicial'
import { AberturaMarca } from '../features/landing/components/AberturaMarca'
import { PainelComunidade } from '../features/painel/PainelComunidade'

/** Mantém a tela atual no estado React e oferece retorno pelo painel. */
function Aplicacao() {
  const [telaAtual, definirTelaAtual] = useState('inicio')
  const [aberturaConcluida, definirAberturaConcluida] = useState(false)
  const concluirAbertura = useCallback(() => definirAberturaConcluida(true), [])

  if (!aberturaConcluida) {
    return <AberturaMarca aoFinalizar={concluirAbertura} />
  }

  if (telaAtual === 'painel') {
    return <PainelComunidade aoVoltar={() => definirTelaAtual('inicio')} />
  }

  return <PaginaInicial aoAbrirPainel={() => definirTelaAtual('painel')} />
}

export default Aplicacao
