import React, { forwardRef } from 'react';
import styled from 'styled-components';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  dashed?: boolean;
  plain?: boolean;
  children?: React.ReactNode;
}

const StyledDivider = styled.hr<{ $orientation?: DividerProps['orientation']; $dashed?: boolean; $plain?: boolean }>`
  margin: ${({ $orientation }) => ($orientation === 'vertical' ? '0 var(--omf-spacing-4)' : 'var(--omf-spacing-4) 0')};
  border: none;

  ${({ $orientation, $dashed }) =>
    $orientation === 'vertical'
      ? `
        width: 1px;
        height: 100%;
        background: var(--omf-colors-border);
        display: inline-block;
      `
      : `
        height: 1px;
        background: ${$dashed ? 'var(--omf-colors-border-muted)' : 'var(--omf-colors-border)'};
        border-style: ${$dashed ? 'dashed' : 'solid'};
        width: 100%;
      `}

  ${({ $plain, $orientation, children }) =>
    children &&
    !$plain &&
    $orientation !== 'vertical' &&
    `
      display: flex;
      align-items: center;
      gap: var(--omf-spacing-4);
      color: var(--omf-colors-text-muted);
      font-size: var(--omf-typography-fontSize-sm);
      height: auto;
      background: none;
      border: none;
      margin: var(--omf-spacing-6) 0;

      &::before,
      &::after {
        content: '';
        flex: 1;
        height: 1px;
        background: var(--omf-colors-border);
      }
    `}
`;

const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', dashed = false, plain = false, children, className, ...props }, ref) => {
    if (children && !plain && orientation !== 'vertical') {
      return (
        <StyledDivider
          ref={ref}
          $orientation={orientation}
          $dashed={dashed}
          $plain={plain}
          className={className}
          role="separator"
          {...props}
        >
          {children}
        </StyledDivider>
      );
    }

    return (
      <StyledDivider
        ref={ref}
        $orientation={orientation}
        $dashed={dashed}
        $plain={plain}
        className={className}
        role="separator"
        {...props}
      />
    );
  },
);

Divider.displayName = 'Divider';

export { Divider };