/** Apresenta a abertura da apresentação Watery e encaminha ao painel. */
import { TextoBlurReveal } from '../../../shared/components/ui/TextoBlurReveal'
import { TextoOndaGradiente } from '../../../shared/components/ui/TextoOndaGradiente'
import { BotaoFluxo } from '../../../shared/components/ui/BotaoFluxo'

/** Apresenta a abertura da apresentação Watery e encaminha ao painel. */
export function AberturaApresentacao({ aoAbrirPainel }) {
  return (
    <section id="inicio" className="hero mx-auto flex max-w-6xl flex-col items-center px-5 py-24 md:px-8 md:py-36">
      <div className="hero-conteudo flex max-w-3xl flex-col items-center">
        <p className="sobretitulo">
          <span className="ponto-agua" aria-hidden="true" />
          <TextoBlurReveal as="span">TECNOLOGIA PARA CUIDAR DO QUE É ESSENCIAL</TextoBlurReveal>
        </p>
        <h1 className="titulo-hero mt-6">
          <TextoBlurReveal as="span" className="titulo-fragmento">A água que sustenta o dia a dia, </TextoBlurReveal>
          <TextoOndaGradiente>vista com clareza.</TextoOndaGradiente>
        </h1>
        <TextoBlurReveal as="p" className="descricao-hero mt-6">
          Watery transforma leituras de uma reserva doméstica em informação acessível para que famílias acompanhem o consumo e se preparem melhor.
        </TextoBlurReveal>
        <div className="acoes-hero mt-8 flex flex-wrap items-center justify-center gap-5">
          <BotaoFluxo className="botao-primario" type="button" onClick={aoAbrirPainel}>
            <TextoOndaGradiente>Acompanhar uma reserva</TextoOndaGradiente>
          </BotaoFluxo>
          <a href="#desafio" className="link-textual">
            <TextoBlurReveal as="span">Conhecer a proposta ↓</TextoBlurReveal>
          </a>
        </div>
        <TextoBlurReveal as="p" className="nota-hero mt-6">
          Protótipo acadêmico · leitura por API REST
        </TextoBlurReveal>
      </div>
    </section>
  )
}
