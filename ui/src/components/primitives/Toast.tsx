import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  onClose: (id: string) => void;
}

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideOut = keyframes`
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(100%); }
`;

const ToastContainer = styled.div<{ $type: ToastProps['type']; $exiting: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: var(--omf-spacing-3);
  padding: var(--omf-spacing-4);
  min-width: 320px;
  max-width: 480px;
  background: var(--omf-colors-background-primary);
  border: 1px solid ${({ $type }) => {
    const colors = {
      success: 'var(--omf-colors-semantic-success-DEFAULT)',
      error: 'var(--omf-colors-semantic-error-DEFAULT)',
      warning: 'var(--omf-colors-semantic-warning-DEFAULT)',
      info: 'var(--omf-colors-semantic-info-DEFAULT)',
    };
    return colors[$type];
  }};
  border-radius: var(--omf-borderRadius-lg);
  box-shadow: var(--omf-shadows-lg);
  animation: ${({ $exiting }) => ($exiting ? slideOut : slideIn)} var(--omf-transitions-fast) ease-out forwards;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${({ $type }) => {
      const colors = {
        success: 'var(--omf-colors-semantic-success-DEFAULT)',
        error: 'var(--omf-colors-semantic-error-DEFAULT)',
        warning: 'var(--omf-colors-semantic-warning-DEFAULT)',
        info: 'var(--omf-colors-semantic-info-DEFAULT)',
      };
      return colors[$type];
    }};
  }
`;

const IconWrapper = styled.div<{ $type: ToastProps['type'] }>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: var(--omf-borderRadius-full);
  background: ${({ $type }) => {
    const colors = {
      success: 'var(--omf-colors-semantic-success-light)',
      error: 'var(--omf-colors-semantic-error-light)',
      warning: 'var(--omf-colors-semantic-warning-light)',
      info: 'var(--omf-colors-semantic-info-light)',
    };
    return colors[$type];
  }};
  color: ${({ $type }) => {
    const colors = {
      success: 'var(--omf-colors-semantic-success-dark)',
      error: 'var(--omf-colors-semantic-error-dark)',
      warning: 'var(--omf-colors-semantic-warning-dark)',
      info: 'var(--omf-colors-semantic-info-dark)',
    };
    return colors[$type];
  }};
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.h4`
  margin: 0 0 var(--omf-spacing-1);
  font-size: var(--omf-typography-fontSize-sm);
  font-weight: var(--omf-typography-fontWeight-semibold);
  color: var(--omf-colors-text-primary);
  line-height: var(--omf-typography-lineHeight-snug);
`;

const Description = styled.p`
  margin: 0;
  font-size: var(--omf-typography-fontSize-sm);
  color: var(--omf-colors-text-secondary);
  line-height: var(--omf-typography-lineHeight-normal);
`;

const ActionButton = styled.button`
  margin-top: var(--omf-spacing-2);
  padding: var(--omf-spacing-1) var(--omf-spacing-3);
  font-size: var(--omf-typography-fontSize-sm);
  font-weight: var(--omf-typography-fontWeight-semibold);
  color: inherit;
  background: transparent;
  border: 1px solid currentColor;
  border-radius: var(--omf-borderRadius-md);
  cursor: pointer;
  transition: all var(--omf-transitions-fast);

  &:hover {
    background: currentColor;
    color: var(--omf-colors-background-primary);
  }

  &:focus-visible {
    outline: 3px solid var(--omf-colors-border-focus);
    outline-offset: 2px;
  }
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-top: -4px;
  margin-right: -4px;
  border-radius: var(--omf-borderRadius-full);
  color: var(--omf-colors-text-muted);
  background: transparent;
  cursor: pointer;
  transition: all var(--omf-transitions-fast);

  &:hover {
    color: var(--omf-colors-text-primary);
    background: var(--omf-colors-background-tertiary);
  }

  &:focus-visible {
    outline: 3px solid var(--omf-colors-border-focus);
    outline-offset: 2px;
  }
`;

const icons = {
  success: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

export function Toast({ id, type, title, description, action, duration = 5000, onClose }: ToastProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onClose(id), 200);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => onClose(id), 200);
  };

  return createPortal(
    <ToastContainer $type={type} $exiting={exiting} role="alert" aria-live="polite">
      <IconWrapper $type={type}>{icons[type]}</IconWrapper>
      <Content>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        {action && <ActionButton onClick={action.onClick}>{action.label}</ActionButton>}
      </Content>
      <CloseButton onClick={handleClose} aria-label="Fechar notificação">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </CloseButton>
    </ToastContainer>,
    document.body,
  );
}

export interface ToastContextValue {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id' | 'onClose'>) => string;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (toast: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast = { ...toast, id, onClose: removeToast };
    setToasts((prev) => [...prev, newToast]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div style={{ position: 'fixed', top: 'var(--omf-spacing-6)', right: 'var(--omf-spacing-6)', zIndex: 'var(--omf-zIndex-toast)', display: 'flex', flexDirection: 'column', gap: 'var(--omf-spacing-3)', pointerEvents: 'none' }}>
        {toasts.map((toast) => (
          <div key={toast.id} style={{ pointerEvents: 'auto' }}>
            <Toast {...toast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}