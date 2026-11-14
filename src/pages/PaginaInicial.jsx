/** Landing page informativa da Watery, com navegação para o painel da API. */
import { useEffect, useRef } from 'react'
import { BotaoFluxo } from '../components/ui/BotaoFluxo'
import { TextoBlurReveal } from '../components/ui/TextoBlurReveal'
import { TextoEmBrilho } from '../components/ui/TextoEmBrilho'
import { TextoOndaGradiente } from '../components/ui/TextoOndaGradiente'
import '../styles/landing.css'

/**
 * Explica o desafio, a proposta, a integração de dados e as etapas futuras.
 * @param {{ aoAbrirPainel: () => void }} propriedades Ação para abrir o painel.
 */
export function PaginaInicial({ aoAbrirPainel }) {
  const referenciaPagina = useRef(null)

  /* GSAP anima os separadores quando as seções chegam à área de leitura. */
  useEffect(() => {
    const motorGsap = window.gsap
    const gatilhoRolagem = window.ScrollTrigger
    const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let contextoAnimacao

    if (!reduzirMovimento && motorGsap && gatilhoRolagem) {
      motorGsap.registerPlugin(gatilhoRolagem)
      contextoAnimacao = motorGsap.context(() => {
        motorGsap.utils.toArray('.linha-gradiente-secao').forEach((linha) => {
          motorGsap.fromTo(linha, { scaleX: 0 }, {
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: linha.parentElement, start: 'top 82%' },
          })
        })
      }, referenciaPagina)
    }

    return () => contextoAnimacao?.revert()
  }, [])

  /* Renderiza a experiência editorial e mantém todos os textos com Blur Reveal. */
  return (
    <main ref={referenciaPagina} className="pagina-inicial min-h-screen text-center">
      <header className="navegacao mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-5 py-5 md:px-8">
        <p className="navegacao-contexto">
          <TextoBlurReveal as="span">FIAP · GLOBAL SOLUTION · CITIZENTECH</TextoBlurReveal>
        </p>
        <nav className="hidden items-center gap-7 text-sm md:flex" aria-label="Navegação principal">
          <a href="#desafio"><TextoBlurReveal as="span">Desafio</TextoBlurReveal></a>
          <a href="#solucao"><TextoBlurReveal as="span">Solução</TextoBlurReveal></a>
          <a href="#etapas"><TextoBlurReveal as="span">Etapas</TextoBlurReveal></a>
        </nav>
        <BotaoFluxo className="botao-secundario" type="button" onClick={aoAbrirPainel}>
          <TextoOndaGradiente>Ver painel</TextoOndaGradiente>
        </BotaoFluxo>
      </header>

      <section id="inicio" className="hero mx-auto flex max-w-6xl flex-col items-center px-5 py-24 md:px-8 md:py-36">
        <div className="hero-conteudo flex max-w-3xl flex-col items-center">
          <p className="sobretitulo">
            <span className="ponto-agua" aria-hidden="true" />
            <TextoBlurReveal as="span">TECNOLOGIA PARA CUIDAR DO QUE É ESSENCIAL</TextoBlurReveal>
          </p>
          <h1 className="titulo-hero mt-6">
            <TextoBlurReveal as="span" className="titulo-fragmento">A água que sustenta o dia a dia, </TextoBlurReveal>
            <TextoOndaGradiente>vista com clareza.</TextoOndaGradiente>
          </h1>
          <TextoBlurReveal as="p" className="descricao-hero mt-6">
            Watery transforma leituras de uma reserva doméstica em informação acessível para que famílias acompanhem o consumo e se preparem melhor.
          </TextoBlurReveal>
          <div className="acoes-hero mt-8 flex flex-wrap items-center justify-center gap-5">
            <BotaoFluxo className="botao-primario" type="button" onClick={aoAbrirPainel}>
              <TextoOndaGradiente>Acompanhar uma reserva</TextoOndaGradiente>
            </BotaoFluxo>
            <a href="#desafio" className="link-textual">
              <TextoBlurReveal as="span">Conhecer a proposta ↓</TextoBlurReveal>
            </a>
          </div>
          <TextoBlurReveal as="p" className="nota-hero mt-6">
            Protótipo acadêmico · leitura por API REST
          </TextoBlurReveal>
        </div>
      </section>

      <section id="desafio" className="secao-editorial secao-interativa mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <span className="linha-gradiente-secao" aria-hidden="true" />
        <p className="marcador-secao"><TextoEmBrilho>01 / O DESAFIO</TextoEmBrilho></p>
        <TextoBlurReveal as="h2">Quando falta informação, cada decisão pesa mais.</TextoBlurReveal>
        <TextoBlurReveal as="p" className="texto-secao">
          Oscilações no abastecimento e na pressão tornam difícil perceber quanto resta na caixa d’água. A proposta parte de uma necessidade cotidiana: dar visibilidade ao nível da reserva com uma leitura simples, compreensível e útil para quem mora ali.
        </TextoBlurReveal>
      </section>

      <section id="solucao" className="secao-fluxo secao-interativa mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <span className="linha-gradiente-secao" aria-hidden="true" />
        <p className="marcador-secao"><TextoEmBrilho>02 / A PROPOSTA</TextoEmBrilho></p>
        <TextoBlurReveal as="h2">Do reservatório à informação, em três passos.</TextoBlurReveal>
        <TextoBlurReveal as="p" className="texto-secao mx-auto">
          O painel consulta uma API REST da equipe. Ele não se conecta diretamente ao FIWARE nem ao Orion.
        </TextoBlurReveal>
        <ol className="etapas-visuais mt-12 grid gap-0 md:grid-cols-3">
          <li>
            <TextoBlurReveal as="span">01</TextoBlurReveal>
            <TextoBlurReveal as="strong">Medir</TextoBlurReveal>
            <TextoBlurReveal as="small">O dispositivo associado à reserva coleta sinais como volume e vazão.</TextoBlurReveal>
          </li>
          <li>
            <TextoBlurReveal as="span">02</TextoBlurReveal>
            <TextoBlurReveal as="strong">Organizar</TextoBlurReveal>
            <TextoBlurReveal as="small">A API REST recebe e disponibiliza leituras e cadastros para o produto.</TextoBlurReveal>
          </li>
          <li>
            <TextoBlurReveal as="span">03</TextoBlurReveal>
            <TextoBlurReveal as="strong">Compreender</TextoBlurReveal>
            <TextoBlurReveal as="small">A interface apresenta estado, autonomia e dados indisponíveis com clareza.</TextoBlurReveal>
          </li>
        </ol>
      </section>

      <section id="api" className="secao-api secao-interativa">
        <span className="linha-gradiente-secao" aria-hidden="true" />
        <div className="conteudo-api mx-auto flex max-w-4xl flex-col items-center px-5 py-16 md:px-8 md:py-24">
          <p className="marcador-secao"><TextoEmBrilho>03 / CAMADA DE DADOS</TextoEmBrilho></p>
          <TextoBlurReveal as="h2">A Watery conversa com a API da equipe.</TextoBlurReveal>
          <TextoBlurReveal as="p" className="descricao-api mt-5">
            A aplicação consulta leituras e administra pontos por caminhos relativos. A senha das operações protegidas é solicitada à pessoa usuária e mantida somente durante a sessão.
          </TextoBlurReveal>
          <BotaoFluxo className="botao-agua mt-7" type="button" onClick={aoAbrirPainel}>
            <TextoOndaGradiente>Abrir painel da API</TextoOndaGradiente>
            <span aria-hidden="true">↗</span>
          </BotaoFluxo>
          <p className="faixa-endpoint mt-8 font-mono text-xs">
            <TextoBlurReveal as="span">GET /reserva/api/telemetria/reserva-001</TextoBlurReveal>
            <br />
            <TextoBlurReveal as="span">GET · POST · PATCH · DELETE /reserva/api/pontos</TextoBlurReveal>
          </p>
        </div>
      </section>

      <section id="decisoes" className="secao-decisoes secao-interativa mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <span className="linha-gradiente-secao" aria-hidden="true" />
        <p className="marcador-secao"><TextoEmBrilho>04 / DECISÕES</TextoEmBrilho></p>
        <TextoBlurReveal as="h2">Clareza também é uma decisão de engenharia.</TextoBlurReveal>
        <TextoBlurReveal as="p" className="texto-secao">
          O MVP separa interface e acesso aos dados. Respostas ausentes aparecem como indisponíveis, leituras inválidas são identificadas e credenciais não são gravadas no navegador.
        </TextoBlurReveal>
        <ul className="lista-decisoes mt-10 text-left">
          <li><TextoBlurReveal as="strong">Sem leitura inventada</TextoBlurReveal><TextoBlurReveal as="span">Falhas e ausência de dados aparecem como estados explícitos.</TextoBlurReveal></li>
          <li><TextoBlurReveal as="strong">Privacidade por padrão</TextoBlurReveal><TextoBlurReveal as="span">O formulário não pede nomes nem endereços pessoais.</TextoBlurReveal></li>
          <li><TextoBlurReveal as="strong">Integração incremental</TextoBlurReveal><TextoBlurReveal as="span">Dispositivo e regras de autonomia podem evoluir sem misturar lógica à interface.</TextoBlurReveal></li>
        </ul>
      </section>

      <section id="etapas" className="secao-jornada secao-interativa mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <span className="linha-gradiente-secao" aria-hidden="true" />
        <p className="marcador-secao"><TextoEmBrilho>05 / PRÓXIMAS ETAPAS</TextoEmBrilho></p>
        <TextoBlurReveal as="h2">Uma base para integrar as próximas disciplinas.</TextoBlurReveal>
        <TextoBlurReveal as="p" className="texto-secao mx-auto">
          O projeto cresce por etapas, mantendo cada responsabilidade verificável e pronta para se conectar às demais frentes da Global Solution.
        </TextoBlurReveal>
        <ol className="linha-jornada mt-12 grid gap-8 md:grid-cols-3">
          <li><TextoBlurReveal as="span">Agora</TextoBlurReveal><TextoBlurReveal as="strong">Front-end e Web Development</TextoBlurReveal><TextoBlurReveal as="p">Identidade, consulta da API, cadastro dos pontos e estados da interface.</TextoBlurReveal></li>
          <li><TextoBlurReveal as="span">Próxima integração</TextoBlurReveal><TextoBlurReveal as="strong">Dispositivo e Edge</TextoBlurReveal><TextoBlurReveal as="p">Publicar medições reais e documentar origem, frequência e qualidade dos sinais.</TextoBlurReveal></li>
          <li><TextoBlurReveal as="span">Validação</TextoBlurReveal><TextoBlurReveal as="strong">Dados, cálculo e comunidade</TextoBlurReveal><TextoBlurReveal as="p">Conferir autonomia, testar entendimento e validar a utilidade com pessoas.</TextoBlurReveal></li>
        </ol>
      </section>

      <footer className="rodape mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-8 text-sm md:flex-row md:justify-between md:px-8">
        <TextoBlurReveal as="span">Watery · FIAP Global Solution CitizenTech</TextoBlurReveal>
        <a href="#inicio"><TextoBlurReveal as="span">Voltar ao início</TextoBlurReveal></a>
        <TextoBlurReveal as="span">Protótipo acadêmico conectado à API REST</TextoBlurReveal>
      </footer>
    </main>
  )
}
