/** Acesso HTTP à API da Reserva; nenhuma credencial é persistida neste módulo. */

/** Prefixo HTTP configurável para apontar o cliente ao ambiente da equipe. */
const CAMINHO_API = import.meta.env.VITE_API_BASE_URL || '/reserva/api'
const USUARIO_API = 'reserva-web'
const TEMPO_LIMITE_MS = 12000

/** Impede a tela de permanecer carregando se a API estiver fora do ar. */
async function requisitarComLimite(caminho, opcoes) {
  const controlador = new window.AbortController()
  let temporizador
  const tempoLimite = new Promise((_, rejeitar) => {
    temporizador = window.setTimeout(() => {
      controlador.abort()
      rejeitar(new Error('A API excedeu o tempo de resposta.'))
    }, TEMPO_LIMITE_MS)
  })
  try {
    return await Promise.race([window.fetch(caminho, { ...opcoes, signal: controlador.signal }), tempoLimite])
  } finally {
    window.clearTimeout(temporizador)
  }
}

/**
 * Monta os cabeçalhos de autenticação Basic apenas para as operações protegidas.
 * @param {string} senha Senha digitada na sessão atual pelo operador.
 * @returns {HeadersInit} Cabeçalhos HTTP sem armazenar a credencial.
 */
function criarCabecalhosAutenticados(senha) {
  // Codifica UTF-8 antes de Base64 para aceitar senhas com caracteres acentuados.
  const credenciais = new window.TextEncoder().encode(`${USUARIO_API}:${senha}`)
  const credenciaisBinarias = Array.from(credenciais, (byte) => String.fromCharCode(byte)).join('')

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Basic ${window.btoa(credenciaisBinarias)}`,
  }
}

/** Converte respostas não exitosas em mensagens úteis para a interface. */
async function verificarResposta(resposta) {
  if (resposta.ok) {
    if (resposta.status === 204) return null
    const corpo = await resposta.text()
    if (!corpo) return null
    try {
      return JSON.parse(corpo)
    } catch {
      return corpo
    }
  }
  const detalhe = await resposta.text().catch(() => '')
  const erro = new Error(detalhe || `A API respondeu com o status ${resposta.status}.`)
  erro.status = resposta.status
  throw erro
}

/** Busca a leitura mais recente da reserva principal sem exigir autenticação. */
export async function buscarTelemetriaReserva() {
  const resposta = await requisitarComLimite(`${CAMINHO_API}/telemetria/reserva-001`, { headers: { Accept: 'application/json' } })
  return verificarResposta(resposta)
}

/** Busca até 50 leituras públicas, da mais recente à mais antiga. */
export async function buscarHistoricoTelemetriaReserva() {
  const resposta = await requisitarComLimite(
    `${CAMINHO_API}/telemetria/reserva-001/historico?limite=50`,
    { headers: { Accept: 'application/json' } },
  )
  const leituras = await verificarResposta(resposta)

  if (!Array.isArray(leituras)) {
    throw new Error('A API retornou um formato inválido para o histórico.')
  }

  return leituras
}

/** Busca os pontos cadastrados usando HTTP Basic Auth. */
export async function listarPontosReserva(senha) {
  const resposta = await requisitarComLimite(`${CAMINHO_API}/pontos`, { headers: criarCabecalhosAutenticados(senha) })
  return verificarResposta(resposta)
}

/** Cadastra um ponto com os campos definidos no contrato da API. */
export async function criarPontoReserva(ponto, senha) {
  const resposta = await requisitarComLimite(`${CAMINHO_API}/pontos`, {
    method: 'POST', headers: criarCabecalhosAutenticados(senha), body: JSON.stringify(ponto),
  })
  return verificarResposta(resposta)
}

/** Envia apenas propriedades realmente alteradas em um ponto existente. */
export async function atualizarPontoReserva(identificador, alteracoes, senha) {
  const resposta = await requisitarComLimite(`${CAMINHO_API}/pontos/${encodeURIComponent(identificador)}`, {
    method: 'PATCH', headers: criarCabecalhosAutenticados(senha), body: JSON.stringify(alteracoes),
  })
  return verificarResposta(resposta)
}

/** Exclui um ponto pelo identificador informado na rota. */
export async function excluirPontoReserva(identificador, senha) {
  const resposta = await requisitarComLimite(`${CAMINHO_API}/pontos/${encodeURIComponent(identificador)}`, {
    method: 'DELETE', headers: criarCabecalhosAutenticados(senha),
  })
  return verificarResposta(resposta)
}
