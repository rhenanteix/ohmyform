import React, { forwardRef, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled, { css, keyframes } from 'styled-components';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  footer?: React.ReactNode;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const slideDown = keyframes`
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(20px) scale(0.95); }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: var(--omf-colors-overlay-medium);
  backdrop-filter: blur(2px);
  z-index: var(--omf-zIndex-modalBackdrop);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--omf-spacing-4);
  animation: ${({ $isOpen }) => ($isOpen ? fadeIn : fadeOut)} var(--omf-transitions-fast) ease-out;
`;

const ModalContainer = styled.div<{ $size: ModalProps['size']; $isOpen: boolean }>`
  position: relative;
  background: var(--omf-colors-background-primary);
  border-radius: var(--omf-borderRadius-2xl);
  box-shadow: var(--omf-shadows-xl);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  animation: ${({ $isOpen }) => ($isOpen ? slideUp : slideDown)} var(--omf-transitions-DEFAULT) ease-out;

  ${({ $size }) => {
    const sizes = {
      sm: css`max-width: 360px;`,
      md: css`max-width: 520px;`,
      lg: css`max-width: 720px;`,
      xl: css`max-width: 960px;`,
      full: css`max-width: calc(100vw - 32px); max-height: calc(100vh - 32px);`,
    };
    return sizes[$size || 'md'];
  }}
`;

const CloseButton = styled.button`
  position: absolute;
  top: var(--omf-spacing-4);
  right: var(--omf-spacing-4);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--omf-borderRadius-full);
  background: var(--omf-colors-background-secondary);
  color: var(--omf-colors-text-secondary);
  border: 1px solid var(--omf-colors-border);
  transition: all var(--omf-transitions-fast);

  &:hover {
    background: var(--omf-colors-background-tertiary);
    color: var(--omf-colors-text-primary);
    border-color: var(--omf-colors-border-strong);
  }

  &:focus-visible {
    outline: 3px solid var(--omf-colors-border-focus);
    outline-offset: 2px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--omf-spacing-4);
  padding: var(--omf-spacing-6) var(--omf-spacing-6) var(--omf-spacing-4);
  border-bottom: 1px solid var(--omf-colors-border-muted);
`;

const Title = styled.h2`
  margin: 0;
  font-size: var(--omf-typography-fontSize-xl);
  font-weight: var(--omf-typography-fontWeight-bold);
  color: var(--omf-colors-text-primary);
  line-height: var(--omf-typography-lineHeight-tight);
`;

const Description = styled.p`
  margin: var(--omf-spacing-1) 0 0;
  font-size: var(--omf-typography-fontSize-sm);
  color: var(--omf-colors-text-secondary);
  line-height: var(--omf-typography-lineHeight-normal);
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--omf-spacing-6);
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--omf-spacing-3);
  padding: var(--omf-spacing-4) var(--omf-spacing-6);
  border-top: 1px solid var(--omf-colors-border-muted);
  background: var(--omf-colors-background-secondary);
  border-radius: 0 0 var(--omf-borderRadius-2xl) var(--omf-borderRadius-2xl);
`;

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      children,
      size = 'md',
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      footer,
    },
    ref,
  ) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (isOpen) {
        previousActiveElement.current = document.activeElement as HTMLElement;
        document.body.style.overflow = 'hidden';
        document.body.setAttribute('data-modal-open', 'true');
        contentRef.current?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Escape' && closeOnEscape) {
            onClose();
          }
          if (e.key === 'Tab') {
            const focusableElements = contentRef.current?.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            );
            if (focusableElements && focusableElements.length > 0) {
              const first = focusableElements[0];
              const last = focusableElements[focusableElements.length - 1];
              if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
              } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
              }
            }
          }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.body.style.overflow = '';
          document.body.removeAttribute('data-modal-open');
          previousActiveElement.current?.focus();
        };
      }
    }, [isOpen, closeOnEscape, onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && closeOnOverlayClick) {
        onClose();
      }
    };

    const modalContent = (
      <Overlay $isOpen={isOpen} onClick={handleOverlayClick} ref={overlayRef} role="presentation">
        <ModalContainer
          ref={contentRef}
          $size={size}
          $isOpen={isOpen}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
          tabIndex={-1}
        >
          {showCloseButton && (
            <CloseButton onClick={onClose} aria-label="Fechar modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </CloseButton>
          )}
          {(title || description) && (
            <Header>
              <div>
                {title && <Title id="modal-title">{title}</Title>}
                {description && <Description id="modal-description">{description}</Description>}
              </div>
            </Header>
          )}
          <Content>{children}</Content>
          {footer && <Footer>{footer}</Footer>}
        </ModalContainer>
      </Overlay>
    );

    if (typeof window === 'undefined') {
      return null;
    }

    return createPortal(modalContent, document.body);
  },
);

Modal.displayName = 'Modal';

export { Modal };