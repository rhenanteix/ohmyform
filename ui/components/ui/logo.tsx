import React from 'react'
import styled from 'styled-components'
const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
  color: var(--omf-colors-text-primary, #233c35);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.8px;
  &:hover {
    color: var(--omf-colors-text-primary, #233c35);
  }
  svg {
    flex-shrink: 0;
  }
`
export const Logo: React.FC<{
  width?: number | string
  height?: number | string
  brandText?: boolean
}> = ({ width = 32, height = 32, brandText = true }) => (
  <Brand href="/" aria-label="OhMyForm — início">
    <svg width={width} height={height} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#245d4c" />
      <path d="M9 10h14M9 16h9M9 22h5" stroke="#eef1d9" strokeWidth="3" strokeLinecap="round" />
      <path
        d="m20 21 2 2 4-5"
        stroke="#d6e8ae"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    {brandText && (
      <span>
        OhMyForm<span style={{ color: '#80966a' }}>.</span>
      </span>
    )}
  </Brand>
)
export default Logo
