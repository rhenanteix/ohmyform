import React from 'react'
import styled from 'styled-components'

const LogoImg = styled.img`
  width: 100%;
  height: auto;
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
      <LogoImg src="/new-log.png" alt="OhMyForm" width={width} height={height} />
      {brandText && (
        <BrandText>OhMy<BrandAccent>Form</BrandAccent></BrandText>
      )}
    </LogoLink>
  )
}

export default Logo
