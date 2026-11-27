import React from 'react'
import styled from 'styled-components'
import { FormPublicDesignFragment } from '../../graphql/fragment/form.public.fragment'

interface Props {
  type: 'question' | 'answer'
  design: FormPublicDesignFragment
}

const Header = styled.h1`
  font-size: clamp(26px, 4vw, 42px);
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.035em;
  overflow-wrap: anywhere;
  margin-bottom: 24px;
  color: ${(props: Props) =>
    props.type === 'question' ? props.design.colors.question : props.design.colors.answer};
`

export const StyledH1: React.FC<Props> = ({ children, ...props }) => {
  return <Header {...props}>{children}</Header>
}
