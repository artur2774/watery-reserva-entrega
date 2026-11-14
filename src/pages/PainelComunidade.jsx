/** Painel ligado à telemetria pública e ao CRUD protegido da API Reserva. */
import { useState } from 'react'
import { AvisoDados } from '../components/AvisoDados'
import { CampoRotuloFlutuante } from '../components/CampoRotuloFlutuante'
import { FormularioPonto } from '../components/FormularioPonto'
import { TabelaMonitoramento } from '../components/TabelaMonitoramento'
import { BotaoFluxo } from '../components/ui/BotaoFluxo'
import { TextoBlurReveal } from '../components/ui/TextoBlurReveal'
import { usePontosMonitorados } from '../hooks/usePontosMonitorados'
import { useTelemetriaReserva } from '../hooks/useTelemetriaReserva'
import '../styles/dashboard.css'

/** Apresenta as últimas leituras e administra pontos pela API da equipe. */
export function PainelComunidade({ aoVoltar }) {
  const [senha, definirSenha] = useState('')
  const [senhaDigitada, definirSenhaDigitada] = useState('')
  const [formularioAberto, definirFormularioAberto] = useState(false)
  const [pontoEmEdicao, definirPontoEmEdicao] = useState(null)
  const [aviso, definirAviso] = useState('')
  const [salvandoPonto, definirSalvandoPonto] = useState(false)
  const { telemetria, carregandoTelemetria, erroTelemetria, atualizarTelemetria } = useTelemetriaReserva()
  const estadoPontos = usePontosMonitorados(senha)
  const { pontos, carregandoPontos, erroPontos, carregarPontos, salvarPonto, removerPonto, limparPontos } = estadoPontos

  /** Mantém a senha somente em memória enquanto esta tela está montada. */
  const autenticar = (evento) => {
    evento.preventDefault()
    if (!senhaDigitada.trim()) return
    definirSenha(senhaDigitada)
    definirSenhaDigitada('')
  }

  /** Salva um ponto e informa sucesso apenas depois da sincronização com a API. */
  const tratarSalvamento = async (ponto) => {
    definirSalvandoPonto(true)

    try {
      await salvarPonto(ponto, pontoEmEdicao)
      definirFormularioAberto(false)
      definirAviso(pontoEmEdicao ? 'Alterações sincronizadas com a API.' : 'Ponto cadastrado na API.')
    } finally {
      definirSalvandoPonto(false)
    }
  }

  /** Pede confirmação antes de excluir um registro remoto. */
  const tratarRemocao = async (ponto) => {
    if (!window.confirm(`Remover o ponto ${ponto.nome} da API?`)) return

    try {
      await removerPonto(ponto.id)
      definirAviso('Ponto removido da API.')
    } catch {
      definirAviso('Não foi possível remover o ponto. Confira a autenticação e tente novamente.')
    }
  }

  /** Formata dados ausentes e sinaliza leitura inválida conforme o contrato remoto. */
  const exibirValor = (valor, unidade = '') => valor == null ? 'Indisponível' : `${valor}${unidade}`
  const rotuloEstado = telemetria?.estado === 'invalido'
    ? 'Leitura inválida'
    : telemetria?.estado ?? 'Indisponível'
  const valoresResumo = [
    { rotulo: 'Volume útil', valor: exibirValor(telemetria?.volumeUtilL, ' L') },
    { rotulo: 'Autonomia', valor: exibirValor(telemetria?.autonomiaH, ' h') },
    { rotulo: 'Vazão de entrada', valor: exibirValor(telemetria?.vazaoEntradaLh, ' L/h') },
    { rotulo: 'Vazão de saída', valor: exibirValor(telemetria?.vazaoSaidaLh, ' L/h') },
    { rotulo: 'Estado', valor: rotuloEstado },
  ]

  /* Reúne telemetria, aviso de origem dos dados e gestão de pontos. */
  return (
    <div className="painel-aplicacao">
      <header className="painel-navegacao">
        <BotaoFluxo type="button" onClick={aoVoltar}>
          <TextoBlurReveal as="span">Voltar à apresentação</TextoBlurReveal>
        </BotaoFluxo>
        <TextoBlurReveal as="span">PAINEL WATERY · API REST</TextoBlurReveal>
      </header>

      <main className="painel-conteudo">
        <section className="painel-abertura">
          <TextoBlurReveal as="p">RESERVA PRINCIPAL · RESERVA-001</TextoBlurReveal>
          <TextoBlurReveal as="h1">Leitura e pontos monitorados</TextoBlurReveal>
          <TextoBlurReveal as="span">Telemetria pública da reserva e cadastro de pontos pela API da equipe.</TextoBlurReveal>
          <BotaoFluxo className="botao-adicionar" type="button" onClick={atualizarTelemetria} disabled={carregandoTelemetria}>
            <TextoBlurReveal as="span">{carregandoTelemetria ? 'Atualizando…' : 'Atualizar leitura'}</TextoBlurReveal>
          </BotaoFluxo>
        </section>

        <section className="resumo-comunidade secao-interativa" aria-labelledby="titulo-leitura" aria-live="polite">
          <div className="titulo-secao-painel">
            <div>
              <TextoBlurReveal as="p">TELEMETRIA SEM LOGIN</TextoBlurReveal>
              <TextoBlurReveal as="h2" id="titulo-leitura">Última leitura</TextoBlurReveal>
            </div>
            {telemetria?.timestamp && (
              <TextoBlurReveal as="span">{new Date(telemetria.timestamp).toLocaleString('pt-BR')}</TextoBlurReveal>
            )}
          </div>
          {erroTelemetria && <TextoBlurReveal as="p" className="form-error" role="alert">{erroTelemetria}</TextoBlurReveal>}
          <dl>
            {valoresResumo.map(({ rotulo, valor }) => (
              <div key={rotulo}>
                <TextoBlurReveal as="dt">{rotulo}</TextoBlurReveal>
                <TextoBlurReveal as="dd">{carregandoTelemetria ? 'Carregando…' : valor}</TextoBlurReveal>
              </div>
            ))}
          </dl>
        </section>

        <AvisoDados />

        <section className="secao-pontos secao-interativa" id="pontos">
          <div className="titulo-secao-painel">
            <div>
              <TextoBlurReveal as="p">GESTÃO DE PONTOS · HTTP BASIC</TextoBlurReveal>
              <TextoBlurReveal as="h2">Pontos monitorados</TextoBlurReveal>
            </div>
            <BotaoFluxo
              className="botao-adicionar botao-secundario"
              type="button"
              disabled={!senha}
              onClick={() => { definirPontoEmEdicao(null); definirFormularioAberto(true) }}
            >
              <TextoBlurReveal as="span">Cadastrar ponto</TextoBlurReveal>
            </BotaoFluxo>
          </div>

          {!senha ? (
            <form className="formulario-senha" onSubmit={autenticar}>
              <TextoBlurReveal as="p">A senha é fornecida pela equipe e fica somente na memória desta sessão.</TextoBlurReveal>
              <div className="campos-autenticacao">
                <CampoRotuloFlutuante id="usuario-api" rotulo="Usuário" valor="reserva-web" somenteLeitura />
                <CampoRotuloFlutuante
                  id="senha-api"
                  rotulo="Senha da API"
                  tipo="password"
                  autocomplete="current-password"
                  valor={senhaDigitada}
                  aoAlterar={definirSenhaDigitada}
                />
              </div>
              <BotaoFluxo type="submit"><TextoBlurReveal as="span">Consultar pontos</TextoBlurReveal></BotaoFluxo>
            </form>
          ) : (
            <div className="linha-acoes-api">
              <TextoBlurReveal as="p">Usuário HTTP Basic: reserva-web; a senha permanece apenas nesta sessão.</TextoBlurReveal>
              <BotaoFluxo type="button" onClick={() => { definirSenha(''); definirSenhaDigitada(''); limparPontos() }}>
                <TextoBlurReveal as="span">Trocar senha</TextoBlurReveal>
              </BotaoFluxo>
              <BotaoFluxo type="button" onClick={() => carregarPontos().catch(() => {})}>
                <TextoBlurReveal as="span">Atualizar pontos</TextoBlurReveal>
              </BotaoFluxo>
            </div>
          )}

          {erroPontos && <TextoBlurReveal as="p" className="form-error" role="alert">{erroPontos}</TextoBlurReveal>}
          {senha && (
            <TabelaMonitoramento
              pontos={pontos}
              carregando={carregandoPontos}
              aoEditar={(ponto) => { definirPontoEmEdicao(ponto); definirFormularioAberto(true) }}
              aoRemover={tratarRemocao}
            />
          )}
        </section>

        <footer className="rodape-painel">
          <TextoBlurReveal as="span">Watery — FIAP Global Solution CitizenTech 2026</TextoBlurReveal>
          <TextoBlurReveal as="span">Telemetria e pontos consultados pela API informada pela equipe.</TextoBlurReveal>
        </footer>
      </main>

      {aviso && (
        <div className="aviso-flutuante" role="status">
          <TextoBlurReveal as="span">{aviso}</TextoBlurReveal>
          <BotaoFluxo type="button" onClick={() => definirAviso('')}>
            <TextoBlurReveal as="span">Fechar aviso</TextoBlurReveal>
          </BotaoFluxo>
        </div>
      )}
      {formularioAberto && (
        <FormularioPonto
          ponto={pontoEmEdicao}
          salvando={salvandoPonto}
          aoSalvar={tratarSalvamento}
          aoFechar={() => definirFormularioAberto(false)}
        />
      )}
    </div>
  )
}
