/** Explica a integração REST e permite abrir o painel. */
import { TextoBlurReveal } from '../../../shared/components/ui/TextoBlurReveal'
import { BotaoFluxo } from '../../../shared/components/ui/BotaoFluxo'

/** Explica a integração REST e permite abrir o painel. */
export function SecaoIntegracaoApi({ aoAbrirPainel }) {
  return (
    <section id="api" className="secao-api secao-interativa">
      <span className="separador-secao" aria-hidden="true" />
      <div className="conteudo-api mx-auto flex max-w-4xl flex-col items-center px-5 py-16 md:px-8 md:py-24">
        <p className="marcador-secao">ENTENDA O FLUXO DE DADOS</p>
        <TextoBlurReveal as="h2">A Reserva WATERY conversa com a API.</TextoBlurReveal>
        <p className="descricao-api mt-5">
          A aplicação consulta leituras e administra pontos por caminhos relativos. A senha das operações protegidas é solicitada à pessoa usuária e mantida somente durante a sessão.
        </p>
        <BotaoFluxo className="botao-agua mt-7" type="button" onClick={aoAbrirPainel}>
          Abrir painel da API
        </BotaoFluxo>
        <div className="faixa-endpoint mt-8">
          <details>
            <summary>Visualizar rotas e endpoints da integração</summary>
            <p className="font-mono text-xs">
              GET /reserva/api/telemetria/reserva-001<br />
              GET · POST · PATCH · DELETE /reserva/api/pontos
            </p>
          </details>
        </div>
      </div>
    </section>
  )
}
