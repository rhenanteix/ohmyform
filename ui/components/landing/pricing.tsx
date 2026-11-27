import React from 'react'
import { FiExternalLink } from 'react-icons/fi'
import styled from 'styled-components'
import { Button, Card, Container, Grid, PageSubtitle, PageTitle, Section } from '../ui'

const plans = [
  {
    name: 'Grátis',
    price: 'R$ 0',
    period: '/mês',
    description: 'Para começar a brincar de coletar respostas.',
    features: [
      'Até 3 formulários',
      'Respostas ilimitadas',
      'Exportar CSV',
      'Suporte comunitário',
    ],
    popular: false,
    cta: 'Começar grátis',
  },
  {
    name: 'Pro',
    price: 'R$ 49',
    period: '/mês',
    description: 'Para quem leva a sério (sem perder a graça).',
    features: [
      'Formulários ilimitados',
      'Lógica avançada',
      'Exportar Excel/JSON',
      'Domínio próprio',
      'Suporte prioritário',
    ],
    popular: true,
    cta: 'Fazer upgrade',
  },
  {
    name: 'Equipe',
    price: 'R$ 99',
    period: '/mês',
    description: 'Para times que querem criar juntos.',
    features: [
      'Tudo do Pro',
      'Membros ilimitados',
      'Espaços de trabalho',
      'Controle de acesso',
      'SLA dedicado',
    ],
    popular: false,
    cta: 'Falar com vendas',
  },
]

export const Pricing = () => {
  return (
    <Section py={12} id="pricing" className="pricing">
      <Container>
        <SectionHead>
          <PageTitle>Planos que cabem no seu bolso.</PageTitle>
          <PageSubtitle>
            Comece de graça e cresça quando estiver pronto. Sem letra miúda.
          </PageSubtitle>
        </SectionHead>
        <PricingGrid>
          {plans.map((plan) => (
            <PricingCard key={plan.name} popular={plan.popular}>
              {plan.popular && <PopularBadge>Mais popular</PopularBadge>}
              <PlanName>{plan.name}</PlanName>
              <PlanPrice>
                <PlanPriceValue>{plan.price}</PlanPriceValue>
                <PlanPeriod>{plan.period}</PlanPeriod>
              </PlanPrice>
              <PlanDesc>{plan.description}</PlanDesc>
              <FeatureList>
                {plan.features.map((f) => (
                  <Feature key={f}>
                    <span>✓</span> {f}
                  </Feature>
                ))}
              </FeatureList>
              <CtaButton variant={plan.popular ? 'primary' : 'outline'} size="lg" fullWidth>
                {plan.cta}
                {plan.popular && <FiExternalLink size={18} style={{ marginLeft: 8 }} />}
              </CtaButton>
            </PricingCard>
          ))}
        </PricingGrid>
      </Container>
    </Section>
  )
}

const SectionHead = styled.div`
  max-width: 700px;
  margin: 0 auto 48px;
  text-align: center;
`

const PricingGrid = styled(Grid)`
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  align-items: center;
`

const PricingCard = styled(Card)<{ popular?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 560px;
  justify-content: space-between;
  border: ${({ popular }) => (popular ? '2px solid #176b58' : '1px solid #e2e8f0')};
  background: ${({ popular }) => (popular ? '#f0f6f2' : '#fff')};

  @media (min-width: 768px) {
    transform: ${({ popular }) => (popular ? 'scale(1.04)' : 'scale(1)')};
    z-index: ${({ popular }) => (popular ? 2 : 1)};
  }
`

const PopularBadge = styled.span`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 4px 14px;
  border-radius: 999px;
  background: var(--omf-gradient);
  color: #fff;
  box-shadow: 0 4px 12px rgba(23, 107, 88, 0.35);
`

const PlanName = styled.h3`
  font-size: 20px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 6px;
`

const PlanPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2px;
  margin-bottom: 10px;
`

const PlanPriceValue = styled.span`
  font-size: 36px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1;
`

const PlanPeriod = styled.span`
  font-size: 14px;
  color: #94a3b8;
  font-weight: 500;
`

const PlanDesc = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0 0 20px;
  line-height: 1.5;
`

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 8px;
`

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #475569;

  span:first-child {
    color: #10B981;
    font-weight: 800;
  }
`

const CtaButton = styled(Button)`
  &:hover {
    transform: translateY(-1px);
  }
`

export default Pricing
