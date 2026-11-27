import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'dashed';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
}

const StyledButton = styled.button<{
  $variant: ButtonProps['variant'];
  $size: ButtonProps['size'];
  $fullWidth: boolean;
  $loading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--omf-spacing-2);
  font-family: var(--omf-typography-fontFamily-sans);
  font-weight: var(--omf-typography-fontWeight-semibold);
  border-radius: var(--omf-borderRadius-md);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--omf-transitions-fast);
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  pointer-events: ${({ $loading }) => ($loading ? 'none' : 'auto')};

  ${({ $size }) => {
    const sizes = {
      sm: css`
        height: 32px;
        padding: 0 var(--omf-spacing-3);
        font-size: var(--omf-typography-fontSize-sm);
        gap: var(--omf-spacing-1);
      `,
      md: css`
        height: 40px;
        padding: 0 var(--omf-spacing-4);
        font-size: var(--omf-typography-fontSize-base);
        gap: var(--omf-spacing-2);
      `,
      lg: css`
        height: 48px;
        padding: 0 var(--omf-spacing-6);
        font-size: var(--omf-typography-fontSize-lg);
        gap: var(--omf-spacing-2);
      `,
      xl: css`
        height: 56px;
        padding: 0 var(--omf-spacing-8);
        font-size: var(--omf-typography-fontSize-xl);
        gap: var(--omf-spacing-3);
      `,
    };
    return sizes[$size || 'md'];
  }}

  ${({ $variant }) => {
    const variants = {
      primary: css`
        background: var(--omf-gradients-primary);
        color: var(--omf-colors-semantic-success-foreground);
        box-shadow: none;
        &:hover:not(:disabled) {
          filter: brightness(1.05);
          box-shadow: var(--omf-shadows-sm);
          transform: translateY(-1px);
        }
        &:active:not(:disabled) {
          transform: translateY(0);
        }
      `,
      secondary: css`
        background: var(--omf-colors-background-primary);
        color: var(--omf-colors-text-primary);
        border-color: var(--omf-colors-border);
        box-shadow: var(--omf-shadows-sm);
        &:hover:not(:disabled) {
          background: var(--omf-colors-background-tertiary);
          border-color: var(--omf-colors-border-strong);
          box-shadow: var(--omf-shadows-DEFAULT);
        }
      `,
      outline: css`
        background: transparent;
        color: var(--omf-colors-primary-600);
        border-color: var(--omf-colors-primary-300);
        &:hover:not(:disabled) {
          background: var(--omf-colors-primary-50);
          border-color: var(--omf-colors-primary-500);
        }
        [data-theme="dark"] & {
          color: var(--omf-colors-primary-400);
          border-color: var(--omf-colors-primary-700);
          &:hover:not(:disabled) {
            background: var(--omf-colors-primary-900);
            border-color: var(--omf-colors-primary-500);
          }
        }
      `,
      ghost: css`
        background: transparent;
        color: var(--omf-colors-text-secondary);
        &:hover:not(:disabled) {
          background: var(--omf-colors-background-tertiary);
          color: var(--omf-colors-text-primary);
        }
      `,
      danger: css`
        background: var(--omf-colors-semantic-error-DEFAULT);
        color: var(--omf-colors-semantic-error-foreground);
        box-shadow: 0 4px 14px 0 rgba(239, 68, 68, 0.35);
        &:hover:not(:disabled) {
          filter: brightness(1.05);
          box-shadow: 0 6px 20px 0 rgba(239, 68, 68, 0.45);
          transform: translateY(-1px);
        }
        &:active:not(:disabled) {
          transform: translateY(0);
        }
      `,
      dashed: css`
        background: transparent;
        color: var(--omf-colors-text-secondary);
        border: 1px dashed var(--omf-colors-border);
        &:hover:not(:disabled) {
          background: var(--omf-colors-background-tertiary);
          border-color: var(--omf-colors-primary-400);
          color: var(--omf-colors-primary-600);
        }
        [data-theme="dark"] & {
          &:hover:not(:disabled) {
            border-color: var(--omf-colors-primary-500);
            color: var(--omf-colors-primary-400);
          }
        }
      `,
    };
    return variants[$variant || 'primary'];
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  &:focus-visible {
    outline: 3px solid var(--omf-colors-border-focus);
    outline-offset: 2px;
  }
`;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      as: Component = 'button',
      href,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isLink = Component === 'a' || href;

    const content = (
      <>
        {loading && (
          <svg
            className="button-spinner"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="31.4 31.4"
              style={{ animation: 'spin 0.8s linear infinite' }}
            />
          </svg>
        )}
        {!loading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
        <span>{children}</span>
        {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </>
    );

    if (isLink) {
      return (
        <StyledButton
          as={Component}
          href={href}
          ref={ref}
          $variant={variant}
          $size={size}
          $fullWidth={fullWidth}
          $loading={loading}
          disabled={disabled}
          aria-disabled={disabled || loading}
          aria-busy={loading}
          {...props}
        >
          {content}
        </StyledButton>
      );
    }

    return (
      <StyledButton
        ref={ref}
        type="button"
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        $loading={loading}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {content}
      </StyledButton>
    );
  },
);

Button.displayName = 'Button';

export { Button };