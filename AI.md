# Registro de uso de Inteligência Artificial

Este arquivo registra o apoio de IA durante a implementação. O grupo deve revisar este relato e complementá-lo com as interações e validações feitas por cada integrante antes da entrega.

## Ferramenta utilizada

- **ChatGPT Codex (OpenAI):** apoio para leitura da estrutura do projeto, implementação e revisão de React/JSX, organização de componentes e hooks, integração HTTP, correção visual, documentação e verificação de lint/build.
- **Spell UI:** referência pública de interface para Blur Reveal, Label Input e Flow Button. Os exemplos foram adaptados ao React e aos estilos locais; os componentes não dependem do pacote Spell UI em runtime.

## Interações representativas

- Pedido para construir a aplicação Watery com React, Vite e JavaScript/JSX, usando o desafio CitizenTech e separando interface, regras e dados.
- Pedido para manter Blur Reveal nos textos, aplicar Label Input aos campos, Flow Button aos botões e corrigir os textos duplicados e a seção de etapas.
- Pedido para documentar no README o fluxo, os locais de edição e o status frente à rubrica mínima da disciplina.

As respostas foram sugestões de implementação e documentação; não são evidência de validação dos requisitos acadêmicos nem de funcionamento da API remota.

## Aplicação no projeto

- Organização da interface em páginas e componentes React reutilizáveis.
- Implementação dos hooks `usePontosMonitorados` e `useTelemetriaReserva` para estado e lógica de interação.
- Implementação de `src/services/apiReserva.js` para GET, POST, PATCH e DELETE conforme o contrato informado pela equipe.
- Ajustes no Blur Reveal, no gradiente e no markup acessível para impedir que os rótulos fiquem visualmente duplicados.
- Documentação do fluxo e da rubrica em `README.md`.

## Validação e análise crítica

- **Verificações executadas:** `pnpm lint` e `pnpm build` concluíram com sucesso após as alterações.
- **Limitação observada:** a API externa não pôde ser acessada neste ambiente; nenhum resultado de CRUD remoto é declarado como validado.
- **Revisão humana necessária:** confirmar o comportamento com credenciais de teste, conferir conteúdo e rubrica oficial com os professores, revisar mensagens e validar a interface em dispositivos reais.
- **Benefícios:** acelera a exploração de alternativas e a criação de estrutura inicial e documentação.
- **Limitações:** uma resposta pode conter regressões visuais, pressupostos incorretos ou código que compila sem refletir fielmente a rubrica; por isso, o grupo deve revisar, executar e compreender o código antes de entregá-lo.
