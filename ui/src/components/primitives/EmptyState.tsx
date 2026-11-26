import React from 'react';
import styled from 'styled-components';

export interface EmptyStateProps {
  variant?: 'default' | 'search' | 'error' | 'offline' | 'first-time';
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  size?: 'sm' | 'md' | 'lg';
  illustration?: React.ReactNode;
}

const Wrapper = styled.div<{ $size: EmptyStateProps['size'] }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ $size }) => {
    const sizes = {
      sm: 'var(--omf-spacing-8) var(--omf-spacing-4)',
      md: 'var(--omf-spacing-12) var(--omf-spacing-6)',
      lg: 'var(--omf-spacing-16) var(--omf-spacing-8)',
    };
    return sizes[$size || 'md'];
  }};
  min-height: ${({ $size }) => {
    const sizes = {
      sm: '200px',
      md: '300px',
      lg: '400px',
    };
    return sizes[$size || 'md'];
  }};
`;

const IllustrationWrapper = styled.div<{ $variant: EmptyStateProps['variant']; $size: EmptyStateProps['size'] }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => {
    const sizes = {
      sm: '64px',
      md: '96px',
      lg: '128px',
    };
    return sizes[$size || 'md'];
  }};
  height: ${({ $size }) => {
    const sizes = {
      sm: '64px',
      md: '96px',
      lg: '128px',
    };
    return sizes[$size || 'md'];
  }};
  border-radius: var(--omf-borderRadius-2xl);
  margin-bottom: var(--omf-spacing-6);
  background: ${({ $variant }) => {
    const colors = {
      default: 'var(--omf-colors-primary-50)',
      search: 'var(--omf-colors-background-tertiary)',
      error: 'var(--omf-colors-semantic-error-light)',
      offline: 'var(--omf-colors-semantic-warning-light)',
      'first-time': 'var(--omf-colors-primary-50)',
    };
    return colors[$variant || 'default'];
  }};
  color: ${({ $variant }) => {
    const colors = {
      default: 'var(--omf-colors-primary-600)',
      search: 'var(--omf-colors-text-muted)',
      error: 'var(--omf-colors-semantic-error-dark)',
      offline: 'var(--omf-colors-semantic-warning-dark)',
      'first-time': 'var(--omf-colors-primary-600)',
    };
    return colors[$variant || 'default'];
  }};
  font-size: ${({ $size }) => {
    const sizes = {
      sm: '24px',
      md: '36px',
      lg: '48px',
    };
    return sizes[$size || 'md'];
  }};

  [data-theme="dark"] & {
    background: ${({ $variant }) => {
      const colors = {
        default: 'var(--omf-colors-primary-900)',
        search: 'var(--omf-colors-background-tertiary)',
        error: 'var(--omf-colors-semantic-error-light)',
        offline: 'var(--omf-colors-semantic-warning-light)',
        'first-time': 'var(--omf-colors-primary-900)',
      };
      return colors[$variant || 'default'];
    }};
    color: ${({ $variant }) => {
      const colors = {
        default: 'var(--omf-colors-primary-300)',
        search: 'var(--omf-colors-text-muted)',
        error: 'var(--omf-colors-semantic-error-DEFAULT)',
        offline: 'var(--omf-colors-semantic-warning-DEFAULT)',
        'first-time': 'var(--omf-colors-primary-300)',
      };
      return colors[$variant || 'default'];
    }};
  }
`;

const Title = styled.h3`
  margin: 0 0 var(--omf-spacing-2);
  font-size: var(--omf-typography-fontSize-xl);
  font-weight: var(--omf-typography-fontWeight-bold);
  color: var(--omf-colors-text-primary);
  line-height: var(--omf-typography-lineHeight-tight);
`;

const Description = styled.p`
  margin: 0 0 var(--omf-spacing-6);
  font-size: var(--omf-typography-fontSize-base);
  color: var(--omf-colors-text-secondary);
  line-height: var(--omf-typography-lineHeight-relaxed);
  max-width: 400px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--omf-spacing-3);
  flex-wrap: wrap;
`;

import { Button } from './Button';

const defaultIcons = {
  default: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      <path d="M21 3.5l-6 6m-6-6l6 6" />
    </svg>
  ),
  search: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  error: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  offline: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M16.72 11.06A10.94 10.94 0 0119 12.55" />
      <path d="M5 12.55a10.94 10.94 0 015.17-2.39" />
      <path d="M10.71 5.05A16 16 0 0122.58 9" />
      <path d="M1.42 9a15.91 15.91 0 014.7-2.88" />
      <path d="M8.53 16.11a6 6 0 016.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  ),
  'first-time': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
};

export function EmptyState({
  variant = 'default',
  title,
  description,
  icon,
  action,
  secondaryAction,
  size = 'md',
  illustration,
}: EmptyStateProps) {
  return (
    <Wrapper $size={size}>
      {illustration ? (
        <div style={{ marginBottom: 'var(--omf-spacing-6)' }}>{illustration}</div>
      ) : (
        <IllustrationWrapper $variant={variant} $size={size} aria-hidden="true">
          {icon || defaultIcons[variant]}
        </IllustrationWrapper>
      )}
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {(action || secondaryAction) && (
        <Actions>
          {secondaryAction && (
            <Button variant="ghost" size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'} onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
          {action && (
            <Button variant={action.variant || 'primary'} size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'} onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </Actions>
      )}
    </Wrapper>
  );
}