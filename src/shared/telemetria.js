/** Rótulos compartilhados pela apresentação, painel e histórico. */
const ROTULOS_ESTADO = new Map([
  ['normal', 'Normal'],
  ['iniciando', 'Iniciando'],
  ['falha_sensor', 'Falha no sensor'],
  ['alerta_nivel', 'Alerta de nível'],
  ['sem_entrada', 'Sem entrada'],
  ['entrada_suspeita', 'Entrada suspeita'],
  ['sem_fluxo', 'Sem fluxo'],
  ['cheia', 'Cheia'],
  ['enchendo', 'Enchendo'],
  ['invalido', 'Leitura inválida'],
  ['atencao', 'Atenção'],
  ['critico', 'Crítico'],
  ['sem fluxo', 'Sem fluxo'],
])

export function formatarEstado(estado) {
  return ROTULOS_ESTADO.get(estado) || estado || 'Indisponível'
}

/** Limita a página ao total disponível, inclusive quando o histórico diminui. */
export function paginarLeituras(leituras, pagina, tamanho = 5) {
  const totalPaginas = Math.max(1, Math.ceil(leituras.length / tamanho))
  const paginaAtual = Math.min(Math.max(1, pagina), totalPaginas)
  const inicio = (paginaAtual - 1) * tamanho
  return { paginaAtual, totalPaginas, registros: leituras.slice(inicio, inicio + tamanho) }
}
