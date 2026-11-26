import React from 'react'
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'
import styled from 'styled-components'
import { Container } from '../ui'

const footerLinks = {
  Produto: [
    'Recursos',
    'Modelos',
    'Preços',
    'Integrações',
  ],
  Empresa: [
    'Sobre',
    'Blog',
    'Carreiras',
    'Contato',
  ],
  Suporte: [
    'Documentação',
    'Status',
    'Privacidade',
    'Termos',
  ],
}

export const Footer = () => {
  return (
    <FooterContainer className="footer">
      <Container>
        <FooterGrid>
          <FooterBrand>
            <a href="/">
              <Logo />
              <span className="brand-text">OhMy<span className="brand-accent">Form</span></span>
            </a>
            <FooterDesc>
              Formulários poderosos, adoráveis por fora. Código aberto e feito com humor.
            </FooterDesc>
          </FooterBrand>
          <FooterLinkGroups>
            {Object.entries(footerLinks).map(([category, items]) => (
              <FooterGroup key={category}>
                <FooterGroupTitle>{category}</FooterGroupTitle>
                {items.map((item) => (
                  <FooterLink key={item} href={`#${item.toLowerCase()}`}>
                    {item}
                  </FooterLink>
                ))}
              </FooterGroup>
            ))}
          </FooterLinkGroups>
          <FooterSocial>
            <SocialTitle>Siga a gente</SocialTitle>
            <SocialIcons>
              <SocialLink href="https://github.com/ohmyform/ohmyform" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub size={20} />
              </SocialLink>
              <SocialLink href="https://twitter.com/OhMyForm" target="_blank" rel="noreferrer" aria-label="Twitter">
                <FaTwitter size={20} />
              </SocialLink>
              <SocialLink href="https://www.instagram.com/ohmyform/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram size={20} />
              </SocialLink>
            </SocialIcons>
          </FooterSocial>
        </FooterGrid>
        <FooterBottom>
          <span>© {new Date().getFullYear()} OhMyForm. Código aberto sob AGPL-3.0.</span>
          <span>Feito com ☕ e muito pixele.</span>
        </FooterBottom>
      </Container>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  background: #0f172a;
  color: #e2e8f0;
  border-top: 1px solid #1e293b;
  padding: 56px 0 32px;
`

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  @media (min-width: 768px) {
    grid-template-columns: 260px repeat(3, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: 280px 180px 180px 200px;
  }
`

const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const Logo = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 10px;
  background: var(--omf-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(23, 107, 88, 0.35);
`

const FooterDesc = styled.p`
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.6;
  margin: 4px 0 0;
`

const FooterLinkGroups = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
`

const FooterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const FooterGroupTitle = styled.div`
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #94a3b8;
  margin-bottom: 6px;
`

const FooterLink = styled.a`
  font-size: 14px;
  color: #cbd5e1;
  text-decoration: none;
  transition: var(--omf-transition);

  &:hover {
    color: #176b58;
  }
`

const FooterSocial = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const SocialTitle = styled.div`
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #94a3b8;
  margin-bottom: 6px;
`

const SocialIcons = styled.div`
  display: flex;
  gap: 14px;
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #1e293b;
  color: #e2e8f0;
  transition: var(--omf-transition);

  &:hover {
    background: #176b58;
    color: #fff;
    transform: translateY(-2px);
  }
`

const FooterBottom = styled.div`
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: #94a3b8;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: initial;
  }
`

export default Footer
