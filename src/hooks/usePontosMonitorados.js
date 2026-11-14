/** Estado assíncrono dos pontos remotos, isolado dos componentes de apresentação. */
import { useCallback, useEffect, useState } from 'react'
import { atualizarPontoReserva, criarPontoReserva, excluirPontoReserva, listarPontosReserva } from '../services/apiReserva'

/**
 * Coordena consulta e operações CRUD da API sem gravar senha ou resposta no navegador.
 * @param {string} senha Senha mantida temporariamente pelo componente do painel.
 */
export function usePontosMonitorados(senha) {
  const [pontos, definirPontos] = useState([])
  const [carregandoPontos, definirCarregandoPontos] = useState(false)
  const [erroPontos, definirErroPontos] = useState('')

  /** Limpa credenciais dependentes do hook e a lista na troca de sessão. */
  const limparPontos = () => {
    definirPontos([])
    definirErroPontos('')
  }

  /** Atualiza a lista remota e preserva o estado de erro para a interface. */
  const carregarPontos = useCallback(async () => {
    if (!senha) return
    definirCarregandoPontos(true)
    definirErroPontos('')
    try {
      const resposta = await listarPontosReserva(senha)
      definirPontos(Array.isArray(resposta) ? resposta : [])
    } catch (erro) {
      if (erro.status === 401) definirErroPontos('A senha não foi aceita. Confira e tente novamente.')
      else definirErroPontos('Não foi possível consultar os pontos. Verifique a API e tente novamente.')
      throw erro
    } finally {
      definirCarregandoPontos(false)
    }
  }, [senha])

  useEffect(() => {
    if (!senha) return undefined
    const temporizador = window.setTimeout(() => carregarPontos().catch(() => {}), 0)
    return () => window.clearTimeout(temporizador)
  }, [senha, carregarPontos])

  /** Cria um ponto e recarrega a fonte oficial após a resposta do serviço. */
  const salvarPonto = async (ponto, pontoOriginal = null) => {
    if (pontoOriginal) {
      const camposEditaveis = ['nome', 'capacidadeUtilL', 'deviceId']
      const alteracoes = Object.fromEntries(camposEditaveis
        .filter((campo) => {
          const valorOriginal = campo === 'capacidadeUtilL' ? Number(pontoOriginal[campo]) : pontoOriginal[campo]
          return ponto[campo] !== valorOriginal
        })
        .map((campo) => [campo, ponto[campo]]))
      if (Object.keys(alteracoes).length) await atualizarPontoReserva(pontoOriginal.id, alteracoes, senha)
    } else {
      await criarPontoReserva(ponto, senha)
    }
    await carregarPontos()
  }

  /** Remove um ponto e sincroniza a lista com a API. */
  const removerPonto = async (identificador) => {
    await excluirPontoReserva(identificador, senha)
    await carregarPontos()
  }

  return { pontos, carregandoPontos, erroPontos, carregarPontos, salvarPonto, removerPonto, limparPontos }
}
