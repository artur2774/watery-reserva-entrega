/** Explica a integração REST e permite abrir o painel. */
import { TextoBlurReveal } from '../../../shared/components/ui/TextoBlurReveal'
import { TextoEmBrilho } from '../../../shared/components/ui/TextoEmBrilho'
import { TextoOndaGradiente } from '../../../shared/components/ui/TextoOndaGradiente'
import { BotaoFluxo } from '../../../shared/components/ui/BotaoFluxo'

/** Explica a integração REST e permite abrir o painel. */
export function SecaoIntegracaoApi({ aoAbrirPainel }) {
  return (
    <section id="api" className="secao-api secao-interativa">
      <span className="linha-gradiente-secao" aria-hidden="true" />
      <div className="conteudo-api mx-auto flex max-w-4xl flex-col items-center px-5 py-16 md:px-8 md:py-24">
        <p className="marcador-secao"><TextoEmBrilho>03 / CAMADA DE DADOS</TextoEmBrilho></p>
        <TextoBlurReveal as="h2">A Watery conversa com a API da equipe.</TextoBlurReveal>
        <TextoBlurReveal as="p" className="descricao-api mt-5">
          A aplicação consulta leituras e administra pontos por caminhos relativos. A senha das operações protegidas é solicitada à pessoa usuária e mantida somente durante a sessão.
        </TextoBlurReveal>
        <BotaoFluxo className="botao-agua mt-7" type="button" onClick={aoAbrirPainel}>
          <TextoOndaGradiente>Abrir painel da API</TextoOndaGradiente>
          <span aria-hidden="true">↗</span>
        </BotaoFluxo>
        <p className="faixa-endpoint mt-8 font-mono text-xs">
          <TextoBlurReveal as="span">GET /reserva/api/telemetria/reserva-001</TextoBlurReveal>
          <br />
          <TextoBlurReveal as="span">GET · POST · PATCH · DELETE /reserva/api/pontos</TextoBlurReveal>
        </p>
      </div>
    </section>
  )
}
