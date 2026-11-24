import React from 'react'
import { FiStar } from 'react-icons/fi'
import styled from 'styled-components'
import { Button, Card, Container, Section } from '../ui'

export const CTA = () => {
  return (
    <Section py={14} className="cta" id="cta">
      <Container>
        <CTACard>
          <CTAHead>
            <CTATitle>Pronto para coletar respostas que importam?</CTATitle>
            <CTASub>
              Crie seu primeiro formulário em menos de um minuto. Sem cartão de crédito.
            </CTASub>
          </CTAHead>
          <CTAActions>
            <Button size="lg">Começar de graça <FiStar size={20} /></Button>
            <Button variant="outline" size="lg">Ver modelos</Button>
          </CTAActions>
        </CTACard>
      </Container>
    </Section>
  )
}

const CTACard = styled(Card)`
  text-align: center;
  padding: 64px 32px;
  background: var(--omf-gradient);
  border: none;

  h2, p {
    color: #fff;
  }
`

const CTAHead = styled.div`
  max-width: 640px;
  margin: 0 auto 32px;
`

const CTATitle = styled.h2`
  font-size: 34px;
  font-weight: 900;
  line-height: 1.15;
  margin: 0 0 14px;
  letter-spacing: -0.02em;
  color: #fff;
`

const CTASub = styled.p`
  font-size: 17px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin: 0;
`

const CTAActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`

export default CTA
