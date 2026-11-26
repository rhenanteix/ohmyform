import React, { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import styled from 'styled-components'
import { Button, Logo } from '../ui'

const links = [
  { href: '#features', label: 'Recursos' },
  { href: '#how-it-works', label: 'Como funciona' },
  { href: '#templates', label: 'Modelos' },
  { href: '#pricing', label: 'Planos' },
]

const NavbarContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
`

const Nav = styled.nav`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.6);
`

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
`

const NavBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const NavLinks = styled.div`
  display: none;
  align-items: center;
  gap: 32px;

  @media (min-width: 768px) {
    display: flex;
  }
`

const NavLink = styled.a`
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  text-decoration: none;
  transition: var(--omf-transition);

  &:hover {
    color: #176b58;
  }
`

const NavActions = styled.div`
  display: none;
  align-items: center;
  gap: 12px;

  @media (min-width: 768px) {
    display: flex;
  }
`

const MobileToggle = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: 10px;
  color: #0f172a;
  cursor: pointer;

  @media (max-width: 767px) {
    display: flex;
  }

  &:hover {
    background: #f1f5f9;
  }
`

const MobileMenu = styled.div`
  position: absolute;
  top: 72px;
  left: 0;
  right: 0;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: var(--omf-shadow);
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 60;
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`

const MobileLink = styled.a`
  display: block;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  border-bottom: 1px solid #f1f5f9;

  &:hover {
    color: #176b58;
  }
`

export const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <Nav aria-label="Navegação principal" className="navbar">
      <NavbarContainer>
        <NavBar>
          <NavBrand>
            <Logo width={34} height={34} brandText />
          </NavBrand>
          <NavLinks>
            {links.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </NavLinks>
          <NavActions>
            <Button as="a" href="/login" variant="ghost" size="sm">Entrar</Button>
            <Button as="a" href="/register" size="sm">Criar formulário grátis</Button>
          </NavActions>
          <MobileToggle onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} aria-controls="mobile-navigation">
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </MobileToggle>
        </NavBar>
        {open && (
          <MobileMenu id="mobile-navigation">
            {links.map((item) => (
              <MobileLink key={item.href} href={item.href}>
                {item.label}
              </MobileLink>
            ))}
            <MobileLink href="/login">Entrar</MobileLink>
            <MobileLink href="/register">Criar formulário grátis</MobileLink>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  )
}

export default Navbar
