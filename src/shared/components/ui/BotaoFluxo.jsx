/** Botão acessível reutilizável com feedback de hover contido. */

/**
 * Mantém as propriedades nativas do botão e adiciona o traço animado da Spell UI.
 * @param {import('react').ButtonHTMLAttributes<HTMLButtonElement> & { children: import('react').ReactNode }} propriedades Texto e atributos do botão.
 */
/** Renderiza um botão acessível com contorno animado no foco e hover. */
export function BotaoFluxo({ children, className = '', ...propriedades }) {
  return (
    <button
      {...propriedades}
      className={`spell-flow-button ${className}`.trim()}
    >
      <span className="spell-flow-conteudo">{children}</span>
    </button>
  )
}
