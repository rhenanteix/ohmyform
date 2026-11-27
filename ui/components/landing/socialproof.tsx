import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiFeather, FiHeart, FiCode } from 'react-icons/fi'
import styles from './landing.module.scss'
export const SocialProof = () => {
  const { t } = useTranslation('landing')
  return (
    <section className={styles.strip}>
      <p>{t('social.title')}</p>
      <div>
        <span>
          <FiFeather />
          {t('social.simple')}
        </span>
        <span>
          <FiHeart />
          {t('social.human')}
        </span>
        <span>
          <FiCode />
          {t('social.open')}
        </span>
      </div>
    </section>
  )
}
export default SocialProof
