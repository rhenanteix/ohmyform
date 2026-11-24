import React, { useEffect, useState } from 'react'
import { FiArrowRight, FiStar } from 'react-icons/fi'
import styled from 'styled-components'
import { Button, Container, PageSubtitle, PageTitle, Section } from '../ui'

const questions = [
  'Qual o seu time do coração?',
  'Quantas estrelas você dá pra esse café?',
  'Qual superpoder você queria ter?',
]

export const Hero = () => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0])
  const [answer, setAnswer] = useState('')
  const [typing, setTyping] = useState(false)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setTyping(true)
      setCurrentQuestion((prev) =>
        questions[(questions.indexOf(prev) + 1) % questions.length]
      )
      setAnswer('')
      setShowResult(false)
    }, 6000)
    return () => clearTimeout(t)
  }, [currentQuestion])

  const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowResult(true)
    setTyping(false)
  }

  return (
    <Section py={12} className="hero">
      <HeroBg>
        <Blob index={1} />
        <Blob index={2} />
        <Blob index={3} />
      </HeroBg>
      <Container>
        <HeroGrid>
          <HeroContent>
            <Eyebrow>Crie formulários que as pessoas realmente querem preencher</Eyebrow>
            <PageTitle>
              Formulários <GradientText>poderosos, adoráveis por fora.</GradientText>
            </PageTitle>
            <PageSubtitle>
              Adeus, formulários chatos. Olá, perguntas que ninguém ignora. Crie enquetes,
              questionários e pesquisas que convertem — com um pouco de humor e muita cor.
            </PageSubtitle>
            <HeroActions>
              <Button size="lg">Começar de graça <FiArrowRight size={20} /></Button>
              <Button variant="outline" size="lg">Ver exemplos <FiStar size={20} /></Button>
            </HeroActions>
            <TrustBar>
              <TrustItem>Ilimitado</TrustItem>
              <TrustItem>Grátis para começar</TrustItem>
              <TrustItem>Sem cartão</TrustItem>
            </TrustBar>
          </HeroContent>
          <PreviewCard>
            <PreviewHeader>
              <Badge>ao vivo</Badge>
              <span>Pesquisa de satisfação</span>
            </PreviewHeader>
            <PreviewForm onSubmit={handleSubmit}>
              <PreviewQuestion>{currentQuestion}</PreviewQuestion>
              <PreviewInput
                value={answer}
                onChange={handleAnswer}
                placeholder="Digite sua resposta..."
                disabled={showResult}
              />
              {showResult ? (
                <PreviewResult>Enviado com sucesso! <FiStar size={16} /></PreviewResult>
              ) : (
                <PreviewButton type="submit" disabled={!answer || typing}>
                  {typing ? 'Digitando…' : 'Próxima pergunta'}
                </PreviewButton>
              )}
            </PreviewForm>
          </PreviewCard>
        </HeroGrid>
      </Container>
    </Section>
  )
}

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`

const Blob = styled.div<{ index: number }>`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.45;
  animation: drift 10s ease-in-out infinite;

  ${({ index }) => {
    const positions: Record<string, string> = {
      1: 'top: -8%; left: 8%; width: 600px; height: 600px; background: #8B5CF6; animation-delay: 0s;',
      2: 'bottom: -12%; right: 12%; width: 500px; height: 500px; background: #EC4899; animation-delay: -3s;',
      3: 'top: 35%; left: 62%; width: 400px; height: 400px; background: #F59E0B; animation-delay: -6s;',
    }
    return positions[index]
  }}

  @keyframes drift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(30px, -40px) scale(1.05); }
  }
`

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (min-width: 1024px) {
    grid-template-columns: 1.15fr 1fr;
    gap: 64px;
  }
`

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #EC4899;
`

const GradientText = styled.span`
  background: var(--omf-gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const HeroActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

const TrustBar = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 6px;
`

const TrustItem = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748b;
  font-weight: 600;
`

const PreviewCard = styled.div`
  background: #fff;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1), 0 10px 20px -10px rgba(0, 0, 0, 0.04);
  padding: 28px;
  position: relative;
  overflow: hidden;

  @media (max-width: 1023px) {
    max-width: 360px;
    margin: 0 auto;
  }
`

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 22px;
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

const PreviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`

const PreviewQuestion = styled.div`
  font-size: 17px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.4;
  margin-bottom: 2px;
`

const PreviewInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  font-size: 15px;
  border: 2px dashed #cbd5e1;
  border-radius: 14px;
  background: #f8fafc;
  color: #0f172a;
  outline: none;
  transition: var(--omf-transition);

  &:focus {
    border-color: #8B5CF6;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.12);
  }

  &:disabled {
    background: #f1f5f9;
    border-style: solid;
    border-color: #cbd5e1;
    color: #94a3b8;
    cursor: default;
  }
`

const PreviewButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  border: none;
  border-radius: 14px;
  background: var(--omf-gradient);
  cursor: pointer;
  transition: var(--omf-transition);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.35);

  &:hover:not(:disabled) {
    filter: brightness(1.05);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`

const PreviewResult = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #15803d;
  background: #f0fdf4;
  border: 1px dashed #bbf7d0;
  border-radius: 12px;
  padding: 10px 14px;
  animation: pop 0.4s ease;

  @keyframes pop {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`

export default Hero
