import React, { useEffect, useRef } from 'react'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { landingTheme } from 'components/landing/theme'
import Navbar from 'components/landing/navbar'
import Hero from 'components/landing/hero'
import SocialProof from 'components/landing/socialproof'
import Features from 'components/landing/features'
import Customization from 'components/landing/customization'
import UseCases from 'components/landing/usecases'
import FinalCta from 'components/landing/finalcta'
import Faq from 'components/landing/faq'
import Footer from 'components/landing/footer'
import styles from '../components/landing/landing.module.scss'

const LandingPage = () => {
  const { t } = useTranslation('landing')
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (
      !root.current ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.reveal)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    root.current.querySelectorAll('main > section').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  return (
    <ThemeProvider theme={landingTheme}>
      <Head>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
        <meta property="og:title" content={t('seo.title')} />
        <meta property="og:description" content={t('seo.description')} />
      </Head>
      <div className={styles.page} ref={root}>
        <a className="skip-link" href="#conteudo">
          {t('nav.skip')}
        </a>
        <Navbar />
        <main id="conteudo">
          <Hero />
          <SocialProof />
          <Features />
          <Customization />
          <UseCases />
          <FinalCta />
          <Faq />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default LandingPage
