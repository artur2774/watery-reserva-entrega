/** Apresenta o histórico retornado pela API em ordem cronológica inversa. */
export function HistoricoLeituras({ leituras, carregando = false, erro = '' }) {
  return (
    <section className="historico-leituras" aria-labelledby="titulo-historico">
      <h2 id="titulo-historico">Histórico de leituras</h2>
      <p>Registros da API, da leitura mais recente à mais antiga.</p>
      {erro ? (
        <p className="form-error" role="alert">{erro}</p>
      ) : carregando ? (
        <p role="status">Carregando histórico…</p>
      ) : leituras.length ? (
        <ol>
          {leituras.map((leitura) => (
            <li key={`${leitura.id ?? leitura.deviceId ?? 'reserva'}-${leitura.timestamp}`}>
              <time dateTime={leitura.timestamp}>{formatarData(leitura.timestamp)}</time>
              <strong>{leitura.volumeUtilL == null ? 'Indisponível' : `${leitura.volumeUtilL} L`}</strong>
              <span>{leitura.autonomiaH == null ? 'Indisponível' : `${leitura.autonomiaH} h de autonomia`}</span>
              <span>{formatarEstado(leitura.estado)}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p role="status">Nenhuma leitura registrada</p>
      )}
    </section>
  )
}

/** Traduz os estados da telemetria para rótulos claros na interface. */
function formatarEstado(estado) {
  if (estado === 'invalido') return 'Leitura inválida'
  if (estado == null || estado === '') return 'Indisponível'

  return estado === 'normal' ? 'Normal' : estado
}

/** Formata um horário de telemetria sem presumir um fuso da API. */
function formatarData(valor) {
  const data = new Date(valor)
  if (Number.isNaN(data.getTime())) return 'Horário indisponível'

  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(data)
}
