/** Apresenta a seção desafio da landing page. */
import { TextoBlurReveal } from '../../../shared/components/ui/TextoBlurReveal'
import { TextoEmBrilho } from '../../../shared/components/ui/TextoEmBrilho'

/** Apresenta a seção desafio da landing page. */
export function SecaoDesafio() {
  return (
    <section id="desafio" className="secao-editorial secao-interativa mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
      <span className="linha-gradiente-secao" aria-hidden="true" />
      <p className="marcador-secao"><TextoEmBrilho>01 / O DESAFIO</TextoEmBrilho></p>
      <TextoBlurReveal as="h2">Quando falta informação, cada decisão pesa mais.</TextoBlurReveal>
      <TextoBlurReveal as="p" className="texto-secao">
        Oscilações no abastecimento e na pressão tornam difícil perceber quanto resta na caixa d’água. A proposta parte de uma necessidade cotidiana: dar visibilidade ao nível da reserva com uma leitura simples, compreensível e útil para quem mora ali.
      </TextoBlurReveal>
    </section>
  )
}
