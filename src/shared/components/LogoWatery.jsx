/** Identidade visual da Watery em traço simples, sem dependência de imagem externa. */
export function LogoWatery({ compacto = false }) {
  return (
    <span className="logo-watery" aria-label="Watery">
      <svg aria-hidden="true" viewBox="0 0 40 40" fill="none">
        <path d="M20 3.5C15.7 10.1 8.6 17.4 8.6 24.1a11.4 11.4 0 0 0 22.8 0C31.4 17.4 24.3 10.1 20 3.5Z" fill="currentColor" />
        <path d="M14.1 25.2a6 6 0 0 0 5.9 5.4" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M28.4 11.7c2.3 2.6 4.5 5.5 5.7 8.2" stroke="#77BDE3" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {!compacto && <span>watery</span>}
    </span>
  )
}
