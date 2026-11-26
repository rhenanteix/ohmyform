import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { resources } from './locales'

export const languages = Object.keys(resources)

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      ...resources,
      'pt-BR': resources.pt_BR,
      'pt-PT': resources.pt_PT,
      pt: resources.pt_BR,
    },
    defaultNS: 'common',
    react: {
      useSuspense: process.browser,
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'u'],
    },
  })
