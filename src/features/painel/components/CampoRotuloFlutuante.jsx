/** Campo inspirado no Label Input Spell UI com label persistente e senha visível opcional. */
import { useState } from 'react'
import { BotaoFluxo } from '../../../shared/components/ui/BotaoFluxo'
import { TextoBlurReveal } from '../../../shared/components/ui/TextoBlurReveal'

/**
 * Mantém o rótulo visível e encaminha as alterações sem controlar dados da API.
 * @param {{ id: string, rotulo: string, valor: string, aoAlterar?: (valor: string) => void, tipo?: string, somenteLeitura?: boolean, autocomplete?: string, placeholder?: string, obrigatorio?: boolean, desabilitado?: boolean, minimo?: number, passo?: number, className?: string }} propriedades Configuração do campo.
 */
export function CampoRotuloFlutuante({
  id,
  rotulo,
  valor,
  aoAlterar,
  tipo = 'text',
  somenteLeitura = false,
  autocomplete,
  placeholder = '',
  obrigatorio = !somenteLeitura,
  desabilitado = false,
  minimo,
  passo,
  className = '',
}) {
  const [senhaVisivel, definirSenhaVisivel] = useState(false)
  const campoEhSenha = tipo === 'password'
  const tipoEfetivo = campoEhSenha && senhaVisivel ? 'text' : tipo

  /** Alterna a visualização local sem alterar ou persistir o valor digitado. */
  const alternarVisibilidade = () => definirSenhaVisivel((visivel) => !visivel)

  /* Apresenta rótulo flutuante, campo nativo e controle de senha opcional. */
  return (
    <div className={`campo-rotulo-flutuante ${somenteLeitura ? 'campo-somente-leitura' : ''} ${className}`.trim()}>
      <label htmlFor={id} className="campo-rotulo-texto">
        <TextoBlurReveal as="span">{rotulo}</TextoBlurReveal>
      </label>
      <div className="campo-rotulo-entrada">
        <input
          id={id}
          type={tipoEfetivo}
          value={valor}
          onChange={(evento) => aoAlterar?.(evento.target.value)}
          readOnly={somenteLeitura}
          disabled={desabilitado}
          autoComplete={autocomplete}
          placeholder={placeholder}
          required={obrigatorio}
          min={minimo}
          step={passo}
          aria-label={rotulo}
        />
        {campoEhSenha && (
          <BotaoFluxo
            className="botao-visibilidade-senha"
            type="button"
            onClick={alternarVisibilidade}
            aria-label={senhaVisivel ? 'Ocultar senha' : 'Mostrar senha'}
            aria-pressed={senhaVisivel}
          >
            <TextoBlurReveal as="span">{senhaVisivel ? 'Ocultar' : 'Mostrar'}</TextoBlurReveal>
          </BotaoFluxo>
        )}
      </div>
    </div>
  )
}
