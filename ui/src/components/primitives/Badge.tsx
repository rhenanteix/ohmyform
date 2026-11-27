import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'draft';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

const StyledBadge = styled.span<{
  $variant: BadgeProps['variant'];
  $size: BadgeProps['size'];
  $dot: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: var(--omf-spacing-1);
  font-weight: var(--omf-typography-fontWeight-semibold);
  border-radius: var(--omf-borderRadius-full);
  white-space: nowrap;
  border: 1px solid transparent;

  ${({ $size }) => {
    const sizes = {
      sm: css`
        padding: var(--omf-spacing-0) var(--omf-spacing-2);
        font-size: var(--omf-typography-fontSize-xs);
        height: 20px;
      `,
      md: css`
        padding: var(--omf-spacing-1) var(--omf-spacing-2);
        font-size: var(--omf-typography-fontSize-sm);
        height: 24px;
      `,
      lg: css`
        padding: var(--omf-spacing-1) var(--omf-spacing-3);
        font-size: var(--omf-typography-fontSize-base);
        height: 28px;
      `,
    };
    return sizes[$size || 'md'];
  }}

  ${({ $variant, $dot }) => {
    const variants = {
      default: css`
        background: var(--omf-colors-background-tertiary);
        color: var(--omf-colors-text-secondary);
        border-color: var(--omf-colors-border);
      `,
      primary: css`
        background: var(--omf-colors-primary-50);
        color: var(--omf-colors-primary-700);
        border-color: var(--omf-colors-primary-200);
        [data-theme="dark"] & {
          background: var(--omf-colors-primary-900);
          color: var(--omf-colors-primary-300);
          border-color: var(--omf-colors-primary-700);
        }
      `,
      success: css`
        background: var(--omf-colors-semantic-success-light);
        color: var(--omf-colors-semantic-success-dark);
        border-color: var(--omf-colors-semantic-success-light);
        [data-theme="dark"] & {
          background: var(--omf-colors-semantic-success-light);
          color: var(--omf-colors-semantic-success-DEFAULT);
        }
      `,
      warning: css`
        background: var(--omf-colors-semantic-warning-light);
        color: var(--omf-colors-semantic-warning-dark);
        border-color: var(--omf-colors-semantic-warning-light);
        [data-theme="dark"] & {
          background: var(--omf-colors-semantic-warning-light);
          color: var(--omf-colors-semantic-warning-DEFAULT);
        }
      `,
      error: css`
        background: var(--omf-colors-semantic-error-light);
        color: var(--omf-colors-semantic-error-dark);
        border-color: var(--omf-colors-semantic-error-light);
        [data-theme="dark"] & {
          background: var(--omf-colors-semantic-error-light);
          color: var(--omf-colors-semantic-error-DEFAULT);
        }
      `,
      info: css`
        background: var(--omf-colors-semantic-info-light);
        color: var(--omf-colors-semantic-info-dark);
        border-color: var(--omf-colors-semantic-info-light);
        [data-theme="dark"] & {
          background: var(--omf-colors-semantic-info-light);
          color: var(--omf-colors-semantic-info-DEFAULT);
        }
      `,
      draft: css`
        background: var(--omf-colors-background-tertiary);
        color: var(--omf-colors-text-muted);
        border-color: var(--omf-colors-border);
      `,
    };

    const baseStyle = variants[$variant || 'default'];

    if ($dot) {
      return css`
        ${baseStyle}
        &::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          flex-shrink: 0;
        }
      `;
    }

    return baseStyle;
  }}
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-left: var(--omf-spacing-1);
  border-radius: var(--omf-borderRadius-full);
  color: inherit;
  opacity: 0.7;
  transition: opacity var(--omf-transitions-fast), background var(--omf-transitions-fast);

  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.1);
  }

  [data-theme="dark"] &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:focus-visible {
    outline: 2px solid var(--omf-colors-border-focus);
    outline-offset: 1px;
  }
`;

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', dot = false, removable = false, onRemove, children, className, ...props }, ref) => {
    return (
      <StyledBadge
        ref={ref}
        $variant={variant}
        $size={size}
        $dot={dot}
        className={className}
        {...props}
      >
        {children}
        {removable && (
          <RemoveButton
            type="button"
            onClick={onRemove}
            aria-label="Remover"
            tabIndex={-1}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </RemoveButton>
        )}
      </StyledBadge>
    );
  },
);

Badge.displayName = 'Badge';

export { Badge };