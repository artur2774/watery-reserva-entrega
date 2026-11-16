/** Revela palavras por recorte vertical, como uma máscara de entrada do Spell UI. */
import { useEffect, useRef, useState } from 'react'

/**
 * Exibe um texto com subida escalonada, sem desfoque nem cor gradiente.
 * @param {{ children: string, as?: string, className?: string, delay?: number }} propriedades Texto, elemento semântico e atraso inicial.
 */
export function TextoSubidaReveal({ children, as: Elemento = 'span', className = '', delay = 0 }) {
  const referencia = useRef(null)
  const [visivel, definirVisivel] = useState(false)
  const texto = String(children ?? '')
  const palavras = texto.split(/(\s+)/u)

  /** Aguarda o texto se aproximar da área de leitura antes de iniciar o movimento. */
  useEffect(() => {
    const elemento = referencia.current
    if (!elemento || !('IntersectionObserver' in window)) {
      definirVisivel(true)
      return undefined
    }

    const observador = new window.IntersectionObserver(([entrada]) => {
      if (!entrada.isIntersecting) return
      definirVisivel(true)
      observador.disconnect()
    }, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' })

    observador.observe(elemento)
    return () => observador.disconnect()
  }, [])

  return (
    <Elemento ref={referencia} className={`texto-subida-reveal ${visivel ? 'texto-subida-visivel' : ''} ${className}`.trim()}>
      <span className="sr-only">{texto}</span>
      <span className="texto-subida-palavras" aria-hidden="true">
        {palavras.map((palavra, indice) => (
          /^\s+$/u.test(palavra)
            ? <span key={`espaco-${indice}`} className="texto-subida-espaco">{palavra}</span>
            : <span key={`palavra-${indice}`} className="texto-subida-mascara"><span className="texto-subida-palavra" style={{ '--atraso-subida': `${delay + indice * 52}ms` }}>{palavra}</span></span>
        ))}
      </span>
    </Elemento>
  )
}
