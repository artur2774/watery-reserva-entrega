/** Apresenta a seção impacto da landing page. */
import { TextoBlurReveal } from '../../../shared/components/ui/TextoBlurReveal'

/** Apresenta a seção impacto da landing page. */
export function SecaoImpacto() {
  return (
    <section id="impacto" className="secao-impacto secao-interativa mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <span className="separador-secao" aria-hidden="true" />
      <p className="marcador-secao">CIDADANIA E IMPACTO</p>
      <TextoBlurReveal as="h2">Informação útil para residências e para comunidades.</TextoBlurReveal>
      <p className="texto-secao mx-auto">
        A Smartech defende e apoia famílias que dependem de reservatórios e ajuda comunidades a organizar informações cruciais. O projeto WATERY foi desenvolvido para atender essa necessidade.
      </p>
      <div className="ods-grade mt-10 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
        <article><span>ODS 6</span><strong>Água potável e saneamento</strong><p>Uso mais conciente, eficiente e atenção a perdas na reserva.</p></article>
        <article><span>ODS 10</span><strong>Redução das desigualdades</strong><p>Dados acessíveis para famílias afetadas por falhas no serviço.</p></article>
        <article><span>ODS 11</span><strong>Cidades sustentáveis</strong><p>Organização comunitária em torno de um serviço essencial.</p></article>
        <article><span>ODS 13</span><strong>Ação climática</strong><p>Preparação doméstica diante da escassez hídrica.</p></article>
      </div>
    </section>
  )
}
