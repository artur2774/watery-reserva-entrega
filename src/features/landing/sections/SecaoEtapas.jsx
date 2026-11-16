/** Apresenta a seção etapas da landing page. */
import { TextoBlurReveal } from '../../../shared/components/ui/TextoBlurReveal'

/** Apresenta a seção etapas da landing page. */
export function SecaoEtapas() {
  return (
    <section id="etapas" className="secao-jornada secao-interativa mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <span className="separador-secao" aria-hidden="true" />
      <p className="marcador-secao">FLUXO DE ETAPAS</p>
      <TextoBlurReveal as="h2">Integração entre disciplinas.</TextoBlurReveal>
      <p className="texto-secao mx-auto">
        O projeto cresce por etapas, mantendo cada responsabilidade verificável e pronta para se conectar às demais frentes da Global Solution.
      </p>
      <ol className="linha-jornada mt-12 grid gap-8 md:grid-cols-3">
        <li><span>Design Interface, UI, Ux & Development</span><strong>Front-end e Web Development</strong><p>Identidade visual, consulta de API, cadastro dos pontos e estados da interface.</p></li>
        <li><span>IoT & Python</span><strong>Dispositivo, Edge e Python Terminal</strong><p>Publicar medições reais e documentar origem, frequência e qualidade dos sinais, visualização em tempo real e dispositivo físico demonstrativo.</p></li>
        <li><span>Validação</span><strong>Dados, cálculo e comunidade</strong><p>Conferir autonomia, testar entendimento e validar a utilidade com pessoas.</p></li>
      </ol>
    </section>
  )
}
