import { formatarEstado } from '../../shared/telemetria'
/** Painel ligado à telemetria pública e ao CRUD protegido da API Reserva. */
import { useState } from 'react'
import { AvisoDados } from './components/AvisoDados'
import { CampoRotuloFlutuante } from './components/CampoRotuloFlutuante'
import { FormularioPonto } from './components/FormularioPonto'
import { TabelaMonitoramento } from './components/TabelaMonitoramento'
import { MedidorNivel } from './components/MedidorNivel'
import { HistoricoLeituras } from './components/HistoricoLeituras'
import { BotaoFluxo } from '../../shared/components/ui/BotaoFluxo'
import { TextoBlurReveal } from '../../shared/components/ui/TextoBlurReveal'
import { LogoWatery } from '../../shared/components/LogoWatery'
import { usePontosMonitorados } from './hooks/usePontosMonitorados'
import { useTelemetriaReserva } from './hooks/useTelemetriaReserva'
import './styles/dashboard.css'

/** Apresenta as últimas leituras e administra pontos pela API da equipe. */
export function PainelComunidade({ aoVoltar }) {
  const [senha, definirSenha] = useState('')
  const [senhaDigitada, definirSenhaDigitada] = useState('')
  const [formularioAberto, definirFormularioAberto] = useState(false)
  const [pontoEmEdicao, definirPontoEmEdicao] = useState(null)
  const [aviso, definirAviso] = useState('')
  const [salvandoPonto, definirSalvandoPonto] = useState(false)
  const {
    telemetria,
    historico,
    carregandoTelemetria,
    erroTelemetria,
    atualizarTelemetria,
    carregandoHistorico,
    erroHistorico,
  } = useTelemetriaReserva({ incluirHistorico: true })
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
  const rotuloEstado = formatarEstado(telemetria?.estado)
  const valoresResumo = [
    { rotulo: 'Volume útil', valor: exibirValor(telemetria?.volumeUtilL, ' L') },
    { rotulo: 'Autonomia', valor: exibirValor(telemetria?.autonomiaH, ' h') },
    { rotulo: 'Vazão de entrada', valor: exibirValor(telemetria?.vazaoEntradaLh, ' L/h') },
    { rotulo: 'Vazão de saída', valor: exibirValor(telemetria?.vazaoSaidaLh, ' L/h') },
    { rotulo: 'Estado', valor: rotuloEstado },
  ]
  const pontoDoDispositivo = pontos.find(({ deviceId }) => deviceId === telemetria?.deviceId)

  /* Reúne telemetria, aviso de origem dos dados e gestão de pontos. */
  return (
    <div className="painel-aplicacao">
      <header className="painel-navegacao">
        <div className="painel-marca"><LogoWatery /><BotaoFluxo type="button" onClick={aoVoltar}>
          Voltar à apresentação
        </BotaoFluxo></div>
        <span>PAINEL WATERY API REST</span>
      </header>

      <main className="painel-conteudo">
        <section className="painel-abertura">
          <p>RESERVA PRINCIPAL RESERVA-001</p>
          <TextoBlurReveal as="h1">Leitura e pontos monitorados</TextoBlurReveal>
          <span>Telemetria pública da reserva e cadastro de pontos pela API da equipe.</span>
          <BotaoFluxo className="botao-adicionar" type="button" onClick={atualizarTelemetria} disabled={carregandoTelemetria}>
            {carregandoTelemetria ? 'Atualizando…' : 'Atualizar leitura'}
          </BotaoFluxo>
        </section>

        <section className="resumo-comunidade secao-interativa" aria-labelledby="titulo-leitura" aria-live="polite">
          <div className="titulo-secao-painel">
            <div>
              <p>TELEMETRIA SEM LOGIN</p>
              <TextoBlurReveal as="h2" id="titulo-leitura">Última leitura</TextoBlurReveal>
            </div>
            {telemetria?.timestamp && (
              <span>{new Date(telemetria.timestamp).toLocaleString('pt-BR')}</span>
            )}
          </div>
          {erroTelemetria && <p className="form-error" role="alert">{erroTelemetria}</p>}
          <dl>
            {valoresResumo.map(({ rotulo, valor }) => (
              <div key={rotulo}>
                <dt>{rotulo}</dt>
                <dd>{carregandoTelemetria ? 'Carregando…' : valor}</dd>
              </div>
            ))}
          </dl>
        </section>

        <MedidorNivel volume={telemetria?.volumeUtilL} capacidade={pontoDoDispositivo?.capacidadeUtilL} />
        <HistoricoLeituras leituras={historico} carregando={carregandoHistorico} erro={erroHistorico} />

        <AvisoDados />

        <section className="secao-pontos secao-interativa" id="pontos">
          <div className="titulo-secao-painel">
            <div>
              <p>GESTÃO DE PONTOS HTTP BASIC</p>
              <TextoBlurReveal as="h2">Pontos monitorados</TextoBlurReveal>
            </div>
            <BotaoFluxo
              className="botao-adicionar botao-secundario"
              type="button"
              disabled={!senha}
              onClick={() => { definirPontoEmEdicao(null); definirFormularioAberto(true) }}
            >
              Cadastrar ponto
            </BotaoFluxo>
          </div>

          {!senha ? (
            <form className="formulario-senha" onSubmit={autenticar}>
              <p>A senha é fornecida pela equipe e fica somente na memória desta sessão.</p>
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
              <BotaoFluxo type="submit">Consultar pontos</BotaoFluxo>
            </form>
          ) : (
            <div className="linha-acoes-api">
              <p>Usuário HTTP Basic: reserva-web; a senha permanece apenas nesta sessão.</p>
              <BotaoFluxo type="button" onClick={() => { definirSenha(''); definirSenhaDigitada(''); limparPontos() }}>
                Trocar senha
              </BotaoFluxo>
              <BotaoFluxo type="button" onClick={() => carregarPontos().catch(() => {})}>
                Atualizar pontos
              </BotaoFluxo>
            </div>
          )}

          {erroPontos && <p className="form-error" role="alert">{erroPontos}</p>}
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
          <span>Watery — FIAP Global Solution CitizenTech 2026</span>
          <span>Telemetria e pontos consultados pela API informada pela equipe.</span>
        </footer>
      </main>

      {aviso && (
        <div className="aviso-flutuante" role="status">
          <span>{aviso}</span>
          <BotaoFluxo type="button" onClick={() => definirAviso('')}>
            Fechar aviso
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
