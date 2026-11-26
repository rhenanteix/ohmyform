import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { css, keyframes } from 'styled-components';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  disabled?: boolean;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const TooltipContainer = styled.div<{ $placement: TooltipProps['placement'] }>`
  position: fixed;
  z-index: var(--omf-zIndex-tooltip);
  pointer-events: none;
  animation: ${fadeIn} 100ms ease-out;

  &[data-placement="top"] {
    margin-bottom: 8px;
  }

  &[data-placement="bottom"] {
    margin-top: 8px;
  }

  &[data-placement="left"] {
    margin-right: 8px;
  }

  &[data-placement="right"] {
    margin-left: 8px;
  }
`;

const TooltipContent = styled.div`
  padding: var(--omf-spacing-1) var(--omf-spacing-2);
  font-size: var(--omf-typography-fontSize-sm);
  font-weight: var(--omf-typography-fontWeight-medium);
  color: var(--omf-colors-text-inverse);
  background: var(--omf-colors-text-primary);
  border-radius: var(--omf-borderRadius-md);
  white-space: nowrap;
  box-shadow: var(--omf-shadows-lg);
  max-width: 280px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Arrow = styled.div<{ $placement: TooltipProps['placement'] }>`
  position: absolute;
  width: 0;
  height: 0;
  border: 5px solid transparent;

  ${({ $placement }) => {
    switch ($placement) {
      case 'top':
        return css`
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          border-top-color: var(--omf-colors-text-primary);
        `;
      case 'bottom':
        return css`
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          border-bottom-color: var(--omf-colors-text-primary);
        `;
      case 'left':
        return css`
          right: -10px;
          top: 50%;
          transform: translateY(-50%);
          border-left-color: var(--omf-colors-text-primary);
        `;
      case 'right':
        return css`
          left: -10px;
          top: 50%;
          transform: translateY(-50%);
          border-right-color: var(--omf-colors-text-primary);
        `;
    }
  }}
`;

export function Tooltip({ content, children, placement = 'top', delay = 200, disabled = false }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const updatePosition = () => {
    if (!childRef.current || !tooltipRef.current) return;

    const childRect = childRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = childRect.top - tooltipRect.height - 8;
        left = childRect.left + (childRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = childRect.bottom + 8;
        left = childRect.left + (childRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = childRect.top + (childRect.height - tooltipRect.height) / 2;
        left = childRect.left - tooltipRect.width - 8;
        break;
      case 'right':
        top = childRect.top + (childRect.height - tooltipRect.height) / 2;
        left = childRect.right + 8;
        break;
    }

    if (left < 8) left = 8;
    if (left + tooltipRect.width > viewportWidth - 8) left = viewportWidth - tooltipRect.width - 8;
    if (top < 8) top = 8;
    if (top + tooltipRect.height > viewportHeight - 8) top = viewportHeight - tooltipRect.height - 8;

    setPosition({ top, left });
  };

  const showTooltip = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      requestAnimationFrame(updatePosition);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      hideTooltip();
    }
  };

  useEffect(() => {
    if (isVisible) {
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isVisible]);

  const childWithRef = React.cloneElement(children, {
    ref: childRef,
    onMouseEnter: (e: React.MouseEvent) => {
      showTooltip();
      children.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hideTooltip();
      children.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      showTooltip();
      children.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hideTooltip();
      children.props.onBlur?.(e);
    },
    onKeyDown: handleKeyDown,
  });

  const tooltipContent = isVisible ? (
    <TooltipContainer
      ref={tooltipRef}
      $placement={placement}
      data-placement={placement}
      style={{ top: position.top, left: position.left }}
      role="tooltip"
      aria-hidden="false"
    >
      <TooltipContent>{content}</TooltipContent>
      <Arrow $placement={placement} aria-hidden="true" />
    </TooltipContainer>
  ) : null;

  return (
    <>
      {childWithRef}
      {tooltipContent ? createPortal(tooltipContent, document.body) : null}
    </>
  );
}