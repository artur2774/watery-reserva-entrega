/** Isola busca, carregamento e falhas da telemetria da camada visual. */
import { useCallback, useEffect, useState } from 'react'
import { buscarTelemetriaReserva } from '../services/apiReserva'

/** Mantém a última leitura em estado e atualiza ao montar ou por solicitação. */
export function useTelemetriaReserva() {
  const [telemetria, definirTelemetria] = useState(null)
  const [historico, definirHistorico] = useState([])
  const [carregandoTelemetria, definirCarregandoTelemetria] = useState(true)
  const [erroTelemetria, definirErroTelemetria] = useState('')

  /** Consulta a API pública e converte falhas em uma mensagem para a tela. */
  const atualizarTelemetria = useCallback(async () => {
    definirCarregandoTelemetria(true)
    definirErroTelemetria('')

    try {
      const leitura = await buscarTelemetriaReserva()
      definirTelemetria(leitura)
      definirHistorico((leiturasAtuais) => {
        if (leiturasAtuais.some(({ timestamp }) => timestamp === leitura.timestamp)) return leiturasAtuais
        return [leitura, ...leiturasAtuais].slice(0, 8)
      })
    } catch {
      definirErroTelemetria('Não foi possível obter a leitura. Confira a conexão com a API e atualize.')
    } finally {
      definirCarregandoTelemetria(false)
    }
  }, [])

  /** Dispara a consulta ao montar e cancela o disparo se a tela for fechada. */
  useEffect(() => {
    const temporizadorInicial = window.setTimeout(() => atualizarTelemetria(), 0)
    return () => window.clearTimeout(temporizadorInicial)
  }, [atualizarTelemetria])

  return { telemetria, historico, carregandoTelemetria, erroTelemetria, atualizarTelemetria }
}
