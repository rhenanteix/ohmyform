import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { css, keyframes } from 'styled-components';

export interface DropdownItem {
  label?: string;
  value?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
  header?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactElement;
  items: DropdownItem[];
  onSelect?: (value: string, item: DropdownItem) => void;
  placement?: 'bottom' | 'top' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  width?: number | 'auto' | 'trigger';
  maxHeight?: number;
  closeOnSelect?: boolean;
  disabled?: boolean;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-8px); }
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

const DropdownMenu = styled.div<{
  $placement: DropdownProps['placement'];
  $align: DropdownProps['align'];
  $width: DropdownProps['width'];
  $triggerWidth: number;
  $maxHeight?: number;
}>`
  position: fixed;
  z-index: var(--omf-zIndex-dropdown);
  min-width: ${({ $width, $triggerWidth }) =>
    $width === 'auto' ? '160px' : $width === 'trigger' ? `${$triggerWidth}px` : typeof $width === 'number' ? `${$width}px` : '160px'};
  max-width: 320px;
  max-height: ${({ $maxHeight }) => ($maxHeight ? `${$maxHeight}px` : '320px')};
  background: var(--omf-colors-background-primary);
  border: 1px solid var(--omf-colors-border);
  border-radius: var(--omf-borderRadius-lg);
  box-shadow: var(--omf-shadows-lg);
  overflow: hidden;
  animation: ${fadeIn} var(--omf-transitions-fast) ease-out;

  &[data-placement="bottom"] {
    margin-top: var(--omf-spacing-1);
  }

  &[data-placement="top"] {
    margin-bottom: var(--omf-spacing-1);
  }

  &[data-placement="left"] {
    margin-right: var(--omf-spacing-1);
  }

  &[data-placement="right"] {
    margin-left: var(--omf-spacing-1);
  }
`;

const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: var(--omf-spacing-1) 0;
  overflow-y: auto;
`;

const MenuItem = styled.li<{ $disabled?: boolean; $danger?: boolean; $header?: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--omf-spacing-2);
  padding: ${({ $header }) => ($header ? 'var(--omf-spacing-2) var(--omf-spacing-3)' : 'var(--omf-spacing-2) var(--omf-spacing-3)')};
  font-size: ${({ $header }) => ($header ? 'var(--omf-typography-fontSize-xs)' : 'var(--omf-typography-fontSize-sm)')};
  font-weight: ${({ $header }) => ($header ? 'var(--omf-typography-fontWeight-bold)' : 'var(--omf-typography-fontWeight-medium)')};
  color: ${({ $disabled, $danger, $header }) =>
    $disabled
      ? 'var(--omf-colors-text-muted)'
      : $danger
      ? 'var(--omf-colors-semantic-error-DEFAULT)'
      : $header
      ? 'var(--omf-colors-text-muted)'
      : 'var(--omf-colors-text-primary)'};
  text-transform: ${({ $header }) => ($header ? 'uppercase' : 'none')};
  letter-spacing: ${({ $header }) => ($header ? '0.08em' : 'normal')};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: background var(--omf-transitions-fast), color var(--omf-transitions-fast);
  user-select: none;
  white-space: nowrap;

  &:hover:not(:has(+ li[divider])) {
    background: ${({ $danger, $disabled, $header }) =>
      $disabled || $header
        ? 'transparent'
        : $danger
        ? 'var(--omf-colors-semantic-error-light)'
        : 'var(--omf-colors-primary-50)'};

    [data-theme="dark"] & {
      background: ${({ $danger, $disabled, $header }) =>
        $disabled || $header
          ? 'transparent'
          : $danger
          ? 'var(--omf-colors-semantic-error-light)'
          : 'var(--omf-colors-primary-900)'};
    }

    color: ${({ $danger }) => ($danger ? 'var(--omf-colors-semantic-error-dark)' : 'var(--omf-colors-primary-700)')};

    [data-theme="dark"] & {
      color: ${({ $danger }) => ($danger ? 'var(--omf-colors-semantic-error-DEFAULT)' : 'var(--omf-colors-primary-300)')};
    }
  }

  &:focus-visible {
    outline: none;
    background: ${({ $danger }) =>
      $danger ? 'var(--omf-colors-semantic-error-light)' : 'var(--omf-colors-primary-50)'};

    [data-theme="dark"] & {
      background: ${({ $danger }) =>
        $danger ? 'var(--omf-colors-semantic-error-light)' : 'var(--omf-colors-primary-900)'};
    }
  }
`;

const ItemIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--omf-colors-text-muted);
`;

const ItemLabel = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Divider = styled.li`
  height: 1px;
  background: var(--omf-colors-border-muted);
  margin: var(--omf-spacing-1) 0;
