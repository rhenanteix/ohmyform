import React, { forwardRef, useState, useRef, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  children?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'line' | 'enclosed' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  scrollable?: boolean;
}

const StyledTabs = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

const TabList = styled.div<{ $variant: TabsProps['variant']; $scrollable: boolean }>`
  display: flex;
  gap: ${({ $variant }) => ($variant === 'enclosed' ? '0' : 'var(--omf-spacing-1)')};
  border-bottom: ${({ $variant }) => ($variant === 'line' ? '1px solid var(--omf-colors-border)' : 'none')};
  background: ${({ $variant }) =>
    $variant === 'soft' ? 'var(--omf-colors-background-secondary)' : $variant === 'enclosed' ? 'var(--omf-colors-background-secondary)' : 'transparent'};
  border-radius: ${({ $variant }) => ($variant === 'line' ? '0' : 'var(--omf-borderRadius-lg)')};
  padding: ${({ $variant }) => ($variant === 'line' ? '0' : 'var(--omf-spacing-1)')};
  overflow-x: ${({ $scrollable }) => ($scrollable ? 'auto' : 'visible')};
  scrollbar-width: thin;
  scrollbar-color: var(--omf-colors-border) transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--omf-colors-border);
    border-radius: var(--omf-borderRadius-full);
  }
`;

const TabButton = styled.button<{
  $active: boolean;
  $variant: TabsProps['variant'];
  $size: TabsProps['size'];
  $disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--omf-spacing-2);
  border: none;
  background: ${({ $active, $variant, $disabled }) => {
    if ($disabled) return 'transparent';
    if ($active) {
      if ($variant === 'line') return 'transparent';
      if ($variant === 'enclosed') return 'var(--omf-colors-background-primary)';
      if ($variant === 'soft') return 'var(--omf-colors-primary-100)';
    }
    return 'transparent';
  }};
  color: ${({ $active, $disabled, $variant }) => {
    if ($disabled) return 'var(--omf-colors-text-muted)';
    if ($active) {
      if ($variant === 'line') return 'var(--omf-colors-primary-600)';
      if ($variant === 'enclosed') return 'var(--omf-colors-primary-600)';
      if ($variant === 'soft') return 'var(--omf-colors-primary-700)';
    }
    return 'var(--omf-colors-text-secondary)';
  }};
  font-family: var(--omf-typography-fontFamily-sans);
  font-size: ${({ $size }) => {
    const sizes = {
      sm: 'var(--omf-typography-fontSize-sm)',
      md: 'var(--omf-typography-fontSize-base)',
      lg: 'var(--omf-typography-fontSize-lg)',
    };
    return sizes[$size || 'md'];
  }};
  font-weight: ${({ $active }) => ($active ? 'var(--omf-typography-fontWeight-semibold)' : 'var(--omf-typography-fontWeight-medium)')};
  border-radius: ${({ $variant }) => ($variant === 'line' ? '0' : 'var(--omf-borderRadius-md)')};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  white-space: nowrap;
  transition: all var(--omf-transitions-fast);
  position: relative;

  ${({ $size }) => {
    const sizes = {
      sm: css`
        padding: var(--omf-spacing-1) var(--omf-spacing-2);
        min-height: 32px;
      `,
      md: css`
        padding: var(--omf-spacing-2) var(--omf-spacing-3);
        min-height: 40px;
      `,
      lg: css`
        padding: var(--omf-spacing-3) var(--omf-spacing-4);
        min-height: 48px;
      `,
    };
    return sizes[$size || 'md'];
  }}

  ${({ $active, $variant }) =>
    $active &&
    $variant === 'line' &&
    css`
      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 3px;
        background: var(--omf-gradients-primary);
        border-radius: var(--omf-borderRadius-full) var(--omf-borderRadius-full) 0 0;
      }
    `}

  ${({ $active, $variant }) =>
    $active &&
    $variant === 'enclosed' &&
    css`
      box-shadow: var(--omf-shadows-sm);
      border-bottom: 1px solid var(--omf-colors-background-primary);
      margin-bottom: -1px;
      z-index: 1;
    `}

  &:hover:not(:disabled) {
    color: ${({ $active, $variant }) => {
      if ($active) return 'inherit';
      if ($variant === 'soft') return 'var(--omf-colors-primary-600)';
      return 'var(--omf-colors-text-primary)';
    }};
    background: ${({ $active, $variant }) => {
      if ($active) return 'inherit';
      if ($variant === 'soft') return 'var(--omf-colors-primary-50)';
      return 'var(--omf-colors-background-tertiary)';
    }};

    [data-theme="dark"] & {
      background: ${({ $active, $variant }) => {
        if ($active) return 'inherit';
        if ($variant === 'soft') return 'var(--omf-colors-primary-900)';
        return 'var(--omf-colors-background-tertiary)';
      }};
    }
  }

  &:focus-visible {
    outline: 3px solid var(--omf-colors-border-focus);
    outline-offset: -3px;
    border-radius: ${({ $variant }) => ($variant === 'line' ? '0' : 'var(--omf-borderRadius-md)')};
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 var(--omf-spacing-1);
  font-size: var(--omf-typography-fontSize-xs);
  font-weight: var(--omf-typography-fontWeight-bold);
  color: var(--omf-colors-semantic-success-foreground);
  background: var(--omf-colors-semantic-success-DEFAULT);
  border-radius: var(--omf-borderRadius-full);
  line-height: 1;

  [data-theme="dark"] & {
    background: var(--omf-colors-semantic-success-DEFAULT);
    color: var(--omf-colors-semantic-success-foreground);
  }
`;

const TabPanel = styled.div`
  padding: var(--omf-spacing-6) 0;
  animation: fadeIn 150ms ease-out;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      tabs,
      activeTab,
      onChange,
      variant = 'line',
      size = 'md',
      fullWidth = false,
      scrollable = true,
    },
    ref,
  ) => {
    const tabListRef = useRef<HTMLDivElement>(null);

    const scrollToActive = () => {
      if (!tabListRef.current) return;
      const activeButton = tabListRef.current.querySelector('[data-active="true"]');
      if (activeButton) {
        activeButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    };

    useEffect(() => {
      scrollToActive();
    }, [activeTab]);

    return (
      <StyledTabs ref={ref} $fullWidth={fullWidth}>
        <TabList
          ref={tabListRef}
          role="tablist"
          aria-orientation="horizontal"
          $variant={variant}
          $scrollable={scrollable}
        >
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              disabled={tab.disabled}
              $active={activeTab === tab.id}
              $variant={variant}
              $size={size}
              $disabled={tab.disabled || false}
              data-active={activeTab === tab.id}
              onClick={() => !tab.disabled && onChange(tab.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  !tab.disabled && onChange(tab.id);
                }
              }}
            >
              {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && <Badge>{tab.badge}</Badge>}
            </TabButton>
          ))}
        </TabList>
        {tabs.map((tab) => (
          <TabPanel
            key={`panel-${tab.id}`}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            tabIndex={activeTab === tab.id ? 0 : -1}
          >
            {tab.children}
          </TabPanel>
        ))}
      </StyledTabs>
    );
  },
);

Tabs.displayName = 'Tabs';

export { Tabs };