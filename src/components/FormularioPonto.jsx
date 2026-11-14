/** Formulário Spell UI de cadastro e edição conforme o contrato da API Reserva. */
import { useState } from 'react'
import { BotaoFluxo } from './ui/BotaoFluxo'
import { TextoBlurReveal } from './ui/TextoBlurReveal'
import { CampoRotuloFlutuante } from './CampoRotuloFlutuante'

/** Prepara valores de edição sem modificar o objeto retornado pelo serviço. */
function prepararFormulario(ponto) {
  if (!ponto) return { id: '', nome: '', capacidadeUtilL: '', deviceId: '' }

  return {
    id: ponto.id ?? '',
    nome: ponto.nome ?? '',
    capacidadeUtilL: String(ponto.capacidadeUtilL ?? ''),
    deviceId: ponto.deviceId ?? '',
  }
}

/**
 * Coleta, valida e envia os campos permitidos para criar ou editar um ponto.
 * @param {{ ponto: object|null, aoSalvar: (ponto: object) => Promise<void>, aoFechar: () => void, salvando?: boolean }} propriedades Ponto atual e ações da tela.
 */
export function FormularioPonto({ ponto, aoSalvar, aoFechar, salvando = false }) {
  const [formulario, definirFormulario] = useState(() => prepararFormulario(ponto))
  const [mensagemErro, definirMensagemErro] = useState('')

  /** Atualiza somente o campo digitado e preserva os outros valores locais. */
  const alterarCampo = (campo, valor) => {
    definirFormulario((formularioAtual) => ({ ...formularioAtual, [campo]: valor }))
  }

  /** Valida os dados e converte capacidade antes de entregar ao serviço da API. */
  const enviarFormulario = async (evento) => {
    evento.preventDefault()

    if (!formulario.id.trim() || !formulario.nome.trim() || !formulario.deviceId.trim() || Number(formulario.capacidadeUtilL) <= 0) {
      definirMensagemErro('Informe ID, nome, capacidade em litros e ID do dispositivo.')
      return
    }

    try {
      await aoSalvar({
        ...formulario,
        id: formulario.id.trim(),
        nome: formulario.nome.trim(),
        deviceId: formulario.deviceId.trim(),
        capacidadeUtilL: Number(formulario.capacidadeUtilL),
      })
      aoFechar()
    } catch {
      definirMensagemErro('A API não concluiu a operação. Revise os dados e tente novamente.')
    }
  }

  /* Fecha ao tocar fora do formulário e mantém o foco sem alterar dados remotos. */
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(evento) => evento.target === evento.currentTarget && aoFechar()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="titulo-formulario">
        <BotaoFluxo className="modal-close" type="button" onClick={aoFechar}>
          <TextoBlurReveal as="span">Fechar</TextoBlurReveal>
        </BotaoFluxo>
        <TextoBlurReveal as="span" className="eyebrow">PONTOS DA API</TextoBlurReveal>
        <TextoBlurReveal as="h2" id="titulo-formulario">{ponto ? 'Editar ponto' : 'Cadastrar ponto'}</TextoBlurReveal>
        <TextoBlurReveal as="p" className="modal-intro">
          Os dados são enviados à API da equipe. Não informe nomes ou endereços pessoais.
        </TextoBlurReveal>
        <form onSubmit={enviarFormulario} noValidate>
          <CampoRotuloFlutuante
            id="id-ponto"
            rotulo="ID do ponto"
            valor={formulario.id}
            aoAlterar={(valor) => alterarCampo('id', valor)}
            placeholder="ponto-001"
            obrigatorio
            desabilitado={Boolean(ponto)}
          />
          <CampoRotuloFlutuante
            id="nome-ponto"
            rotulo="Nome"
            valor={formulario.nome}
            aoAlterar={(valor) => alterarCampo('nome', valor)}
            placeholder="Caixa principal"
            obrigatorio
          />
          <CampoRotuloFlutuante
            id="capacidade-ponto"
            rotulo="Capacidade útil em litros"
            tipo="number"
            valor={formulario.capacidadeUtilL}
            aoAlterar={(valor) => alterarCampo('capacidadeUtilL', valor)}
            placeholder="500"
            minimo={1}
            obrigatorio
          />
          <CampoRotuloFlutuante
            id="dispositivo-ponto"
            rotulo="ID do dispositivo"
            valor={formulario.deviceId}
            aoAlterar={(valor) => alterarCampo('deviceId', valor)}
            placeholder="reserva-001"
            obrigatorio
          />
          {mensagemErro && <TextoBlurReveal as="p" className="form-error" role="alert">{mensagemErro}</TextoBlurReveal>}
          <div className="modal-actions">
            <BotaoFluxo className="button button-light" type="button" onClick={aoFechar}>
              <TextoBlurReveal as="span">Cancelar</TextoBlurReveal>
            </BotaoFluxo>
            <BotaoFluxo className="button button-primary" type="submit" disabled={salvando}>
              <TextoBlurReveal as="span">{salvando ? 'Enviando…' : 'Salvar ponto'}</TextoBlurReveal>
            </BotaoFluxo>
          </div>
        </form>
      </section>
    </div>
  )
}
