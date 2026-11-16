# Integração com a API Reserva

Este diretório mantém o contrato HTTP usado pelo painel. O serviço transforma o
contrato da equipe em funções JavaScript; os hooks de `../hooks/` coordenam
carregamento e estado, e os componentes de `../components/` apresentam os
resultados e as ações.

## Endereços e encaminhamento

- O navegador usa somente o prefixo relativo `/reserva/api`.
- Em desenvolvimento, `vite.config.js` encaminha esse prefixo para o destino
  definido por `API_PROXY_TARGET` (padrão: `https://184.192.182.39`).
- No deploy Vercel, `vercel.json` encaminha o mesmo prefixo à API externa.
- `VITE_API_BASE_URL` altera o prefixo consumido pelo serviço quando necessário.
- Nenhuma senha ou token deve ser incluído em `.env`, no código-fonte ou no
  armazenamento persistente do navegador.

## Operações

| Função do serviço | Método e caminho | Autenticação |
| --- | --- | --- |
| `buscarTelemetriaReserva` | `GET /reserva/api/telemetria/reserva-001` | Pública |
| `listarPontosReserva` | `GET /reserva/api/pontos` | HTTP Basic |
| `criarPontoReserva` | `POST /reserva/api/pontos` | HTTP Basic |
| `atualizarPontoReserva` | `PATCH /reserva/api/pontos/{id}` | HTTP Basic |
| `excluirPontoReserva` | `DELETE /reserva/api/pontos/{id}` | HTTP Basic |

O usuário de HTTP Basic é `reserva-web`. A senha é digitada no painel, fica
somente em estado React durante a sessão e só é enviada nas chamadas protegidas.
Edições enviam apenas diferenças entre `nome`, `capacidadeUtilL` e `deviceId`.

## Apresentação dos dados

- `volumeUtilL` é apresentado em litros; `autonomiaH`, em horas; e as vazões,
  em litros por hora.
- Valores `null` ou ausentes de vazão/autonomia são apresentados como
  “Indisponível”.
- O estado `invalido` é apresentado como “Leitura inválida”.
- A lista de pontos aceita `[]` como uma resposta válida sem cadastros.
- O serviço aceita respostas `204` sem conteúdo e converte HTTP não exitoso em
  erro para os hooks apresentarem uma mensagem contextual.

## Fluxo de chamada

```text
PainelComunidade.jsx
  └── useTelemetriaReserva.js / usePontosMonitorados.js
        └── apiReserva.js
              └── /reserva/api (proxy Vite ou rewrite Vercel)
```

## Validação remota

O ambiente desta execução bloqueou conexões de saída ao endereço informado. Por
isso, a chamada pública e as operações protegidas não foram confirmadas neste
ambiente. O CRUD está preparado conforme o contrato recebido; a equipe deve
validar o fluxo em rede autorizada e com a senha fornecida por ela.
