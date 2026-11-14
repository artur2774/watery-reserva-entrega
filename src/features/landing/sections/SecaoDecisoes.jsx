/** Apresenta a seção decisoes da landing page. */
import { TextoBlurReveal } from '../../../shared/components/ui/TextoBlurReveal'
import { TextoEmBrilho } from '../../../shared/components/ui/TextoEmBrilho'

/** Apresenta a seção decisoes da landing page. */
export function SecaoDecisoes() {
  return (
    <section id="decisoes" className="secao-decisoes secao-interativa mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
      <span className="linha-gradiente-secao" aria-hidden="true" />
      <p className="marcador-secao"><TextoEmBrilho>04 / DECISÕES</TextoEmBrilho></p>
      <TextoBlurReveal as="h2">Clareza também é uma decisão de engenharia.</TextoBlurReveal>
      <TextoBlurReveal as="p" className="texto-secao">
        O MVP separa interface e acesso aos dados. Respostas ausentes aparecem como indisponíveis, leituras inválidas são identificadas e credenciais não são gravadas no navegador.
      </TextoBlurReveal>
      <ul className="lista-decisoes mt-10 text-left">
        <li><TextoBlurReveal as="strong">Sem leitura inventada</TextoBlurReveal><TextoBlurReveal as="span">Falhas e ausência de dados aparecem como estados explícitos.</TextoBlurReveal></li>
        <li><TextoBlurReveal as="strong">Privacidade por padrão</TextoBlurReveal><TextoBlurReveal as="span">O formulário não pede nomes nem endereços pessoais.</TextoBlurReveal></li>
        <li><TextoBlurReveal as="strong">Integração incremental</TextoBlurReveal><TextoBlurReveal as="span">Dispositivo e regras de autonomia podem evoluir sem misturar lógica à interface.</TextoBlurReveal></li>
      </ul>
    </section>
  )
}
