import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiMenu } from 'react-icons/fi'
import styled from 'styled-components'
import { Logo } from '../ui'
import styles from './landing.module.scss'
import { Drawer } from 'antd'

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #f1edf3;
`

const Bar = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Links = styled.div`
  display: none;
  gap: 28px;
  @media (min-width: 960px) {
    display: flex;
  }
`

const A = styled.a`
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  text-decoration: none;
  &:hover {
    color: #176b58;
  }
`

const Actions = styled.div`
  display: none;
  gap: 12px;
  align-items: center;
  @media (min-width: 960px) {
    display: flex;
  }
`

const Burger = styled.button`
  display: none;
  background: none;
  padding: 12px;
  border: none;
  cursor: pointer;
  @media (max-width: 959px) {
    display: block;
  }
`

export const Navbar = () => {
  const { t } = useTranslation('landing')
  const [open, setOpen] = useState(false)
  return (
    <Nav aria-label={t('nav.navigation')}>
      <Bar>
        <Logo width={32} height={32} brandText />
        <Links>
          <A href="#recursos">{t('nav.features')}</A>
          <A href="#personalizacao">{t('nav.custom')}</A>
          <A href="#perguntas">{t('nav.faq')}</A>
        </Links>
        <Actions>
          <A href="/login">{t('nav.login')}</A>
          <a className={styles.button} href="/register">
            {t('nav.cta')}
          </a>
        </Actions>
        <Burger onClick={() => setOpen(true)} aria-label={t('nav.menu')} aria-expanded={open}>
          <FiMenu size={22} />
        </Burger>
      </Bar>
      <Drawer visible={open} onClose={() => setOpen(false)} placement="right" title="OhMyForm">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <A href="#recursos" onClick={() => setOpen(false)}>
            {t('nav.features')}
          </A>
          <A href="#personalizacao" onClick={() => setOpen(false)}>
            {t('nav.custom')}
          </A>
          <A href="#perguntas" onClick={() => setOpen(false)}>
            {t('nav.faq')}
          </A>
          <A href="/login">{t('nav.login')}</A>
          <a className={styles.button} href="/register">
            {t('nav.cta')}
          </a>
        </div>
      </Drawer>
    </Nav>
  )
}
export default Navbar
