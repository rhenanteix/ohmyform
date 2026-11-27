import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiArrowRight, FiCheck, FiMousePointer } from 'react-icons/fi'
import styles from './landing.module.scss'

export const Hero = () => {
  const { t } = useTranslation('landing')
  const [answer, setAnswer] = useState<number | null>(null)
  return (
    <section className={styles.hero}>
      <div className={styles.doodles} aria-hidden="true">
        <span className={styles.face}>◡</span>
        <span className={styles.star}>✳</span>
        <span className={styles.face}>ᴗ</span>
        <span className={styles.spark}>✦</span>
      </div>
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}>{t('hero.eyebrow')}</span>
        <h1>
          {t('hero.title')}
          <br />
          <mark>{t('hero.highlight')}</mark>
        </h1>
        <p>{t('hero.subtitle')}</p>
        <a className={styles.button} href="/register">
          {t('hero.cta')} <FiArrowRight />
        </a>
        <span className={styles.micro}>
          <FiCheck /> {t('hero.micro')}
        </span>
      </div>
      <div className={styles.demoWrap}>
        <span className={styles.demoNote}>
          <FiMousePointer /> {t('hero.try')}
        </span>
        <div className={styles.demo}>
          <div className={styles.demoToolbar}>
            <span>
              <i />
              <i />
              <i />
            </span>
            <span>ohmyform / feedback</span>
            <span>✦</span>
          </div>
          <div className={styles.demoContent}>
            <span className={styles.demoEmoji} aria-hidden="true">
              ✺
            </span>
            <span className={styles.eyebrow}>{t('hero.demoLabel')}</span>
            <h2>{t('hero.demoTitle')}</h2>
            <p>{t('hero.demoBody')}</p>
            <div className={styles.options}>
              {[
                1, 2, 3,
              ].map((i) => (
                <button
                  key={i}
                  aria-pressed={answer === i}
                  className={answer === i ? styles.selected : ''}
                  onClick={() => setAnswer(i)}
                >
                  <span>{String.fromCharCode(64 + i)}</span>
                  {t(`hero.option${i}`)}
                  {answer === i && <FiCheck />}
                </button>
              ))}
            </div>
            <div className={styles.demoBottom}>
              <span aria-live="polite">{answer ? t('hero.selected') : t('hero.hint')}</span>
              <span>01 / 03</span>
            </div>
          </div>
          <div className={styles.progress}>
            <span style={{ width: answer ? '66%' : '33%' }} />
          </div>
        </div>
        <span className={styles.sticker}>made with a little ♥</span>
      </div>
    </section>
  )
}
export default Hero
