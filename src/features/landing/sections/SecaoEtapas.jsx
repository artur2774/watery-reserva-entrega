/** Apresenta a seção etapas da landing page. */
import { TextoBlurReveal } from '../../../shared/components/ui/TextoBlurReveal'
import { TextoEmBrilho } from '../../../shared/components/ui/TextoEmBrilho'

/** Apresenta a seção etapas da landing page. */
export function SecaoEtapas() {
  return (
    <section id="etapas" className="secao-jornada secao-interativa mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <span className="linha-gradiente-secao" aria-hidden="true" />
      <p className="marcador-secao"><TextoEmBrilho>06 / PRÓXIMAS ETAPAS</TextoEmBrilho></p>
      <TextoBlurReveal as="h2">Uma base para integrar as próximas disciplinas.</TextoBlurReveal>
      <TextoBlurReveal as="p" className="texto-secao mx-auto">
        O projeto cresce por etapas, mantendo cada responsabilidade verificável e pronta para se conectar às demais frentes da Global Solution.
      </TextoBlurReveal>
      <ol className="linha-jornada mt-12 grid gap-8 md:grid-cols-3">
        <li><TextoBlurReveal as="span">Agora</TextoBlurReveal><TextoBlurReveal as="strong">Front-end e Web Development</TextoBlurReveal><TextoBlurReveal as="p">Identidade, consulta da API, cadastro dos pontos e estados da interface.</TextoBlurReveal></li>
        <li><TextoBlurReveal as="span">Próxima integração</TextoBlurReveal><TextoBlurReveal as="strong">Dispositivo e Edge</TextoBlurReveal><TextoBlurReveal as="p">Publicar medições reais e documentar origem, frequência e qualidade dos sinais.</TextoBlurReveal></li>
        <li><TextoBlurReveal as="span">Validação</TextoBlurReveal><TextoBlurReveal as="strong">Dados, cálculo e comunidade</TextoBlurReveal><TextoBlurReveal as="p">Conferir autonomia, testar entendimento e validar a utilidade com pessoas.</TextoBlurReveal></li>
      </ol>
    </section>
  )
}
