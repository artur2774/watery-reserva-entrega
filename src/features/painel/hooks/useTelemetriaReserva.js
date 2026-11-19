/** Isola busca, carregamento e falhas da telemetria da camada visual. */
import { useCallback, useEffect, useRef, useState } from 'react'
import { buscarHistoricoTelemetriaReserva, buscarTelemetriaReserva } from '../services/apiReserva'

/** Mantém a última leitura em estado e atualiza ao montar ou por solicitação. */
export function useTelemetriaReserva({ incluirHistorico = false } = {}) {
  const [telemetria, definirTelemetria] = useState(null)
  const [historico, definirHistorico] = useState([])
  const [carregandoTelemetria, definirCarregandoTelemetria] = useState(true)
  const [erroTelemetria, definirErroTelemetria] = useState('')
  const [carregandoHistorico, definirCarregandoHistorico] = useState(incluirHistorico)
  const [erroHistorico, definirErroHistorico] = useState('')
  const consultaEmAndamento = useRef(false)

  /** Atualiza a telemetria; consultas automáticas preservam os dados já visíveis. */
  const atualizarTelemetria = useCallback(async ({ silenciosa = false } = {}) => {
    if (consultaEmAndamento.current) return
    consultaEmAndamento.current = true

    if (!silenciosa) definirCarregandoTelemetria(true)
    definirErroTelemetria('')
    if (incluirHistorico) {
      if (!silenciosa) definirCarregandoHistorico(true)
      definirErroHistorico('')
    }

    try {
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
    } finally {
      consultaEmAndamento.current = false
      definirCarregandoTelemetria(false)
    }
  }, [incluirHistorico])

  /** Busca ao abrir e mantém as leituras atualizadas a cada dois segundos. */
  useEffect(() => {
    const temporizadorInicial = window.setTimeout(() => atualizarTelemetria(), 0)
    const intervaloAtualizacao = window.setInterval(() => {
      atualizarTelemetria({ silenciosa: true })
    }, 2000)

    return () => {
      window.clearTimeout(temporizadorInicial)
      window.clearInterval(intervaloAtualizacao)
    }
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
