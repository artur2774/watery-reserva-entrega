/** Apresenta a seção proposta da landing page. */
import { TextoBlurReveal } from '../../../shared/components/ui/TextoBlurReveal'
import { TextoEmBrilho } from '../../../shared/components/ui/TextoEmBrilho'

/** Apresenta a seção proposta da landing page. */
export function SecaoProposta() {
  return (
    <section id="solucao" className="secao-fluxo secao-interativa mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <span className="linha-gradiente-secao" aria-hidden="true" />
      <p className="marcador-secao"><TextoEmBrilho>02 / A PROPOSTA</TextoEmBrilho></p>
      <TextoBlurReveal as="h2">Do reservatório à informação, em três passos.</TextoBlurReveal>
      <TextoBlurReveal as="p" className="texto-secao mx-auto">
        O painel consulta uma API REST da equipe. Ele não se conecta diretamente ao FIWARE nem ao Orion.
      </TextoBlurReveal>
      <ol className="etapas-visuais mt-12 grid gap-0 md:grid-cols-3">
        <li>
          <TextoBlurReveal as="span">01</TextoBlurReveal>
          <TextoBlurReveal as="strong">Medir</TextoBlurReveal>
          <TextoBlurReveal as="small">O dispositivo associado à reserva coleta sinais como volume e vazão.</TextoBlurReveal>
        </li>
        <li>
          <TextoBlurReveal as="span">02</TextoBlurReveal>
          <TextoBlurReveal as="strong">Organizar</TextoBlurReveal>
          <TextoBlurReveal as="small">A API REST recebe e disponibiliza leituras e cadastros para o produto.</TextoBlurReveal>
        </li>
        <li>
          <TextoBlurReveal as="span">03</TextoBlurReveal>
          <TextoBlurReveal as="strong">Compreender</TextoBlurReveal>
          <TextoBlurReveal as="small">A interface apresenta estado, autonomia e dados indisponíveis com clareza.</TextoBlurReveal>
        </li>
      </ol>
    </section>
  )
}
