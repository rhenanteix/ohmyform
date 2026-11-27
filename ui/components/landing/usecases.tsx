import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './landing.module.scss'
const symbols = [
  '↗', '♡', '✎', '✳', '☆', '⌘',
]
export const UseCases = () => {
  const { t } = useTranslation('landing')
  return (
    <section className={styles.section} id="possibilidades">
      <div className={styles.heading}>
        <span className={styles.eyebrow}>{t('usecases.eyebrow')}</span>
        <h2>{t('usecases.title')}</h2>
        <p>{t('usecases.subtitle')}</p>
      </div>
      <div className={styles.useCases}>
        {symbols.map((symbol, i) => (
          <article key={i}>
            <span aria-hidden="true">{symbol}</span>
            <h3>{t(`usecases.cat${i + 1}.title`)}</h3>
            <ul>
              {[
                1, 2, 3,
              ].map((b) => (
                <li key={b}>{t(`usecases.cat${i + 1}.b${b}`)}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
export default UseCases
