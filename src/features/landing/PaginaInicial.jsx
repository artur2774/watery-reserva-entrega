/** Página inicial: define a ordem das seções e navegação da Watery. */
import { useEffect, useRef } from 'react'
import { BotaoFluxo } from '../../shared/components/ui/BotaoFluxo'
import { TextoBlurReveal } from '../../shared/components/ui/TextoBlurReveal'
import { TextoOndaGradiente } from '../../shared/components/ui/TextoOndaGradiente'
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
  const referenciaPagina = useRef(null)

  /** Anima os divisores ao rolar, respeitando a preferência de movimento reduzido. */
  useEffect(() => {
    const motorAnimacao = window.gsap
    const gatilhoRolagem = window.ScrollTrigger
    const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let contextoAnimacao

    if (!movimentoReduzido && motorAnimacao && gatilhoRolagem) {
      motorAnimacao.registerPlugin(gatilhoRolagem)
      contextoAnimacao = motorAnimacao.context(() => {
        motorAnimacao.utils.toArray('.linha-gradiente-secao').forEach((divisor) => {
          motorAnimacao.fromTo(divisor, { scaleX: 0 }, {
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: divisor.parentElement, start: 'top 82%' },
          })
        })
      }, referenciaPagina)
    }

    return () => contextoAnimacao?.revert()
  }, [])

  return (
    <main ref={referenciaPagina} className="pagina-inicial min-h-screen text-center">
      <header className="navegacao mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-5 py-5 md:px-8">
        <a href="#inicio" className="marca-watery" aria-label="Watery, início"><LogoWatery /></a>
        <nav className="hidden items-center gap-7 text-sm md:flex" aria-label="Navegação principal">
          <a href="#desafio"><TextoBlurReveal as="span">Desafio</TextoBlurReveal></a>
          <a href="#solucao"><TextoBlurReveal as="span">Solução</TextoBlurReveal></a>
          <a href="#etapas"><TextoBlurReveal as="span">Etapas</TextoBlurReveal></a>
        </nav>
        <BotaoFluxo className="botao-secundario" type="button" onClick={aoAbrirPainel}>
          <TextoOndaGradiente>Ver painel</TextoOndaGradiente>
        </BotaoFluxo>
      </header>

      <AberturaApresentacao aoAbrirPainel={aoAbrirPainel} />
      <SecaoDesafio />
      <SecaoProposta />
      <SecaoIntegracaoApi aoAbrirPainel={aoAbrirPainel} />
      <SecaoDecisoes />
      <SecaoImpacto />
      <SecaoEtapas />
      <RodapeApresentacao />
    </main>
  )
}
