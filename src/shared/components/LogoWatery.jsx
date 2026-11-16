/** Identidade visual da Watery em traço simples, sem dependência de imagem externa. */
export function LogoWatery({ compacto = false }) {
  return (
    <span className={`logo-watery ${compacto ? 'logo-watery-compacto' : ''}`} aria-label="Watery">
      <span>watery</span>
    </span>
  )
}
