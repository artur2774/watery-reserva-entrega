/** Apresenta a seção proposta da landing page. */
import { TextoBlurReveal } from '../../../shared/components/ui/TextoBlurReveal'

/** Apresenta a seção proposta da landing page. */
export function SecaoProposta() {
  return (
    <section id="solucao" className="secao-fluxo secao-interativa mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <span className="separador-secao" aria-hidden="true" />
      <p className="marcador-secao">ENTENDA A PROPOSTA</p>
      <TextoBlurReveal as="h2">Do reservatório à informação constante, em três passos.</TextoBlurReveal>
      <p className="texto-secao mx-auto">
        O painel consulta uma API REST desenvolvida para monitoramento. Devolve os dados separadamente de forma resumida em tempo real, apontando possíveis problemas e inquéritos à se observar.
      </p>
      <ol className="etapas-visuais mt-12 grid gap-0 md:grid-cols-3">
        <li>
          <span>01</span>
          <strong>Medir</strong>
          <small>O dispositivo associado à reserva coleta sinais como volume e vazamentos e alertas.</small>
        </li>
        <li>
          <span>02</span>
          <strong>Organizar</strong>
          <small>A API REST recebe e disponibiliza leituras e cadastros para o usuário.</small>
        </li>
        <li>
          <span>03</span>
          <strong>Compreender</strong>
          <small>A interface apresenta estado, autonomia, dados e alertas com clareza.</small>
        </li>
      </ol>
    </section>
  )
}
