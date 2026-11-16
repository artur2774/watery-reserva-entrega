/** Prévia resumida da leitura real, com estados explícitos e caminho para o painel. */
import { LogoWatery } from '../../../shared/components/LogoWatery'

/** Formata datas da API no fuso local sem supor uma leitura enquanto carrega. */
function formatarHorario(valor) {
  if (!valor) return 'Horário indisponível'
  const data = new Date(valor)
  if (Number.isNaN(data.getTime())) return 'Horário indisponível'

  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(data)
}

/** Converte um número opcional em um valor legível para a pessoa. */
function formatarValor(valor, unidade, casas = 0) {
  if (valor == null) return 'Indisponível'
  return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: casas }).format(valor)} ${unidade}`
}

/** Renderiza a telemetria recebida e oferece atualização e acesso ao painel completo. */
export function VisaoTelemetria({ telemetria, carregando, erro, aoAtualizar, aoAbrirPainel }) {
  const leituraInvalida = telemetria?.estado === 'invalido'
  const mensagemErro = erro || (leituraInvalida ? 'Leitura inválida. Confira o dado no painel.' : '')

  return (
    <aside className="cartao-telemetria" aria-label="Prévia da leitura da reserva principal">
      <div className="cartao-telemetria-topo">
        <LogoWatery />
        <span className="sinal-conexao">{carregando ? 'Buscando leitura' : telemetria ? 'API consultada' : 'Aguardando leitura'}</span>
      </div>

      <div className="cartao-telemetria-titulo">
        <div>
          <p className="rotulo-cartao">RESERVA PRINCIPAL</p>
          <h2>Visão da reserva</h2>
        </div>
      </div>

      {carregando ? (
        <div className="telemetria-carregando" role="status" aria-live="polite">
          <span className="esqueleto-leitura" />
          <span className="esqueleto-descricao" />
          <span className="esqueleto-dado" />
          <span className="sr-only">Consultando a leitura mais recente.</span>
        </div>
      ) : mensagemErro ? (
        <div className="telemetria-aviso" role="status" aria-live="polite">
          <div><strong>{leituraInvalida ? 'Leitura precisa de revisão' : 'Não foi possível conectar'}</strong><p>{mensagemErro}</p></div>
          <button type="button" className="botao-repetir" onClick={aoAtualizar} disabled={carregando}>Tentar de novo</button>
        </div>
      ) : (
        <>
          <div className="destaque-volume">
            <div><p>Volume disponível</p><strong>{formatarValor(telemetria?.volumeUtilL, 'L')}</strong></div>
            <span className={`estado-leitura estado-${telemetria?.estado || 'desconhecido'}`}>
              {telemetria?.estado === 'normal' ? 'Normal' : telemetria?.estado === 'invalido' ? 'Leitura inválida' : 'Indisponível'}
            </span>
          </div>
          <dl className="metricas-telemetria">
            <div><dt>Autonomia estimada</dt><dd>{formatarValor(telemetria?.autonomiaH, 'h', 1)}</dd></div>
            <div><dt>Vazão de entrada</dt><dd>{formatarValor(telemetria?.vazaoEntradaLh, 'L/h')}</dd></div>
            <div><dt>Vazão de saída</dt><dd>{formatarValor(telemetria?.vazaoSaidaLh, 'L/h')}</dd></div>
          </dl>
          <p className="horario-leitura">Última leitura {formatarHorario(telemetria?.timestamp)}</p>
        </>
      )}

      <div className="cartao-telemetria-rodape">
        <span>Dados da API da Reserva</span>
        <button type="button" className="link-painel" onClick={aoAbrirPainel}>Ver painel completo</button>
      </div>
    </aside>
  )
}
