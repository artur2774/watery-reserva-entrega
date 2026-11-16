/** Indica o avanço na apresentação e a seção visível durante a rolagem. */
import { useEffect, useState } from 'react'

const secoes = [
  { id: 'inicio', nome: 'Visão geral' },
  { id: 'desafio', nome: 'Desafio' },
  { id: 'solucao', nome: 'Solução' },
  { id: 'api', nome: 'Integração' },
  { id: 'decisoes', nome: 'Decisões' },
  { id: 'impacto', nome: 'Impacto' },
  { id: 'etapas', nome: 'Próximos passos' },
]

/** Mantém o indicador acessível e sincronizado com a posição real da página. */
export function ProgressoLeitura() {
  const [progresso, definirProgresso] = useState(0)
  const [secaoAtiva, definirSecaoAtiva] = useState(0)

  /** Mede a rolagem numa animação por quadro para evitar trabalho excessivo. */
  useEffect(() => {
    let quadroPendente = 0
    const atualizarProgresso = () => {
      window.cancelAnimationFrame(quadroPendente)
      quadroPendente = window.requestAnimationFrame(() => {
        const alturaRolavel = document.documentElement.scrollHeight - window.innerHeight
        const fracao = alturaRolavel > 0 ? window.scrollY / alturaRolavel : 0
        definirProgresso(Math.min(100, Math.max(0, Math.round(fracao * 100))))
      })
    }

    window.addEventListener('scroll', atualizarProgresso, { passive: true })
    window.addEventListener('resize', atualizarProgresso)
    atualizarProgresso()
    return () => {
      window.cancelAnimationFrame(quadroPendente)
      window.removeEventListener('scroll', atualizarProgresso)
      window.removeEventListener('resize', atualizarProgresso)
    }
  }, [])

  /** Identifica a seção atual sem exigir leitura exata da barra de rolagem. */
  useEffect(() => {
    const elementos = secoes.map(({ id }) => document.getElementById(id)).filter(Boolean)
    if (!('IntersectionObserver' in window)) return undefined
    const observador = new window.IntersectionObserver((entradas) => {
      const visivel = entradas.filter((entrada) => entrada.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visivel) return
      const indice = secoes.findIndex(({ id }) => id === visivel.target.id)
      if (indice >= 0) definirSecaoAtiva(indice)
    }, { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.15, 0.4] })

    elementos.forEach((elemento) => observador.observe(elemento))
    return () => observador.disconnect()
  }, [])

  return (
    <>
      <div className="progresso-faixa" role="progressbar" aria-label="Progresso na apresentação" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progresso}>
        <span style={{ transform: `scaleX(${progresso / 100})` }} />
      </div>
      <p className="progresso-indicador" aria-live="polite">Seção {secaoAtiva + 1} de {secoes.length}<span className="progresso-nome">{secoes[secaoAtiva]?.nome}</span></p>
    </>
  )
}
