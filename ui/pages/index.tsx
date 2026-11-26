import React, { useState } from 'react'
import Head from 'next/head'
import {
  FiArrowRight,
  FiCheck,
  FiMenu,
  FiX,
  FiFeather,
  FiSliders,
  FiBarChart2,
  FiHeart,
  FiCode,
  FiArrowUpRight,
} from 'react-icons/fi'
import { Logo } from '../components/ui/logo'
import styles from './landing.module.scss'

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [answer, setAnswer] = useState('')
  return (
    <div className={styles.page}>
      <Head>
        <title>OhMyForm — Boas perguntas. Grandes conexões.</title>
        <meta
          name="description"
          content="Transforme perguntas em conversas. Crie formulários e pesquisas com a sua identidade, compartilhe e conheça melhor as pessoas."
        />
      </Head>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className={styles.header}>
        <Logo />
        <button
          className={styles.menuToggle}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="landing-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <nav
          id="landing-nav"
          className={menuOpen ? styles.open : ''}
          aria-label="Navegação principal"
        >
          <a href="#recursos" onClick={() => setMenuOpen(false)}>
            Recursos
          </a>
          <a href="#como-funciona" onClick={() => setMenuOpen(false)}>
            Como funciona
          </a>
          <a href="#possibilidades" onClick={() => setMenuOpen(false)}>
            Possibilidades
          </a>
          <a href="/login">Entrar</a>
          <a className={styles.button} href="/register">
            Começar agora <FiArrowUpRight />
          </a>
        </nav>
      </header>
      <main id="conteudo">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              <span /> MENOS FORMULÁRIO. MAIS CONVERSA.
            </span>
            <h1>
              Boas perguntas.
              <br />
              Grandes <em>conexões.</em>
            </h1>
            <p>
              Um formulário pode ser o começo de algo incrível. Crie experiências que dão vontade de
              responder — do primeiro olá ao último clique.
            </p>
            <div className={styles.actions}>
              <a className={styles.button} href="/register">
                Criar meu formulário <FiArrowRight />
              </a>
              <a className={styles.textLink} href="#como-funciona">
                Conheça o OhMyForm <FiArrowDown />
              </a>
            </div>
            <div className={styles.assurances}>
              <span>
                <FiCheck /> Sem precisar programar
              </span>
              <span>
                <FiCheck /> Open source
              </span>
            </div>
          </div>
          <div className={styles.showcase}>
            <div className={styles.orbit} aria-hidden="true">
              ✳
            </div>
            <span className={styles.floatingLabel}>
              <FiHeart /> Feito para pessoas
            </span>
            <div className={styles.formPreview}>
              <div className={styles.previewTop}>
                <span>studio / feedback</span>
                <span>01 — 03</span>
              </div>
              <div className={styles.previewBody}>
                <span className={styles.miniLabel}>PRAZER EM CONHECER VOCÊ</span>
                <h2>
                  O que te trouxe
                  <br />
                  até aqui? <span>✦</span>
                </h2>
                <p>Grandes ideias começam com uma conversa.</p>
                <div className={styles.options}>
                  {[
                    'Quero ouvir meus clientes',
                    'Tenho uma ideia incrível',
                    'Estou só explorando',
                  ].map((label, i) => (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={answer === label}
                      className={answer === label ? styles.chosen : ''}
                      onClick={() => setAnswer(label)}
                    >
                      <kbd>{String.fromCharCode(65 + i)}</kbd>
                      {label}
                      {answer === label && <FiCheck />}
                    </button>
                  ))}
                </div>
                <span className={styles.previewHint} aria-live="polite">
                  {answer
                    ? 'Boa escolha! Seu próximo formulário começa aqui.'
                    : 'Experimente: escolha uma resposta acima.'}
                </span>
              </div>
              <div className={styles.progress}>
                <span />
              </div>
            </div>
            <span className={styles.bottomLabel}>
              <span>✦</span> Sua identidade. Sua conversa.
            </span>
          </div>
        </section>
        <div className={styles.strip}>
          <span>
            Pequenos detalhes. <strong>Uma experiência muito melhor.</strong>
          </span>
          <span>
            <FiFeather /> Simples de criar
          </span>
          <span>
            <FiHeart /> Gostoso de responder
          </span>
          <span>
            <FiCode /> Aberto por natureza
          </span>
        </div>
        <section className={styles.section} id="recursos">
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>SIMPLES POR FORA. PODEROSO POR DENTRO.</span>
            <h2>
              Tudo o que importa.
              <br />
              <em>Nada que atrapalha.</em>
            </h2>
            <p>Menos tempo configurando. Mais tempo entendendo quem está do outro lado.</p>
          </div>
          <div className={styles.features}>
            <article className={styles.feature}>
              <FiFeather />
              <h3>Da ideia ao formulário.</h3>
              <p>
                Organize perguntas, escolha os tipos de resposta e transforme sua ideia em uma
                experiência fluida.
              </p>
              <div className={styles.questionDemo}>
                <span>
                  01 <strong>Como podemos te chamar?</strong>
                </span>
                <span className={styles.line}>Seu nome aqui…</span>
                <span>
                  02 <strong>O que você tem em mente?</strong>
                </span>
              </div>
            </article>
            <article className={styles.feature}>
              <FiSliders />
              <h3>Com a sua personalidade.</h3>
              <p>
                Cores, textos e detalhes que fazem seu formulário parecer uma extensão da sua marca.
              </p>
              <div className={styles.swatches} aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <span>Aa</span>
              </div>
            </article>
            <article className={styles.feature}>
              <FiBarChart2 />
              <h3>Respostas que fazem sentido.</h3>
              <p>
                Reúna as respostas em um só lugar. Acompanhe o que as pessoas dizem e descubra seus
                próximos passos.
              </p>
              <div className={styles.bars} aria-hidden="true">
                {[35, 65, 48, 90, 72, 100, 84].map((height, i) => (
                  <span key={i} style={{ height }} />
                ))}
              </div>
            </article>
          </div>
        </section>
        <section className={`${styles.section} ${styles.how}`} id="como-funciona">
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>DO SEU JEITO, EM POUCOS PASSOS</span>
            <h2>
              Uma boa conversa
              <br />
              não precisa ser complicada.
            </h2>
          </div>
          <div className={styles.steps}>
            {[
              ['Crie', 'Comece com uma ideia. Adicione suas perguntas e dê o seu toque pessoal.'],
              ['Compartilhe', 'Publique seu formulário e envie o link para quem você quer ouvir.'],
              ['Descubra', 'Acompanhe as respostas e transforme feedback em novas possibilidades.'],
            ].map(([title, text], i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.section} id="possibilidades">
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>PARA CADA IDEIA, UMA POSSIBILIDADE</span>
            <h2>O que você quer descobrir?</h2>
            <p>Do feedback do cliente à próxima grande oportunidade.</p>
          </div>
          <div className={styles.useCases}>
            {[
              ['✳', 'Feedback de clientes', 'Escute. Entenda. Evolua.'],
              ['↗', 'Captação de leads', 'O começo de boas conexões.'],
              ['✦', 'Inscrições e eventos', 'Dê boas-vindas ao próximo encontro.'],
              ['♡', 'Pesquisas de satisfação', 'A opinião de cada pessoa importa.'],
            ].map(([icon, title, desc]) => (
              <a href="/register" key={title}>
                <span>{icon}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <FiArrowUpRight />
              </a>
            ))}
          </div>
        </section>
        <section className={styles.cta}>
          <span className={styles.eyebrow}>SUA PRÓXIMA CONVERSA COMEÇA AQUI</span>
          <h2>
            Tem uma pergunta?
            <br />
            <em>Dê vida a ela.</em>
          </h2>
          <a className={styles.button} href="/register">
            Começar a criar <FiArrowRight />
          </a>
          <p>Feito com cuidado. Aberto a possibilidades.</p>
        </section>
      </main>
      <footer className={styles.footer}>
        <Logo />
        <p>Formulários que aproximam pessoas.</p>
        <a href="https://github.com/ohmyform/ohmyform" target="_blank" rel="noreferrer">
          Open source <FiArrowUpRight />
        </a>
        <a href="/login">Acessar minha conta</a>
      </footer>
    </div>
  )
}
function FiArrowDown() {
  return <span aria-hidden="true">↓</span>
}
