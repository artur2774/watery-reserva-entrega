/** Explica a origem remota e os limites do dado apresentado no painel. */
import { TextoBlurReveal } from '../../../shared/components/ui/TextoBlurReveal'

/** Apresenta a informação da API com o mesmo efeito de entrada do painel. */
export function AvisoDados() {
  return (
    <TextoBlurReveal as="p" className="aviso-dados" role="note">
      A telemetria desta tela vem da API Reserva. Nenhum sensor físico está conectado diretamente ao navegador.
    </TextoBlurReveal>
  )
}
