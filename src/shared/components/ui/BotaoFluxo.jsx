/** Botão Spell UI com contorno tracejado que percorre a borda durante o hover. */
import { useEffect, useRef, useState } from 'react'

/** Gera o caminho SVG arredondado a partir da medida real do botão. */
function criarCaminhoArredondado(largura, altura) {
  const raio = Math.min(20, altura / 2)

  return `M ${raio},1 H ${largura - raio} A ${raio},${raio} 0 0 1 ${largura - 1},${raio} V ${altura - raio} A ${raio},${raio} 0 0 1 ${largura - raio},${altura - 1} H ${raio} A ${raio},${raio} 0 0 1 1,${altura - raio} V ${raio} A ${raio},${raio} 0 0 1 ${raio},1 Z`
}

/**
 * Mantém as propriedades nativas do botão e adiciona o traço animado da Spell UI.
 * @param {import('react').ButtonHTMLAttributes<HTMLButtonElement> & { children: import('react').ReactNode, corBorda?: string }} propriedades Texto e atributos do botão.
 */
/** Renderiza um botão acessível com contorno animado no foco e hover. */
export function BotaoFluxo({ children, className = '', corBorda = '#4d91a8', ...propriedades }) {
  const referenciaBotao = useRef(null)
  const [medidas, definirMedidas] = useState({ largura: 1, altura: 1 })

  /* ResizeObserver mantém o contorno alinhado ao botão em cada breakpoint. */
  useEffect(() => {
    const botao = referenciaBotao.current
    if (!botao || !('ResizeObserver' in window)) return undefined

    const observadorTamanho = new window.ResizeObserver(([entrada]) => {
      definirMedidas({ largura: entrada.contentRect.width, altura: entrada.contentRect.height })
    })

    observadorTamanho.observe(botao)
    return () => observadorTamanho.disconnect()
  }, [])

  /* Renderiza o botão original com um SVG decorativo e não interativo. */
  return (
    <button
      {...propriedades}
      ref={referenciaBotao}
      className={`spell-flow-button ${className}`.trim()}
    >
      <span className="spell-flow-conteudo">{children}</span>
      <svg
        className="spell-flow-contorno"
        viewBox={`0 0 ${medidas.largura} ${medidas.altura}`}
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="none"
      >
        <path
          className="spell-flow-traco"
          d={criarCaminhoArredondado(medidas.largura, medidas.altura)}
          stroke={corBorda}
        />
      </svg>
    </button>
  )
}
