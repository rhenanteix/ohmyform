import React from 'react'
import styled from 'styled-components'

const Mark = styled.mark`
  background: #fde68a;
  color: inherit;
  padding: 0 6px;
  border-radius: 6px;
`

export const Highlight = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement => <Mark>{children}</Mark>
