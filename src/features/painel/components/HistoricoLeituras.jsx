/** Lista apenas observações feitas durante a sessão atual do painel. */
export function HistoricoLeituras({ leituras }) {
  return (
    <section className="historico-leituras" aria-labelledby="titulo-historico">
      <h2 id="titulo-historico">Leituras observadas nesta sessão</h2>
      <p>A API fornece a leitura mais recente. Esta lista reúne as atualizações consultadas enquanto o painel está aberto.</p>
      {leituras.length ? (
        <ol>
          {leituras.map((leitura, indice) => (
            <li key={`${leitura.timestamp}-${indice}`}>
              <time dateTime={leitura.timestamp}>{formatarData(leitura.timestamp)}</time>
              <strong>{leitura.volumeUtilL == null ? 'Volume indisponível' : `${leitura.volumeUtilL} L disponíveis`}</strong>
              <span>{leitura.estado === 'invalido' ? 'Leitura inválida' : leitura.estado || 'Estado indisponível'}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p role="status">As leituras consultadas aparecerão aqui.</p>
      )}
    </section>
  )
}

/** Formata um horário de telemetria sem presumir um fuso da API. */
function formatarData(valor) {
  const data = new Date(valor)
  if (Number.isNaN(data.getTime())) return 'Horário indisponível'

  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(data)
}
