import styled from 'styled-components'

export const Container = styled.div<{ maxWidth?: string; paddingY?: string }>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || '1200px'};
  margin: 0 auto;
  padding: 0 ${({ paddingY }) => (paddingY ? '0' : '24px')} ${({ paddingY }) => paddingY || '0'};
  position: relative;
`

export const Section = styled.section<{ py?: number; bg?: string }>`
  padding: ${({ py }) => (py ? `${py * 8}px 0` : '80px 0')};
  background: ${({ bg }) => bg || 'transparent'};
  position: relative;
  overflow: hidden;
`

export const Badge = styled.span<{ variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' }>`
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${({ variant }) => {
    switch (variant) {
      case 'success': return '#10B981'
      case 'warning': return '#b78136'
      case 'danger': return '#EF4444'
      case 'info': return '#3B82F6'
      default: return '#176b58'
    }
  }};
  color: #fff;
`

export const Card = styled.div<{ hover?: boolean; shadow?: string; padding?: string; bg?: string }>`
  background: ${({ bg }) => bg || '#fff'};
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: ${({ padding }) => padding || '24px'};
  box-shadow: ${({ shadow }) => shadow || 'none'};
  transition: var(--omf-transition);
  position: relative;
  overflow: hidden;

  ${({ hover }) =>
    hover &&
    `
    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--omf-shadow);
      border-color: transparent;
    }
  `}
`

export const PageTitle = styled.h1`
  font-size: clamp(36px, 4.8vw, 64px);
  font-weight: 800;
  line-height: 1.1;
  color: #0f172a;
  margin: 0 0 12px;
  letter-spacing: -0.02em;
`

export const PageSubtitle = styled.p`
  font-size: 18px;
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 32px;
  max-width: 600px;
`

export const Grid = styled.div<{ cols?: string; gap?: string }>`
  display: grid;
  grid-template-columns: ${({ cols }) => cols || 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))'};
  gap: ${({ gap }) => gap || '24px'};
  width: 100%;
`
