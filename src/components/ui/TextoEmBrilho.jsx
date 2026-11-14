/** Marcador Spell UI com brilho cromático e revelação letra a letra. */
import { TextoBlurReveal } from './TextoBlurReveal'

/** Mantém os marcadores com semântica de texto e animação acessível. */
export function TextoEmBrilho({ children, className = '' }) {
  return <TextoBlurReveal className={`texto-em-brilho ${className}`}>
    {children}
  </TextoBlurReveal>
}
