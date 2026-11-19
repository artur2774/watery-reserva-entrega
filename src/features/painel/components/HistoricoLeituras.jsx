import { useState } from 'react'
import { formatarEstado, paginarLeituras } from '../../../shared/telemetria'

/** Apresenta o histórico retornado pela API em ordem cronológica inversa. */
export function HistoricoLeituras({ leituras, carregando = false, erro = '' }) {
  const [pagina, definirPagina] = useState(1)
  const { paginaAtual, totalPaginas, registros } = paginarLeituras(leituras, pagina)

  return (
    <section className="historico-leituras" aria-labelledby="titulo-historico">
      <h2 id="titulo-historico">Histórico de leituras</h2>
      <p>Registros da API, da leitura mais recente à mais antiga.</p>
      {erro ? (
        <p className="form-error" role="alert">{erro}</p>
      ) : carregando ? (
        <p role="status">Carregando histórico…</p>
      ) : leituras.length ? (
        <>
          <ol id="lista-historico">
            {registros.map((leitura) => (
              <li key={`${leitura.id ?? leitura.deviceId ?? 'reserva'}-${leitura.timestamp}`}>
                <time dateTime={leitura.timestamp}>{formatarData(leitura.timestamp)}</time>
                <strong>{leitura.volumeUtilL == null ? 'Indisponível' : `${leitura.volumeUtilL} L`}</strong>
                <span>{leitura.autonomiaH == null ? 'Indisponível' : `${leitura.autonomiaH} h de autonomia`}</span>
                <span>{formatarEstado(leitura.estado)}</span>
              </li>
            ))}
          </ol>
          <nav className="historico-paginacao" aria-label="Páginas do histórico">
            <button type="button" aria-controls="lista-historico" disabled={paginaAtual === 1}
              onClick={() => definirPagina(paginaAtual - 1)}>Anterior</button>
            <span>Página {paginaAtual} de {totalPaginas} · {leituras.length} leituras</span>
            <button type="button" aria-controls="lista-historico" disabled={paginaAtual === totalPaginas}
              onClick={() => definirPagina(paginaAtual + 1)}>Próxima</button>
          </nav>
        </>
      ) : (
        <p role="status">Nenhuma leitura registrada</p>
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
