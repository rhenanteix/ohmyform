import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiCheck } from 'react-icons/fi'
import styles from './landing.module.scss'
const palettes = [
  { bg: '#efe5f7', ink: '#80618d', key: 'lavender' },
  { bg: '#fbe5ee', ink: '#ae6385', key: 'rose' },
  { bg: '#e7f1e8', ink: '#4e7a60', key: 'sage' },
  { bg: '#fbf0cf', ink: '#8c763c', key: 'sun' },
]
export const Customization = () => {
  const { t } = useTranslation('landing')
  const [color, setColor] = useState(0)
  const [rating, setRating] = useState<number | null>(null)
  return (
    <section className={`${styles.section} ${styles.custom}`} id="personalizacao">
      <div className={styles.heading}>
        <span className={styles.eyebrow}>{t('custom.eyebrow')}</span>
        <h2>
          {t('custom.title')}
          <br />
          <mark>{t('custom.highlight')}</mark>
        </h2>
        <p>{t('custom.body')}</p>
        <ul>
          {[
            1, 2, 3,
          ].map((i) => (
            <li key={i}>
              <FiCheck />
              {t(`custom.b${i}`)}
            </li>
          ))}
        </ul>
      </div>
      <div
        className={styles.preview}
        style={
          {
            '--preview-bg': palettes[color].bg,
            '--preview-ink': palettes[color].ink,
          } as React.CSSProperties
        }
      >
        <div className={styles.previewCard}>
          <span aria-hidden="true">✳</span>
          <h3>{t('custom.previewTitle')}</h3>
          <p>{t('custom.previewBody')}</p>
          <div>
            {[
              1, 2, 3, 4, 5,
            ].map((i) => (
              <button
                key={i}
                aria-label={`${t('custom.rating')} ${i}`}
                aria-pressed={rating === i}
                onClick={() => setRating(i)}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.palette} role="group" aria-label={t('custom.palette')}>
          {palettes.map((palette, i) => (
            <button
              key={palette.key}
              aria-label={t(`custom.${palette.key}`)}
              aria-pressed={i === color}
              style={{ background: palette.ink }}
              onClick={() => setColor(i)}
            />
          ))}
        </div>
        <span className={styles.paletteLabel}>{t('custom.paletteHint')}</span>
      </div>
    </section>
  )
}
export default Customization
