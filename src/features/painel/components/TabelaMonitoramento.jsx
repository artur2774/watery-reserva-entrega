/** Tabela de pontos da API com campos acessíveis e ações com Flow Button. */
import { BotaoFluxo } from '../../../shared/components/ui/BotaoFluxo'
import { TextoBlurReveal } from '../../../shared/components/ui/TextoBlurReveal'

/**
 * Exibe os pontos remotos sem fabricar medições ou cadastros locais.
 * @param {{ pontos: object[], carregando?: boolean, aoEditar: (ponto: object) => void, aoRemover: (ponto: object) => void }} propriedades Dados e ações disponibilizados pelo painel.
 */
export function TabelaMonitoramento({ pontos, carregando = false, aoEditar, aoRemover }) {
  if (carregando) {
    return <TextoBlurReveal as="p" className="empty-state" role="status">Consultando os pontos na API…</TextoBlurReveal>
  }

  /* Descreve cada coluna e mantém ações próximas ao ponto que modificam. */
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th><TextoBlurReveal as="span">Identificação</TextoBlurReveal></th>
            <th><TextoBlurReveal as="span">Dispositivo</TextoBlurReveal></th>
            <th><TextoBlurReveal as="span">Capacidade útil</TextoBlurReveal></th>
            <th><TextoBlurReveal as="span">Ações</TextoBlurReveal></th>
          </tr>
        </thead>
        <tbody>
          {pontos.map((ponto) => (
            <tr key={ponto.id}>
              <td>
                <TextoBlurReveal as="strong">{ponto.nome}</TextoBlurReveal>
                <TextoBlurReveal as="small">{ponto.id}</TextoBlurReveal>
              </td>
              <td><TextoBlurReveal as="span">{ponto.deviceId || 'Indisponível'}</TextoBlurReveal></td>
              <td><TextoBlurReveal as="span">{ponto.capacidadeUtilL == null ? 'Indisponível' : `${ponto.capacidadeUtilL} L`}</TextoBlurReveal></td>
              <td>
                <div className="row-actions">
                  <BotaoFluxo type="button" onClick={() => aoEditar(ponto)}>
                    <TextoBlurReveal as="span">Editar</TextoBlurReveal>
                  </BotaoFluxo>
                  <BotaoFluxo type="button" onClick={() => aoRemover(ponto)}>
                    <TextoBlurReveal as="span">Remover</TextoBlurReveal>
                  </BotaoFluxo>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!pontos.length && (
        <TextoBlurReveal as="p" className="empty-state">A API ainda não tem pontos cadastrados.</TextoBlurReveal>
      )}
    </div>
  )
}
