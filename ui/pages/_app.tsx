import 'antd/dist/antd.css'
import 'swiper/css'
import 'leaflet/dist/leaflet.css'
import 'react-github-button/assets/style.css'
import '../i18n'
import { ApolloProvider } from '@apollo/client'
import { AppInitialProps, AppType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import React, { useEffect } from 'react'
import debug from 'debug'
import getConfig from 'next/config'
import { wrapper } from 'store'
import getClient from '../graphql/client'
import { NextConfigType } from '../next.config.type'
import { ThemeProvider } from 'src/design/ThemeProvider'
import { ToastProvider } from 'src/components/primitives/Toast'
import { GlobalStyles } from 'src/design/GlobalStyles'

const { publicRuntimeConfig } = getConfig() as NextConfigType

const App: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    if (publicRuntimeConfig.environment !== 'production') {
      debug.enable('*,-micromark')
    }
  })

  useEffect(() => {
    if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      return
    }

    const resize = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    window.addEventListener('resize', resize)

    return () => window.removeEventListener('resize', resize)
  })

  return (
    <ApolloProvider client={getClient()}>
      <ThemeProvider defaultTheme="light" storageKey="omf-theme">
        <Head>
          <title>OhMyForm</title>
          <link rel="icon" type="image/svg+xml" href="/brand/ohmyform-symbol.svg" />
          <meta name="theme-color" content="#059669" />
          <meta name="color-scheme" content="light dark" />
        </Head>
        <GlobalStyles />
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

App.getInitialProps = (): AppInitialProps => ({
  pageProps: {},
})

export default wrapper.withRedux(App)
