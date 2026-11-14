/** Renderiza o rodapé e o link de retorno ao início. */
import { TextoBlurReveal } from '../../../shared/components/ui/TextoBlurReveal'
import { LogoWatery } from '../../../shared/components/LogoWatery'

/** Renderiza o rodapé e o link de retorno ao início. */
export function RodapeApresentacao() {
  return (
    <footer className="rodape mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-8 text-sm md:flex-row md:justify-between md:px-8">
      <LogoWatery />
      <TextoBlurReveal as="span">FIAP · Global Solution CitizenTech 2026</TextoBlurReveal>
      <a href="#inicio"><TextoBlurReveal as="span">Voltar ao início</TextoBlurReveal></a>
      <TextoBlurReveal as="span">Protótipo acadêmico conectado à API REST</TextoBlurReveal>
    </footer>
  )
}
