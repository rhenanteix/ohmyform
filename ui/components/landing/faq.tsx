import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './landing.module.scss'
export const Faq = () => {
  const { t } = useTranslation('landing')
  return (
    <section className={`${styles.section} ${styles.faq}`} id="perguntas">
      <div className={styles.heading}>
        <h2>{t('faq.title')}</h2>
      </div>
      {[
        1, 2, 3, 4,
      ].map((i) => (
        <details key={i}>
          <summary>{t(`faq.q${i}`)}</summary>
          <p>{t(`faq.a${i}`)}</p>
        </details>
      ))}
    </section>
  )
}
export default Faq
