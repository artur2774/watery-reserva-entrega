/** Página inicial: define a ordem das seções e navegação da Watery. */
import { ProgressoLeitura } from './components/ProgressoLeitura'
import { BotaoFluxo } from '../../shared/components/ui/BotaoFluxo'
import { LogoWatery } from '../../shared/components/LogoWatery'
import { AberturaApresentacao } from './sections/AberturaApresentacao'
import { SecaoDesafio } from './sections/SecaoDesafio'
import { SecaoProposta } from './sections/SecaoProposta'
import { SecaoIntegracaoApi } from './sections/SecaoIntegracaoApi'
import { SecaoDecisoes } from './sections/SecaoDecisoes'
import { SecaoImpacto } from './sections/SecaoImpacto'
import { SecaoEtapas } from './sections/SecaoEtapas'
import { RodapeApresentacao } from './sections/RodapeApresentacao'
import './styles/landing.css'

/**
 * Apresenta a proposta Watery e encaminha as pessoas ao painel.
 * @param {{ aoAbrirPainel: () => void }} propriedades Ação de navegação para o painel.
 */
export function PaginaInicial({ aoAbrirPainel }) {
  return (
    <main className="pagina-inicial min-h-screen text-left">
      <ProgressoLeitura />
      <header className="navegacao mx-auto flex w-full max-w-7xl items-center justify-between gap-5 px-5 py-5 md:px-8">
        <a href="#inicio" className="marca-watery" aria-label="Watery, início"><LogoWatery /></a>
        <nav className="hidden items-center gap-7 text-sm md:flex" aria-label="Navegação principal">
          <a href="#desafio">Desafio</a>
          <a href="#solucao">Solução</a>
          <a href="#etapas">Etapas</a>
        </nav>
        <BotaoFluxo className="botao-secundario" type="button" onClick={aoAbrirPainel}>
          Ver painel
        </BotaoFluxo>
      </header>

      <AberturaApresentacao aoAbrirPainel={aoAbrirPainel} />
      <SecaoDesafio />
      <SecaoProposta />
      <SecaoIntegracaoApi aoAbrirPainel={aoAbrirPainel} />
      <SecaoDecisoes />
      <SecaoImpacto />
      <SecaoEtapas />
      <RodapeApresentacao aoAbrirPainel={aoAbrirPainel} />
    </main>
  )
}
