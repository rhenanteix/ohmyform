import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

const useId = () => {
  const [id, setId] = React.useState(() => `id-${Math.random().toString(36).substr(2, 9)}`);
  return id;
};

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
}

const Wrapper = styled.label`
  display: inline-flex;
  align-items: flex-start;
  gap: var(--omf-spacing-3);
  cursor: pointer;
  user-select: none;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

const CheckboxBox = styled.div<{ $indeterminate?: boolean; $disabled?: boolean; $error?: boolean }>`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  border-radius: var(--omf-borderRadius-sm);
  border: 2px solid ${({ $error, $disabled }) =>
    $error
      ? 'var(--omf-colors-semantic-error-DEFAULT)'
      : $disabled
      ? 'var(--omf-colors-border)'
      : 'var(--omf-colors-border)'};
  background: ${({ $indeterminate, $disabled }) =>
    $indeterminate
      ? 'var(--omf-colors-primary-600)'
      : $disabled
      ? 'var(--omf-colors-background-tertiary)'
      : 'var(--omf-colors-background-primary)'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--omf-transitions-fast);
  box-shadow: ${({ $indeterminate }) =>
    $indeterminate ? '0 0 0 2px var(--omf-colors-primary-100)' : 'none'};

  [data-theme="dark"] & {
    box-shadow: ${({ $indeterminate }) =>
      $indeterminate ? '0 0 0 2px var(--omf-colors-primary-900)' : 'none'};
  }

  ${Wrapper}:hover:not(:has(input:disabled)) & {
    border-color: ${({ $error }) => ($error ? 'var(--omf-colors-semantic-error-DEFAULT)' : 'var(--omf-colors-primary-400)')};
  }

  ${Wrapper}:has(input:focus-visible) & {
    border-color: var(--omf-colors-border-focus);
    box-shadow: var(--omf-shadows-focus);
  }
`;

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IndeterminateIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const LabelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--omf-spacing-0);
  min-width: 0;
`;

const LabelText = styled.span<{ $disabled?: boolean }>`
  font-size: var(--omf-typography-fontSize-base);
  font-weight: var(--omf-typography-fontWeight-medium);
  color: ${({ $disabled }) => ($disabled ? 'var(--omf-colors-text-muted)' : 'var(--omf-colors-text-primary)')};
  line-height: var(--omf-typography-lineHeight-normal);
`;

const DescriptionText = styled.span`
  font-size: var(--omf-typography-fontSize-sm);
  color: var(--omf-colors-text-muted);
  line-height: var(--omf-typography-lineHeight-normal);
`;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, indeterminate = false, disabled, id, required, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id || `checkbox-${generatedId}`;

    return (
      <Wrapper htmlFor={checkboxId}>
        <HiddenInput
          ref={ref}
          type="checkbox"
          id={checkboxId}
          disabled={disabled}
          required={required}
          aria-checked={indeterminate ? 'mixed' : undefined}
          {...props}
        />
        <CheckboxBox
          $indeterminate={indeterminate}
          $disabled={disabled}
          aria-hidden="true"
        >
          {indeterminate ? <IndeterminateIcon /> : <CheckIcon />}
        </CheckboxBox>
        {(label || description) && (
          <LabelContent>
            {label && <LabelText $disabled={disabled}>{label}</LabelText>}
            {description && <DescriptionText>{description}</DescriptionText>}
          </LabelContent>
        )}
      </Wrapper>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };