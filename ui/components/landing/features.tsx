import React from 'react'
import { FiSmile, FiArrowRight, FiBarChart, FiShield, FiUsers, FiSliders } from 'react-icons/fi'
import styled from 'styled-components'
import { Card, Container, Grid, PageSubtitle, PageTitle, Section } from '../ui'

const features = [
  {
    icon: <FiSmile size={28} />,
    title: 'Perguntas que ninguém ignora',
    desc: 'Uma pergunta por vez, como uma conversa real. Sem muro de texto que assusta ninguém.',
  },
  {
    icon: <FiArrowRight size={28} />,
    title: 'Publicação em segundos',
    desc: 'Crie, publique e compartilhe seu formulário com um link. Sem configurar servidor.',
  },
  {
    icon: <FiBarChart size={28} />,
    title: 'Respostas em tempo real',
    desc: 'Acompanhe as chegadas ao vivo e exporte para CSV, Excel ou JSON quando quiser.',
  },
  {
    icon: <FiShield size={28} />,
    title: 'Seguro e privado',
    desc: 'Seus dados ficam sob seu controle. Código aberto, transparente e autoconsentido.',
  },
  {
    icon: <FiUsers size={28} />,
    title: 'Colabore com o time',
    desc: 'Convide colegas para editar formulários e analisar respostas juntos.',
  },
  {
    icon: <FiSliders size={28} />,
    title: 'Cara da sua marca',
    desc: 'Cores, fontes e logotipo personalizados para parecer feito sob medida para você.',
  },
]

export const Features = () => {
  return (
    <Section py={12} bg="#fff" className="features">
      <Container>
        <SectionHead>
          <PageTitle>Tudo o que um formulário precisa, sem o chato.</PageTitle>
          <PageSubtitle>
            Recursos pensados para quem quer coletar respostas de verdade — e se divertir
            fazendo isso.
          </PageSubtitle>
        </SectionHead>
        <FeatureGrid>
          {features.map((feature, i) => (
            <FeatureCard key={i} hover>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDesc>{feature.desc}</FeatureDesc>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </Container>
    </Section>
  )
}

const SectionHead = styled.div`
  max-width: 700px;
  margin: 0 auto 64px;
  text-align: center;
`

const FeatureGrid = styled(Grid)`
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const FeatureCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 320px;
`

const FeatureIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
  color: #8B5CF6;
`

const FeatureTitle = styled.h3`
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  line-height: 1.3;
`

const FeatureDesc = styled.p`
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export default Features
