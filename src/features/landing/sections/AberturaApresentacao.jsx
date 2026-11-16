/** Apresenta a abertura da apresentação Watery e encaminha ao painel. */
import { useTelemetriaReserva } from '../../painel/hooks/useTelemetriaReserva'
import { VisaoTelemetria } from '../components/VisaoTelemetria'
import { TextoSubidaReveal } from '../../../shared/components/ui/TextoSubidaReveal'
import { BotaoFluxo } from '../../../shared/components/ui/BotaoFluxo'

/** Apresenta a abertura da apresentação Watery e encaminha ao painel. */
export function AberturaApresentacao({ aoAbrirPainel }) {
  const { telemetria, carregandoTelemetria, erroTelemetria, atualizarTelemetria } = useTelemetriaReserva()

  return (
    <section id="inicio" className="hero mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1.02fr_.98fr] lg:gap-12">
      <div className="hero-conteudo flex max-w-2xl flex-col items-start">
        <p className="sobretitulo">
          TECNOLOGIA UNIDA À POPULAÇÃO E AO MEIO AMBIENTE
        </p>
        <h1 className="titulo-hero mt-6">
          <TextoSubidaReveal as="span" className="titulo-fragmento">A água que sustenta o dia a dia, </TextoSubidaReveal>
          <TextoSubidaReveal as="span" className="titulo-frase-final" delay={180}>vista com clareza.</TextoSubidaReveal>
        </h1>
        <p className="descricao-hero mt-6">
          A Reserva Watery transforma leituras de uma reserva doméstica em informação acessível para que famílias acompanhem o consumo e se preparem melhor.
        </p>
        <div className="acoes-hero mt-8 flex flex-wrap items-center gap-4">
          <BotaoFluxo className="botao-primario" type="button" onClick={aoAbrirPainel}>
            Acompanhar reserva
          </BotaoFluxo>
          <a href="#desafio" className="link-textual">
            Conhecer a proposta
          </a>
        </div>
        <p className="nota-hero mt-7">Por uma vida melhor e um planeta mais saudável. </p>
        <p className="nota-hero mt-7">POWERED BY SMARTECH GROUP.</p>
      </div>

      <VisaoTelemetria
        telemetria={telemetria}
        carregando={carregandoTelemetria}
        erro={erroTelemetria}
        aoAtualizar={atualizarTelemetria}
        aoAbrirPainel={aoAbrirPainel}
      />
    </section>
  )
}
