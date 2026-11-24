import React from 'react'
import Head from 'next/head'
import { Navbar } from '../components/landing/navbar'
import { Hero } from '../components/landing/hero'
import { Features } from '../components/landing/features'
import { HowItWorks } from '../components/landing/how-it-works'
import { Templates } from '../components/landing/templates'
import { Pricing } from '../components/landing/pricing'
import { CTA } from '../components/landing/cta'
import { Footer } from '../components/landing/footer'

export default function Index() {
  return (
    <div className="landing-page">
      <Head>
        <title>OhMyForm — Formulários poderosos, adoráveis por fora</title>
        <meta name="description" content="Crie formulários, enquetes e pesquisas que as pessoas realmente querem preencher. Open source, grátis para começar." />
        <meta name="theme-color" content="#8B5CF6" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Templates />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
