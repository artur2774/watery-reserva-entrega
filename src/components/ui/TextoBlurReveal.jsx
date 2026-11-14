/** Componente de texto com entrada letra a letra, blur e gatilho de viewport. */
import { useEffect, useMemo, useRef, useState } from 'react'

/* Compartilha um observador para os textos e evita criar um por frase. */
const textosObservados = new Map()
let observadorCompartilhado = null

/** Registra a frase para revelar ao entrar no viewport e devolve a limpeza. */
function observarFrase(elemento, aoRevelar, umaVez) {
  if (!('IntersectionObserver' in window)) {
    aoRevelar()
    return () => {}
  }

  if (!observadorCompartilhado) {
    observadorCompartilhado = new window.IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return
        const observacao = textosObservados.get(entrada.target)
        observacao?.aoRevelar()
        if (observacao?.umaVez) {
          observadorCompartilhado?.unobserve(entrada.target)
          textosObservados.delete(entrada.target)
        }
      })
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 })
  }

  textosObservados.set(elemento, { aoRevelar, umaVez })
  observadorCompartilhado.observe(elemento)

  return () => {
    observadorCompartilhado?.unobserve(elemento)
    textosObservados.delete(elemento)
    if (!textosObservados.size) {
      observadorCompartilhado?.disconnect()
      observadorCompartilhado = null
    }
  }
}

/** Divide uma palavra em grafemas para não separar acentos ou emojis compostos. */
function separarGrafemas(palavra) {
  if (typeof Intl.Segmenter === 'function') {
    const segmentador = new Intl.Segmenter('pt-BR', { granularity: 'grapheme' })
    return Array.from(segmentador.segment(palavra), ({ segment }) => segment)
  }

  return Array.from(palavra)
}

/**
 * Revela uma string em sequência quando o componente entra na área visível.
 * @param {{ children: string, as?: string, className?: string, delay?: number, speedReveal?: number, speedSegment?: number, inView?: boolean, once?: boolean, trigger?: boolean }} propriedades Texto, tag semântica e ritmo da animação.
 */
export function TextoBlurReveal({
  children,
  as: Elemento = 'span',
  className = '',
  delay = 0,
  speedReveal = 1.05,
  speedSegment = 0.54,
  inView = true,
  once = true,
  trigger = true,
  style = {},
  ...atributosElemento
}) {
  const referenciaTexto = useRef(null)
  const [visivel, definirVisivel] = useState(!inView)
  const texto = String(children ?? '')
  const palavras = useMemo(() => texto.split(/(\s+)/u), [texto])
  const atrasoEntreCaracteres = 0.03 / Math.max(speedReveal, 0.1)
  const duracaoCaracter = 0.3 / Math.max(speedSegment, 0.1)
  let indiceSequencial = 0

  /* Observa a própria frase para iniciar o efeito somente durante a leitura. */
  useEffect(() => {
    const elementoTexto = referenciaTexto.current

    if (!elementoTexto || !trigger || !inView) {
      definirVisivel(true)
      return undefined
    }

    const pararObservacao = observarFrase(elementoTexto, () => definirVisivel(true), once)

    /* Garante a revelação dos textos já visíveis mesmo se o navegador atrasar o observer. */
    const quadroInicial = window.requestAnimationFrame(() => {
      const limitesTexto = elementoTexto.getBoundingClientRect()
      const estaVisivel = limitesTexto.top < window.innerHeight && limitesTexto.bottom > 0
      if (estaVisivel) definirVisivel(true)
    })

    return () => {
      window.cancelAnimationFrame(quadroInicial)
      pararObservacao()
    }
  }, [inView, once, trigger])

  /* Não monta a frase quando o componente foi explicitamente desativado. */
  if (children == null) return null
  if (!trigger) return <Elemento {...atributosElemento} className={className} style={style}>{texto}</Elemento>

  return (
    <Elemento
      {...atributosElemento}
      ref={referenciaTexto}
      className={`texto-blur-reveal ${visivel ? 'texto-blur-visivel' : ''} ${className}`.trim()}
      style={{ ...style, '--atraso-inicial': `${delay}s`, '--atraso-caractere': `${atrasoEntreCaracteres}s`, '--duracao-caractere': `${duracaoCaracter}s` }}
    >
      <span className="sr-only">{texto}</span>
      {palavras.map((palavra, indicePalavra) => {
        if (/^\s+$/u.test(palavra)) {
          const indiceEspaco = indiceSequencial++
          return <span key={`espaco-${indicePalavra}`} aria-hidden="true" className="texto-blur-espaco" style={{ '--indice-caractere': indiceEspaco }}>{palavra}</span>
        }

        return (
          <span key={`palavra-${indicePalavra}`} aria-hidden="true" className="texto-blur-palavra">
            {separarGrafemas(palavra).map((grafema, indiceGrafema) => {
              const indiceCaractere = indiceSequencial++
              const atrasoGrafema = delay + indiceCaractere * atrasoEntreCaracteres

              return (
                <span
                  key={`grafema-${indicePalavra}-${indiceGrafema}`}
                  className="texto-blur-caractere"
                  style={{ '--indice-caractere': indiceCaractere, '--atraso-caractere-individual': `${atrasoGrafema}s` }}
                >
                  {grafema}
                </span>
              )
            })}
          </span>
        )
      })}
    </Elemento>
  )
}
