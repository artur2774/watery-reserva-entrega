/** Renderiza o rodapé e o link de retorno ao início. */
import { TextoSubidaReveal } from '../../../shared/components/ui/TextoSubidaReveal'
import { BotaoFluxo } from '../../../shared/components/ui/BotaoFluxo'
import { LogoWatery } from '../../../shared/components/LogoWatery'

/** Renderiza o rodapé e o link de retorno ao início. */
export function RodapeApresentacao({ aoAbrirPainel }) {
  return (
    <>
      <section className="rodape-acao mx-auto my-12 flex max-w-6xl flex-col items-start gap-6 px-6 py-10 md:my-20 md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
        <div>
          <p className="marcador-secao">CONFIRA</p>
          <h2><TextoSubidaReveal>Uma leitura clara começa com um passo simples.</TextoSubidaReveal></h2>
          <p className="mt-4">Veja a telemetria disponível e acompanhe a reserva principal.</p>
        </div>
        <BotaoFluxo className="botao-primario" type="button" onClick={aoAbrirPainel}>
          Acompanhar reserva
        </BotaoFluxo>
      </section>

      <footer className="rodape mx-auto flex max-w-7xl flex-col items-center gap-3 px-5 py-8 text-sm md:flex-row md:justify-between md:px-8">
        <LogoWatery />
        <span>FIAP Global Solution CitizenTech 2026</span>
        <a href="#inicio">Voltar ao início</a>
        <span>POWERED BY SMARTECH</span>
      </footer>
    </>
  )
}
