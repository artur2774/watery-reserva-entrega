/** Exibe uma vinheta curta da Smartech antes do conteúdo principal da Watery. */
import { useEffect, useState } from 'react'
import './abertura-marca.css'

/** Apresenta o crédito visual e permite entrar no site sem esperar a animação. */
export function AberturaMarca({ aoFinalizar }) {
  const [encerrando, definirEncerrando] = useState(false)

  /** Finaliza a vinheta e limpa temporizadores quando a tela é desmontada. */
  useEffect(() => {
    const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const temporizadorSaida = window.setTimeout(() => definirEncerrando(true), movimentoReduzido ? 500 : 2700)
    const temporizadorFinal = window.setTimeout(aoFinalizar, movimentoReduzido ? 850 : 3150)

    return () => {
      window.clearTimeout(temporizadorSaida)
      window.clearTimeout(temporizadorFinal)
    }
  }, [aoFinalizar])

  return (
    <main className={`abertura-marca ${encerrando ? 'abertura-marca-encerrando' : ''}`} aria-label="Abertura da Watery">
      <h1 className="abertura-marca-frase" aria-label="POWERED BY SMARTECH GROUP.">
        <span className="abertura-marca-coral" aria-hidden="true">POWERED BY</span>
        <span className="abertura-marca-branco" aria-hidden="true">SMARTECH</span>
        <span className="abertura-marca-azul" aria-hidden="true">GROUP.</span>
      </h1>
      <button className="abertura-marca-continuar" type="button" onClick={aoFinalizar}>
        Continuar para a Watery
      </button>
    </main>
  )
}
