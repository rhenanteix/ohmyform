import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { FiGithub } from 'react-icons/fi'
import { Logo } from '../ui/logo'

const Wrap = styled.footer`
  padding: 60px 24px;
  border-top: 1px solid #e2e8f0;
`
const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 24px;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const A = styled.a`
  color: #64748b;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    color: #176b58;
  }
`

export const Footer = () => {
  const { t } = useTranslation('landing')
  return (
    <Wrap>
      <Grid>
        <Col>
          <Logo />
          <span style={{ color: '#64748b', fontSize: 13 }}>{t('footer.tagline')}</span>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <A
              href="https://github.com/ohmyform/ohmyform"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </A>
          </div>
        </Col>
        <Col>
          <strong>{t('footer.product')}</strong>
          <A href="#recursos">{t('nav.features')}</A>
          <A href="#perguntas">{t('nav.faq')}</A>
          <A href="/login">{t('footer.login')}</A>
        </Col>
      </Grid>
      <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: 12, marginTop: 40 }}>
        {t('footer.copy')}
      </p>
    </Wrap>
  )
}
export default Footer
