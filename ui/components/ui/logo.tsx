import React from 'react'
import styled from 'styled-components'

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
  color: var(--omf-colors-text-primary, #302b38);
  font-size: 20px;
  font-weight: 750;
  letter-spacing: -0.85px;
  line-height: 1.2;
  white-space: nowrap;

  &:hover {
    color: var(--omf-colors-text-primary, #302b38);
  }

  img {
    display: block;
    flex-shrink: 0;
    object-fit: contain;
    transition: transform 180ms ease;
  }

  &:hover img {
    transform: rotate(-6deg);
  }

  @media (prefers-reduced-motion: reduce) {
    img { transition: none; }
    &:hover img { transform: none; }
  }
`

export const Logo: React.FC<{
  width?: number | string
  height?: number | string
  brandText?: boolean
}> = ({ width = 36, height = 36, brandText = true }) => (
  <Brand href="/" aria-label="OhMy Form — início">
    <img src="/brand/ohmyform-symbol.svg" width={width} height={height} alt="" aria-hidden="true" />
    {brandText && <span>OhMy Form</span>}
  </Brand>
)

export default Logo
