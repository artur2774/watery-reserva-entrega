/** Isola busca, carregamento e falhas da telemetria da camada visual. */
import { useCallback, useEffect, useState } from 'react'
import { buscarHistoricoTelemetriaReserva, buscarTelemetriaReserva } from '../services/apiReserva'

/** Mantém a última leitura em estado e atualiza ao montar ou por solicitação. */
export function useTelemetriaReserva({ incluirHistorico = false } = {}) {
  const [telemetria, definirTelemetria] = useState(null)
  const [historico, definirHistorico] = useState([])
  const [carregandoTelemetria, definirCarregandoTelemetria] = useState(true)
  const [erroTelemetria, definirErroTelemetria] = useState('')
  const [carregandoHistorico, definirCarregandoHistorico] = useState(incluirHistorico)
  const [erroHistorico, definirErroHistorico] = useState('')

  /** Atualiza a leitura atual e, opcionalmente, o histórico público do painel. */
  const atualizarTelemetria = useCallback(async () => {
    definirCarregandoTelemetria(true)
    definirErroTelemetria('')
    if (incluirHistorico) {
      definirCarregandoHistorico(true)
      definirErroHistorico('')
    }

    const resultados = await Promise.allSettled([
      buscarTelemetriaReserva(),
      ...(incluirHistorico ? [buscarHistoricoTelemetriaReserva()] : []),
    ])

    const resultadoTelemetria = resultados[0]
    if (resultadoTelemetria.status === 'fulfilled') {
      definirTelemetria(resultadoTelemetria.value)
    } else {
      definirErroTelemetria('Não foi possível obter a leitura. Confira a conexão com a API e atualize.')
    }

    if (incluirHistorico) {
      const resultadoHistorico = resultados[1]
      if (resultadoHistorico.status === 'fulfilled') {
        definirHistorico(resultadoHistorico.value)
      } else {
        definirErroHistorico('Não foi possível carregar o histórico. Tente atualizar novamente.')
      }
      definirCarregandoHistorico(false)
    }
    definirCarregandoTelemetria(false)
  }, [incluirHistorico])

  /** Dispara a consulta ao montar e cancela o disparo se a tela for fechada. */
  useEffect(() => {
    const temporizadorInicial = window.setTimeout(() => atualizarTelemetria(), 0)
    return () => window.clearTimeout(temporizadorInicial)
  }, [atualizarTelemetria])

  return {
    telemetria,
    historico,
    carregandoTelemetria,
    erroTelemetria,
    atualizarTelemetria,
    carregandoHistorico,
    erroHistorico,
  }
}
