/** Apresenta a seção impacto da landing page. */
import { TextoBlurReveal } from '../../../shared/components/ui/TextoBlurReveal'
import { TextoEmBrilho } from '../../../shared/components/ui/TextoEmBrilho'

/** Apresenta a seção impacto da landing page. */
export function SecaoImpacto() {
  return (
    <section id="impacto" className="secao-impacto secao-interativa mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <span className="linha-gradiente-secao" aria-hidden="true" />
      <p className="marcador-secao"><TextoEmBrilho>05 / CIDADANIA E IMPACTO</TextoEmBrilho></p>
      <TextoBlurReveal as="h2">Informação útil para a casa e para a comunidade.</TextoBlurReveal>
      <TextoBlurReveal as="p" className="texto-secao mx-auto">
        A Watery apoia famílias que dependem de reservatórios e ajuda comunidades a organizar evidências de interrupções no abastecimento. O projeto não substitui a concessionária nem avalia potabilidade.
      </TextoBlurReveal>
      <div className="ods-grade mt-10 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
        <article><span>ODS 6</span><strong>Água potável e saneamento</strong><p>Uso mais eficiente e atenção a perdas na reserva.</p></article>
        <article><span>ODS 10</span><strong>Redução das desigualdades</strong><p>Dados acessíveis para famílias afetadas por falhas no serviço.</p></article>
        <article><span>ODS 11</span><strong>Cidades sustentáveis</strong><p>Organização comunitária em torno de um serviço essencial.</p></article>
        <article><span>ODS 13</span><strong>Ação climática</strong><p>Preparação doméstica diante da escassez hídrica.</p></article>
      </div>
    </section>
  )
}
