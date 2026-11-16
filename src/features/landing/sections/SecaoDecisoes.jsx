/** Apresenta a seção decisoes da landing page. */
import { TextoBlurReveal } from '../../../shared/components/ui/TextoBlurReveal'

/** Apresenta a seção decisoes da landing page. */
export function SecaoDecisoes() {
  return (
    <section id="decisoes" className="secao-decisoes secao-interativa mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
      <span className="separador-secao" aria-hidden="true" />
      <p className="marcador-secao">DECISÕES TÉCNICAS</p>
      <TextoBlurReveal as="h2">Clareza também é uma decisão de engenharia.</TextoBlurReveal>
      <p className="texto-secao">
        O MVP separa interface e acesso aos dados. Respostas ausentes aparecem como indisponíveis, leituras inválidas são identificadas e credenciais não são gravadas no navegador.
      </p>
      <ul className="lista-decisoes mt-10 text-left">
        <li><strong>Sem leitura inventada</strong><span>Falhas e ausência de dados aparecem como estados explícitos.</span></li>
        <li><strong>Privacidade por padrão</strong><span>O formulário inicialmente não pede nomes nem endereços pessoais.</span></li>
        <li><strong>Integração incremental</strong><span>Dispositivo e regras de autonomia podem evoluir sem misturar lógica à interface visual.</span></li>
      </ul>
    </section>
  )
}
