import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiFeather, FiSliders, FiCode, FiSmartphone, FiShare2, FiBarChart2 } from 'react-icons/fi'
import styles from './landing.module.scss'
const icons = [
  FiFeather, FiSliders, FiCode, FiSmartphone, FiShare2, FiBarChart2,
]
export const Features = () => {
  const { t } = useTranslation('landing')
  return (
    <section className={styles.section} id="recursos">
      <div className={styles.heading}>
        <span className={styles.eyebrow}>{t('features.eyebrow')}</span>
        <h2>
          {t('features.title')} <mark>{t('features.highlight')}</mark>
        </h2>
        <p>{t('features.subtitle')}</p>
      </div>
      <div className={styles.features}>
        {icons.map((Icon, i) => (
          <article className={styles.feature} key={i}>
            <Icon aria-hidden="true" />
            <h3>{t(`features.item${i + 1}.title`)}</h3>
            <p>{t(`features.item${i + 1}.desc`)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
export default Features