`;

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      trigger,
      items,
      onSelect,
      placement = 'bottom',
      align = 'start',
      width = 'trigger',
      maxHeight,
      closeOnSelect = true,
      disabled = false,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const triggerWidthRef = useRef(0);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen) return;
        if (e.key === 'Escape') {
          setIsOpen(false);
          triggerRef.current?.focus();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen]);

    useEffect(() => {
      if (isOpen && triggerRef.current) {
        triggerWidthRef.current = triggerRef.current.offsetWidth;
        positionMenu();
        window.addEventListener('resize', positionMenu);
        window.addEventListener('scroll', positionMenu, true);
      }
      return () => {
        window.removeEventListener('resize', positionMenu);
        window.removeEventListener('scroll', positionMenu, true);
      };
    }, [isOpen, placement, align]);

    const positionMenu = () => {
      if (!menuRef.current || !triggerRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = 0;
      let left = 0;

      switch (placement) {
        case 'bottom':
          top = triggerRect.bottom + 4;
          break;
        case 'top':
          top = triggerRect.top - menuRect.height - 4;
          break;
        case 'left':
          top = triggerRect.top;
          left = triggerRect.left - menuRect.width - 4;
          break;
        case 'right':
          top = triggerRect.top;
          left = triggerRect.right + 4;
          break;
      }

      switch (align) {
        case 'start':
          left = placement === 'left' || placement === 'right' ? left : triggerRect.left;
          break;
        case 'center':
          left = placement === 'left' || placement === 'right' ? left : triggerRect.left + (triggerRect.width - menuRect.width) / 2;
          break;
        case 'end':
          left = placement === 'left' || placement === 'right' ? left : triggerRect.right - menuRect.width;
          break;
      }

      if (left < 8) left = 8;
      if (left + menuRect.width > viewportWidth - 8) left = viewportWidth - menuRect.width - 8;
      if (top < 8) top = 8;
      if (top + menuRect.height > viewportHeight - 8) top = viewportHeight - menuRect.height - 8;

      menuRef.current.style.top = `${top}px`;
      menuRef.current.style.left = `${left}px`;
    };

    const handleItemClick = (item: DropdownItem) => {
      if (item.disabled || item.divider || item.header) return;
      onSelect?.(item.value, item);
      if (closeOnSelect) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      const enabledItems = items.filter((item) => !item.disabled && !item.divider && !item.header);
      const enabledIndices = items
        .map((item, i) => (!item.disabled && !item.divider && !item.header ? i : -1))
        .filter((i) => i !== -1);
      const currentIndex = enabledIndices.indexOf(index);

      const getMenuItem = (idx: number) =>
        menuRef.current?.querySelectorAll<HTMLDivElement>('[role="menuitem"]')?.[idx];

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (currentIndex < enabledIndices.length - 1) {
            const nextIndex = enabledIndices[currentIndex + 1];
            getMenuItem(enabledIndices.indexOf(nextIndex))?.focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (currentIndex > 0) {
            const prevIndex = enabledIndices[currentIndex - 1];
            getMenuItem(enabledIndices.indexOf(prevIndex))?.focus();
          }
          break;
        case 'Home':
          e.preventDefault();
          getMenuItem(enabledIndices[0])?.focus();
          break;
        case 'End':
          e.preventDefault();
          getMenuItem(enabledIndices[enabledIndices.length - 1])?.focus();
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleItemClick(items[index]);
          break;
      }
    };

    const menuContent = isOpen ? (
      <DropdownMenu
        ref={menuRef}
        $placement={placement}
        $align={align}
        $width={width}
        $triggerWidth={triggerWidthRef.current}
        $maxHeight={maxHeight}
        data-placement={placement}
        role="menu"
        aria-orientation="vertical"
        style={{ maxHeight: maxHeight ? `${maxHeight}px` : '320px' }}
      >
        <MenuList>
          {items.map((item, index) => {
            if (item.divider) {
              return <Divider key={`divider-${index}`} />;
            }
            if (item.header) {
              return (
                <MenuItem key={`header-${index}`} $header role="presentation">
                  {item.label}
                </MenuItem>
              );
            }
            return (
              <MenuItem
                key={item.value}
                $disabled={item.disabled}
                $danger={item.danger}
                role="menuitem"
                tabIndex={item.disabled ? -1 : 0}
                onClick={() => handleItemClick(item)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                {item.icon && <ItemIcon aria-hidden="true">{item.icon}</ItemIcon>}
                <ItemLabel>{item.label}</ItemLabel>
              </MenuItem>
            );
          })}
        </MenuList>
      </DropdownMenu>
    ) : null;

    const triggerElement = React.cloneElement(trigger, {
      ref: triggerRef,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!disabled) {
          setIsOpen((prev) => !prev);
        }
        trigger.props.onClick?.(e);
      },
      'aria-haspopup': 'menu',
      'aria-expanded': isOpen,
      'aria-controls': isOpen ? 'dropdown-menu' : undefined,
      disabled,
    });

    const portalContent = menuContent ? createPortal(menuContent, document.body) : null;

    return (
      <Wrapper ref={wrapperRef}>
        {triggerElement}
        {portalContent}
      </Wrapper>
    );
  },
);

Dropdown.displayName = 'Dropdown';

export { Dropdown };