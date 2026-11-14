# Watery

Protótipo acadêmico da Global Solution CitizenTech 2026.2. A Watery ajuda famílias que dependem de reservatórios a acompanhar leituras de telemetria e propõe organizar evidências comunitárias sobre interrupções de abastecimento.

## O que esta versão faz

- Apresenta o problema, a proposta, os limites do escopo e os ODS relacionados (6, 10, 11 e 13).
- Consulta telemetria pública da reserva principal por API REST.
- Oferece login HTTP Basic para consultar, cadastrar, editar e excluir pontos monitorados.
- Mantém senha apenas em memória durante a tela do painel e trata leituras ausentes ou inválidas.
- Usa React, Vite, Tailwind CSS v4 e componentes reutilizáveis, com lógica organizada em hooks e serviço HTTP.

A aplicação não se conecta diretamente ao FIWARE nem ao Orion. A tela de painel implementa gestão de pontos conforme a API existente do grupo; não representa um CRUD de residências e ocorrências, nem um mapa/ranking por rua.

## Requisitos das disciplinas

A estrutura atual demonstra React com Vite, Tailwind CSS, mais de oito componentes reutilizáveis, `useState`, `useEffect`, dois custom hooks, separação entre páginas, estado e chamadas HTTP e operações GET/POST/PATCH/DELETE do recurso de pontos. O documento `AI.md` descreve o apoio de IA desta versão.

Itens que ainda exigem ação da equipe antes da entrega:

- Registrar pelo menos 15 commits significativos no histórico Git. Não criar commits artificiais.
- Validar o CRUD com a API e as credenciais fornecidas pela equipe.
- Confirmar com os professores se o escopo de pontos atende ao requisito de CRUD, pois o briefing sugere residência e ocorrência.
- Se o grupo mantiver o mapa comunitário, implementar agregação anonimizada com limiar mínimo de casas e verificar privacidade. Essa funcionalidade não está implementada nesta versão.
- Completar a ficha CitizenTech com cidade/bairro e cidadão confirmado por entrevista. Não inserir dados pessoais reais.
- Revisar AI.md com as interações e validações realizadas por todos os integrantes.
- Preparar ZIP, deploy e acessos de escrita ao repositório para os professores.

## Tecnologias

- Node.js
- pnpm
- React 19
- Vite
- Tailwind CSS 4

## Instalação e execução

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Scripts disponíveis: `pnpm dev`, `pnpm build`, `pnpm lint` e `pnpm preview`.

## API

O navegador usa caminhos relativos sob `/reserva/api`. O Vite encaminha esses caminhos à API da equipe durante o desenvolvimento e `vercel.json` define o rewrite do deploy.

| Operação | Caminho | Acesso |
| --- | --- | --- |
| Consultar telemetria | `GET /reserva/api/telemetria/reserva-001` | Público |
| Consultar pontos | `GET /reserva/api/pontos` | HTTP Basic |
| Criar ponto | `POST /reserva/api/pontos` | HTTP Basic |
| Atualizar ponto | `PATCH /reserva/api/pontos/{id}` | HTTP Basic |
| Excluir ponto | `DELETE /reserva/api/pontos/{id}` | HTTP Basic |

A senha não é gravada no armazenamento do navegador. A disponibilidade e o comportamento da API precisam ser confirmados pela equipe.

## Arquitetura do código

O código está agrupado por função do sistema. A landing page foi dividida em componentes independentes para que cada seção seja encontrada e editada sem percorrer um único arquivo extenso.

| Pasta / arquivo | Responsabilidade |
| --- | --- |
| `src/main.jsx` | Inicialização do React e importação dos estilos globais. |
| `src/app/Aplicacao.jsx` | Navegação entre landing page e painel. |
| `src/features/landing/PaginaInicial.jsx` | Ordem das seções, cabeçalho e vida da landing page. |
| `src/features/landing/sections/AberturaApresentacao.jsx` | Seção inicial e chamadas para ação. |
| `src/features/landing/sections/SecaoDesafio.jsx` | Desafio cidadão abordado. |
| `src/features/landing/sections/SecaoProposta.jsx` | Etapas da proposta. |
| `src/features/landing/sections/SecaoIntegracaoApi.jsx` | Integração e caminhos da API. |
| `src/features/landing/sections/SecaoDecisoes.jsx` | Decisões de privacidade e comunicação. |
| `src/features/landing/sections/SecaoImpacto.jsx` | Impacto e ODS relacionados. |
| `src/features/landing/sections/SecaoEtapas.jsx` | Roadmap do projeto. |
| `src/features/landing/sections/RodapeApresentacao.jsx` | Rodapé da apresentação. |
| `src/features/landing/styles/landing.css` | Identidade visual da landing page. |
| `src/features/painel/` | Painel, formulários, tabela, estado e integração REST. |
| `src/shared/components/` | Marca e componentes visuais compartilhados, inclusive os padrões Spell UI. |
| `src/shared/styles/base.css` | Tailwind CSS e estilos e tokens globais. |
| `eslint.config.js` | Regras ESLint para JavaScript, JSX e hooks do React. |

### Ambiente da API

Copie `.env.example` para `.env` e ajuste `VITE_API_BASE_URL` e `API_PROXY_TARGET` para o ambiente autorizado pela equipe. Não coloque senhas, tokens ou credenciais em variáveis `VITE_*`, pois elas podem ser expostas no navegador. O usuário HTTP Basic e a senha de gestão continuam sendo informados na tela e guardados apenas na memória da sessão.

O projeto usa JSX com React e Vite. O ESLint valida os hooks e variáveis; as configurações de `.vscode/` sugerem a extensão oficial do ESLint e mantêm indentação de dois espaços.
