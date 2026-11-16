/** Apresenta a seção desafio da landing page. */
import { TextoBlurReveal } from '../../../shared/components/ui/TextoBlurReveal'

/** Apresenta a seção desafio da landing page. */
export function SecaoDesafio() {
  return (
    <section id="desafio" className="secao-editorial secao-interativa mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
      <span className="separador-secao" aria-hidden="true" />
      <p className="marcador-secao">O DESAFIO</p>
      <TextoBlurReveal as="h2">Quando falta informação, cada decisão pesa mais.</TextoBlurReveal>
      <p className="texto-secao">
        Oscilações tornam difícil perceber e monitorar o gasto real cotidiano. A proposta parte de uma necessidade frequentemente ressaltada: dar visibilidade ao nível da água com uma leitura simples, compreensível e útil para a população.
      </p>
    </section>
  )
}
