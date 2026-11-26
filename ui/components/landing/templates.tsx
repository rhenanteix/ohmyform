import React from 'react'
import styled from 'styled-components'
import { Card, Container, Grid, PageSubtitle, PageTitle, Section } from '../ui'

const templates = [
  { name: 'Pesquisa de satisfação', label: 'CX', color: '#176b58' },
  { name: 'Quiz de personalidade', label: 'Diversão', color: '#438675' },
  { name: 'Inscrição de evento', label: 'Eventos', color: '#b78136' },
  { name: 'Avaliação de produto', label: 'Produto', color: '#10B981' },
]

export const Templates = () => {
  return (
    <Section py={12} id="templates" bg="#f8fafc" className="templates">
      <Container>
        <SectionHead>
          <PageTitle>Comece por um modelo.</PageTitle>
          <PageSubtitle>
            Escolha um ponto de partida e personalize do seu jeito.
          </PageSubtitle>
        </SectionHead>
        <TemplateGrid>
          {templates.map((t) => (
            <TemplateCard key={t.name} color={t.color}>
              <TemplateBadge color={t.color}>{t.label}</TemplateBadge>
              <TemplateName>{t.name}</TemplateName>
              <TemplatePreview />
            </TemplateCard>
          ))}
        </TemplateGrid>
      </Container>
    </Section>
  )
}

const SectionHead = styled.div`
  max-width: 700px;
  margin: 0 auto 48px;
  text-align: center;
`

const TemplateGrid = styled(Grid)`
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const TemplateCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 200px;
  padding: 20px;
`

const TemplateBadge = styled.span<{ color: string }>`
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 4px 8px;
  border-radius: 6px;
  background: ${({ color }) => color + '22'};
  color: ${({ color }) => color};
`

const TemplateName = styled.h4`
  font-size: 15px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  line-height: 1.3;
`

const TemplatePreview = styled.div`
  margin-top: auto;
  height: 60px;
  border-radius: 10px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border: 1px dashed #cbd5e1;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(23, 107, 88, 0.15) 100%);
    transform: translateX(-100%);
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    100% { transform: translateX(200%); }
  }
`

export default Templates
