import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiArrowRight } from 'react-icons/fi'
import styles from './landing.module.scss'
export const FinalCta = () => {
  const { t } = useTranslation('landing')
  return (
    <section className={styles.cta}>
      <span aria-hidden="true">✳</span>
      <h2>{t('final.title')}</h2>
      <a className={styles.button} href="/register">
        {t('final.cta')}
        <FiArrowRight />
      </a>
      <p>{t('final.micro')}</p>
    </section>
  )
}
export default FinalCta
