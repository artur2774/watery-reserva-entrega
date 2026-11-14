/** Texto com gradiente Spell UI e revelação de caracteres no scroll. */
import { TextoBlurReveal } from './TextoBlurReveal'

/** Apresenta texto cromático com o Blur Reveal oficial adaptado ao estilo local. */
export function TextoOndaGradiente({ children, className = '' }) {
  return <TextoBlurReveal className={`texto-onda-gradiente ${className}`}>
    {children}
  </TextoBlurReveal>
}
