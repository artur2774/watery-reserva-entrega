# Uso de Inteligência Artificial

Este registro descreve o apoio de IA recebido para esta versão do protótipo. 

## Ferramentas

- **ChatGPT Codex (OpenAI):** leitura dos requisitos dos PDFs, agrupamento e resumo de tópicos da estrutura existente, edição dos componentes React, auxilio do desenvolvimento da identidade visual e documentação.
- **Spell UI:** referência para os padrões de Blur Reveal, Flow Button e Label Input. O projeto contém adaptações locais desses padrões, sem dependência de runtime da Spell UI.

## Interação desta versão

- Solicitação: Auxiliar no desenvolvimento de uma aplicação do projeto Watery em React + JSX + VITE + ESLINT e Tailwind, com base no pdf de contexto da Reserva e nos requisitos de Front-end Design e Web Development; usar tons de azul e branco ao longo da aplicação, implementar favicon, hovers e animações lentas, padrões Spell UI e textos sem gradientes.
- Solicitação posterior: conectar o painel ao contrato HTTPS da API Reserva usando caminhos relativos, manter a senha HTTP Basic fora do código e sem novo commit até aprovação, organizar a documentação e aproximar o estilo já desenvolvido pela equipe ao desejado.
- A resposta adaptou o projeto existente, adicionou a marca SVG Watery e uma seção que explica os ODS relacionados ao projeto. O serviço e os hooks existentes foram revisados, a codificação de senha foi ajustada para UTF-8 e o contrato enviado pela equipe do painel foi documentado em `src/features/painel/services/API.md`.
- Implementar Animações e Hovers padrão Spell UI adaptados ao JavaScript além de uma animação da apresentando a marcar anteior a abertura da apresentação da landing page.
- Reutilizar componentes e estilização já desenvolvidos pela equipe ao longo da aplicação.
- Implementação da pasta .agents contendo pacotes para o auxilio do desenvolvimento da identidade visual. 

## Aplicação no projeto

- `src/shared/components/LogoWatery.jsx`: marca vetorial própria, criada como componente React.
- `src/features/landing/PaginaInicial.jsx`: inclusão da marca e da explicação de ODS 6, 10, 11 e 13, conforme o documento de contexto da Reserva.
- `src/features/painel/PainelComunidade.jsx`: presença da marca no cabeçalho do painel.
- `src/shared/styles/` e `src/features/*/styles/`: paleta de alto contraste, superfícies claras e interações de hover.
- A arquitetura foi reorganizada por função do sistema, mantendo a separação entre tela, estado e acesso à API.

## Validação e análise crítica

- Os PDFs e o código-fonte foram lidos para distinguir o briefing e as sugestões de produto dos critérios obrigatórios das disciplinas.
- **Verificações executadas nesta alteração:** `pnpm lint`, `pnpm build` e `npm run dev` concluíram com sucesso.
- **Não foram executados testes automatizados nem validação remota da API nesta versão.** A tentativa de chamada pública HTTPS foi bloqueada pela rede do ambiente; nenhuma senha foi solicitada ou usada.
- O CRUD documentado no serviço continua dependendo da API e credenciais da equipe; não afirmamos que as operações remotas tenham sido validadas.
- IA acelerou a leitura e a produção de alterações visuais. As respostas podem carregar pressupostos ou introduzir regressões; a equipe revisou os códigos produzidos, executou a aplicação e confirmou os requisitos antes da entrega.
