import React from 'react'
import styled from 'styled-components'
import { Card, Container, Grid, PageSubtitle, PageTitle, Section } from '../ui'

const steps = [
  {
    number: '01',
    title: 'Crie seu formulário',
    desc: 'Escolha um modelo ou comece do zero. Arraste perguntas, defina regras e personalize as cores.',
  },
  {
    number: '02',
    title: 'Compartilhe o link',
    desc: 'Publique e envie o link por e-mail, WhatsApp, redes sociais ou embarque no seu site.',
  },
  {
    number: '03',
    title: 'Receba as respostas',
    desc: 'Acompanhe tudo ao vivo no painel, filtre respostas e exporte quando precisar.',
  },
]

export const HowItWorks = () => {
  return (
    <Section py={12} className="how-it-works">
      <Container>
        <SectionHead>
          <PageTitle>Três passos e você está coletando dados.</PageTitle>
          <PageSubtitle>
            Do zero ao primeiro insight em menos tempo do que leva para fazer um café.
          </PageSubtitle>
        </SectionHead>
        <StepGrid>
          {steps.map((step, i) => (
            <StepCard key={i}>
              <StepNumber>{step.number}</StepNumber>
              <Badge>fácil</Badge>
              <StepTitle>{step.title}</StepTitle>
              <StepDesc>{step.desc}</StepDesc>
            </StepCard>
          ))}
        </StepGrid>
      </Container>
    </Section>
  )
}

const SectionHead = styled.div`
  max-width: 700px;
  margin: 0 auto 64px;
  text-align: center;
`

const StepGrid = styled(Grid)`
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const StepCard = styled(Card)`
  text-align: left;
  position: relative;
  overflow: visible;
`

const StepNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--omf-gradient);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 14px;
`

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 4px 8px;
  border-radius: 6px;
  background: #f0fdf4;
  color: #15803d;
`

const StepTitle = styled.h3`
  font-size: 17px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 8px;
  line-height: 1.3;
`

const StepDesc = styled.p`
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
`

export default HowItWorks
