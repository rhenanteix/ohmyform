import React from 'react'
import styled from 'styled-components'

const LogoImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
`

const LogoSvg = styled.svg`
  display: block;
`

const LogoLink = styled('a')`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  cursor: pointer;
`

const BrandText = styled.span`
  font-size: 20px;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.02em;
`

const BrandAccent = styled.span`
  background: var(--omf-gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const LOGO_SVG = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="omfLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="10" fill="#0f172a" />
    <path
      d="M8 8h4a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4a2 2 0 012-2zM20 8h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4a2 2 0 012-2zM14 20h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4a2 2 0 012-2z"
      fill="url(#omfLogoGrad)"
    />
    <path
      d="M10 10l2 4 4-2"
      stroke="#8B5CF6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.6"
    />
  </svg>
)

export const Logo: React.FC<{
  width?: number | string
  height?: number | string
  brandText?: boolean
}> = ({
  width = 32,
  height = 32,
  brandText = true,
}) => {
  return (
    <LogoLink href="/">
      <LogoSvg width={width} height={height}>{LOGO_SVG}</LogoSvg>
      {brandText && (
        <BrandText>OhMy<BrandAccent>Form</BrandAccent></BrandText>
      )}
    </LogoLink>
  )
}

export default Logo
