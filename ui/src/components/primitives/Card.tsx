import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  interactive?: boolean;
}

const StyledCard = styled.div<{
  $variant: CardProps['variant'];
  $padding: CardProps['padding'];
  $hover: boolean;
  $interactive: boolean;
}>`
  background: var(--omf-colors-background-primary);
  border-radius: var(--omf-borderRadius-xl);
  transition: all var(--omf-transitions-DEFAULT);
  position: relative;
  overflow: hidden;

  ${({ $variant }) => {
    const variants = {
      default: css`
        box-shadow: var(--omf-shadows-sm);
        border: 1px solid var(--omf-colors-border);
      `,
      elevated: css`
        box-shadow: var(--omf-shadows-lg);
        border: none;
      `,
      outlined: css`
        box-shadow: var(--omf-shadows-sm);
        border: 1px solid var(--omf-colors-border);
      `,
      filled: css`
        box-shadow: var(--omf-shadows-sm);
        border: 1px solid var(--omf-colors-border-muted);
        background: var(--omf-colors-background-secondary);
      `,
    };
    return variants[$variant || 'default'];
  }}

  ${({ $padding }) => {
    const paddings = {
      none: css`padding: 0;`,
      sm: css`padding: var(--omf-spacing-4);`,
      md: css`padding: var(--omf-spacing-6);`,
      lg: css`padding: var(--omf-spacing-8);`,
      xl: css`padding: var(--omf-spacing-10);`,
    };
    return paddings[$padding || 'md'];
  }}

  ${({ $hover, $interactive, $variant }) =>
    ($hover || $interactive) &&
    css`
      cursor: ${$interactive ? 'pointer' : 'default'};

      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--omf-shadows-lg);
        border-color: ${$variant === 'outlined' ? 'var(--omf-colors-primary-500)' : 'transparent'};
      }
    `}

  ${({ $interactive }) =>
    $interactive &&
    css`
      &:active {
        transform: translateY(0);
        transition: var(--omf-transitions-fast);
      }
    `}

  &:focus-visible {
    outline: 3px solid var(--omf-colors-border-focus);
    outline-offset: 2px;
  }
`;

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', hover = false, interactive = false, children, className, ...props }, ref) => {
    return (
      <StyledCard
        ref={ref}
        $variant={variant}
        $padding={padding}
        $hover={hover}
        $interactive={interactive}
        className={className}
        {...props}
      >
        {children}
      </StyledCard>
    );
  },
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 'var(--omf-spacing-4)',
        marginBottom: 'var(--omf-spacing-5)',
        flexWrap: 'wrap',
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  ),
);
CardHeader.displayName = 'CardHeader';

const StyledCardTitle = styled.h3<{ $withIcon?: boolean }>`
  margin: 0;
  font-size: var(--omf-typography-fontSize-xl);
  font-weight: var(--omf-typography-fontWeight-bold);
  color: var(--omf-colors-text-primary);
  line-height: var(--omf-typography-lineHeight-tight);
  display: flex;
  align-items: center;
  gap: var(--omf-spacing-2);

  ${({ $withIcon }) =>
    $withIcon &&
    css`
      &::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 2px;
        background: var(--omf-colors-primary-600);
      }
    `}
`;

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  $withIcon?: boolean;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, $withIcon, ...props }, ref) => (
    <StyledCardTitle ref={ref} className={className} $withIcon={$withIcon} {...props}>
      {children}
    </StyledCardTitle>
  ),
);
CardTitle.displayName = 'CardTitle';

export const CardSubtitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ children, className, ...props }, ref) => (
    <p
      ref={ref}
      className={className}
      style={{
        margin: 'var(--omf-spacing-1) 0 0',
        fontSize: 'var(--omf-typography-fontSize-sm)',
        color: 'var(--omf-colors-text-muted)',
        lineHeight: 'var(--omf-typography-lineHeight-relaxed)',
        ...props.style,
      }}
      {...props}
    >
      {children}
    </p>
  ),
);
CardSubtitle.displayName = 'CardSubtitle';

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  ),
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 'var(--omf-spacing-3)',
        marginTop: 'var(--omf-spacing-5)',
        paddingTop: 'var(--omf-spacing-4)',
        borderTop: '1px solid var(--omf-colors-border-muted)',
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  ),
);
CardFooter.displayName = 'CardFooter';

export { Card };