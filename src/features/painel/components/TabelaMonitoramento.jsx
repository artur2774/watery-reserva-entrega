/** Tabela de pontos da API com campos acessíveis e ações com Flow Button. */
import { BotaoFluxo } from '../../../shared/components/ui/BotaoFluxo'

/**
 * Exibe os pontos remotos sem fabricar medições ou cadastros locais.
 * @param {{ pontos: object[], carregando?: boolean, aoEditar: (ponto: object) => void, aoRemover: (ponto: object) => void }} propriedades Dados e ações disponibilizados pelo painel.
 */
export function TabelaMonitoramento({ pontos, carregando = false, aoEditar, aoRemover }) {
  if (carregando) {
    return <p className="empty-state" role="status">Consultando os pontos na API…</p>
  }

  /* Descreve cada coluna e mantém ações próximas ao ponto que modificam. */
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Identificação</th>
            <th>Dispositivo</th>
            <th>Capacidade útil</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pontos.map((ponto) => (
            <tr key={ponto.id}>
              <td>
                <strong>{ponto.nome}</strong>
                <small>{ponto.id}</small>
              </td>
              <td>{ponto.deviceId || 'Indisponível'}</td>
              <td>{ponto.capacidadeUtilL == null ? 'Indisponível' : `${ponto.capacidadeUtilL} L`}</td>
              <td>
                <div className="row-actions">
                  <BotaoFluxo type="button" onClick={() => aoEditar(ponto)}>
                    Editar
                  </BotaoFluxo>
                  <BotaoFluxo type="button" onClick={() => aoRemover(ponto)}>
                    Remover
                  </BotaoFluxo>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!pontos.length && (
        <p className="empty-state">A API ainda não tem pontos cadastrados.</p>
      )}
    </div>
  )
}
