# Watery

Aplicação web acadêmica da Global Solution CitizenTech: uma landing page apresenta a proposta e o painel acompanha uma reserva doméstica por meio da API REST da equipe. A interface não se conecta diretamente ao FIWARE nem ao Orion.

## Fluxo da aplicação

1. `src/main.jsx` inicializa React e importa a base visual global.
2. `src/App.jsx` controla a navegação entre apresentação e painel.
3. `src/pages/PaginaInicial.jsx` compõe as seções da landing page: desafio, proposta, API, decisões, etapas futuras e rodapé.
4. O botão “Acompanhar uma reserva” abre `src/pages/PainelComunidade.jsx`.
5. `src/hooks/useTelemetriaReserva.js` consulta a última leitura pública; `src/hooks/usePontosMonitorados.js` controla listagem e CRUD autenticado dos pontos.
6. `src/services/apiReserva.js` contém as chamadas HTTP e a montagem do Basic Auth. A senha é mantida em memória pela tela e não é persistida.
7. Os componentes em `src/components/` montam formulários, campos, tabelas, avisos e controles reutilizáveis.

## Onde editar

| O que editar | Arquivo |
| --- | --- |
| Navegação entre telas | `src/App.jsx` |
| Texto e seções da landing page | `src/pages/PaginaInicial.jsx` |
| Painel, estados e mensagens | `src/pages/PainelComunidade.jsx` |
| Acesso e contrato da API | `src/services/apiReserva.js` |
| Estado de telemetria | `src/hooks/useTelemetriaReserva.js` |
| Estado e operações de pontos | `src/hooks/usePontosMonitorados.js` |
| Formulário, campos, avisos e tabela | `src/components/` |
| Blur Reveal e Flow Button | `src/components/ui/` e `src/index.css` |
| Identidade da landing page | `src/styles/landing.css` |
| Identidade do dashboard | `src/styles/dashboard.css` |
| Tailwind, estilos base e acessibilidade | `src/index.css` |
| Título, idioma e favicon | `index.html` e `public/favicon.svg` |
| Proxy local e scripts de build | `vite.config.js` e `package.json` |

## Requisitos mínimos da disciplina

| Requisito | Situação neste MVP | Evidência / falta |
| --- | --- | --- |
| React com Next.js ou Vite | Atendido | React + Vite em `package.json` e `vite.config.js`. |
| Tailwind CSS | Atendido | Tailwind v4 via `@tailwindcss/vite` e import em `src/index.css`. |
| Pelo menos 8 componentes React reutilizáveis | Atendido | Há oito componentes reutilizáveis em `src/components/` e `src/components/ui/`. |
| `useState` e `useEffect` | Atendido | Fluxos de painel, pontos e telemetria. |
| Pelo menos 2 custom hooks | Atendido | `usePontosMonitorados` e `useTelemetriaReserva`. |
| Separar interface, lógica e dados | Atendido na arquitetura atual | Telas em `pages`, regras de estado em `hooks`, HTTP em `services`. |
| API externa com CRUD | Implementado; validação remota pendente | GET/POST/PATCH/DELETE estão em `apiReserva.js`; validar credenciais e respostas com o servidor disponível. |
| Funcionalidade ligada ao tema | MVP implementado | Leitura da reserva e gestão de pontos monitorados. |
| Git com no mínimo 15 commits significativos | Pendente | O histórico remoto conferido contém apenas o scaffold inicial até o início destas alterações. Registrar mudanças reais em commits semânticos, sem fracionar artificialmente. |
| Repositório privado e acessível aos professores | Pendente de configuração | A URL configurada é `https://github.com/joao-jps/watery-reserva`; confirmar a visibilidade privada e adicionar os professores com acesso de escrita. |
| README com execução e descrição | Atendido neste arquivo | Este documento descreve fluxo, locais de edição e comandos. |
| `AI.md` na raiz | Parcial | Arquivo existe; o grupo precisa completar prompts reais, ferramentas, trechos afetados, validação e análise crítica. |
| Deploy e ZIP | Pendente | Configuração de rewrite Vercel existe; publicar, validar e gerar o ZIP final ainda são necessários. |
| Leitura da rubrica completa dos PDFs | Pendente | Os PDFs citados anteriormente não estão disponíveis no diretório do projeto; as imagens recebidas cobrem os requisitos mínimos acima. |

> A tela atual cobre a maior parte do MVP técnico. As evidências de GitHub, acesso dos professores, execução real da API, deploy, ZIP e documentação de IA precisam ser concluídas para afirmar a entrega integral.

## API

O navegador usa caminhos relativos. Em desenvolvimento, `vite.config.js` encaminha `/reserva/api` para `https://184.192.182.39`; `vercel.json` configura o rewrite para deploy.

| Operação | Caminho | Acesso |
| --- | --- | --- |
| GET | `/reserva/api/telemetria/reserva-001` | Público, sem login. |
| GET | `/reserva/api/pontos` | HTTP Basic. |
| POST | `/reserva/api/pontos` | HTTP Basic; envia `id`, `nome`, `capacidadeUtilL`, `deviceId`. |
| PATCH | `/reserva/api/pontos/{id}` | HTTP Basic; envia apenas campos alterados. |
| DELETE | `/reserva/api/pontos/{id}` | HTTP Basic. |

Valores nulos são exibidos como “Indisponível”; estado `invalido` aparece como “Leitura inválida”. A comunicação com o host não pôde ser verificada nesta sessão; confirme o comportamento com a API disponível e as credenciais fornecidas pela equipe.

## Animações e interação

| Efeito | Local |
| --- | --- |
| Texto Blur Reveal ao rolar | `src/components/ui/TextoBlurReveal.jsx` e `src/index.css` |
| Flow Button e contorno no hover/foco | `src/components/ui/BotaoFluxo.jsx` e `src/index.css` |
| Campos com rótulo flutuante | `src/components/CampoRotuloFlutuante.jsx` e `src/styles/dashboard.css` |
| Fundo, gradientes e hover das seções | `src/styles/landing.css` e `src/styles/dashboard.css` |
| Linhas de seção no scroll | `src/pages/PaginaInicial.jsx` com GSAP/ScrollTrigger carregados em `index.html` |

As animações respeitam `prefers-reduced-motion`. Referências: [Blur Reveal](https://spell.sh/docs/blur-reveal), [Label Input](https://spell.sh/docs/label-input) e [Flow Button](https://spell.sh/docs/flow-button).

## Instalação e execução

Requer Node.js e pnpm.

```bash
pnpm install
pnpm dev
```

Verificações locais disponíveis:

```bash
pnpm lint
pnpm build
```

## Estrutura

```text
public/favicon.svg               Ícone da aplicação
src/components/                  Blocos reutilizáveis da interface
src/components/ui/               Animações e controles visuais
src/hooks/                       Estado e regras de interação
src/pages/                       Landing page e painel
src/services/                    Comunicação HTTP com a API
src/styles/                      Estilos específicos das telas
src/App.jsx                      Alternância entre telas
src/index.css                    Tailwind e estilos compartilhados
vite.config.js                   Vite, Tailwind e proxy de desenvolvimento
vercel.json                      Rewrite da API no deploy
```

`dist/` é uma saída gerada por `pnpm build`, ignorada pelo Git e recriada quando necessário. `pnpm-lock.yaml` garante instalações repetíveis e deve ser versionado.
