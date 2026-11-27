import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

const useId = () => {
  const [id, setId] = React.useState(() => `id-${Math.random().toString(36).substr(2, 9)}`);
  return id;
};

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

const Wrapper = styled.div<{ $fullWidth: boolean }>`
  display: inline-flex;
  flex-direction: column;
  gap: var(--omf-spacing-1);
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label`
  font-size: var(--omf-typography-fontSize-sm);
  font-weight: var(--omf-typography-fontWeight-semibold);
  color: var(--omf-colors-text-primary);
`;

const SelectContainer = styled.div<{ $hasError: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  background: var(--omf-colors-background-primary);
  border: 1px solid ${({ $hasError }) => ($hasError ? 'var(--omf-colors-semantic-error-DEFAULT)' : 'var(--omf-colors-border)')};
  border-radius: var(--omf-borderRadius-md);
  transition: border-color var(--omf-transitions-fast), box-shadow var(--omf-transitions-fast);

  &:hover {
    border-color: ${({ $hasError }) => ($hasError ? 'var(--omf-colors-semantic-error-DEFAULT)' : 'var(--omf-colors-primary-400)')};
  }

  &:focus-within {
    border-color: ${({ $hasError }) => ($hasError ? 'var(--omf-colors-semantic-error-DEFAULT)' : 'var(--omf-colors-border-focus)')};
    box-shadow: var(--omf-shadows-focus);
  }
`;

const StyledSelect = styled.select`
  flex: 1;
  width: 100%;
  min-width: 0;
  height: 40px;
  padding: 0 var(--omf-spacing-10) 0 var(--omf-spacing-3);
  font-family: var(--omf-typography-fontFamily-sans);
  font-size: var(--omf-typography-fontSize-base);
  line-height: var(--omf-typography-lineHeight-normal);
  color: var(--omf-colors-text-primary);
  background: transparent;
  border: none;
  outline: none;
  border-radius: var(--omf-borderRadius-md);
  appearance: none;
  cursor: pointer;

  &[disabled] {
    background: var(--omf-colors-background-tertiary);
    color: var(--omf-colors-text-muted);
    cursor: not-allowed;
  }

  option {
    background: var(--omf-colors-background-primary);
    color: var(--omf-colors-text-primary);
    padding: var(--omf-spacing-2);
  }
`;

const ChevronIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
  color: var(--omf-colors-text-muted);
  pointer-events: none;
  border-left: 1px solid var(--omf-colors-border-muted);
`;

const HelperText = styled.span<{ $error?: boolean }>`
  font-size: var(--omf-typography-fontSize-sm);
  color: ${({ $error }) => ($error ? 'var(--omf-colors-semantic-error-DEFAULT)' : 'var(--omf-colors-text-muted)')};
  display: flex;
  align-items: center;
  gap: var(--omf-spacing-1);
`;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      options,
      placeholder,
      fullWidth = true,
      id,
      disabled,
      required,
      ...props
    },
    ref,
  ) => {
    const selectId = id || `select-${useId()}`;
    const errorId = error ? `${selectId}-error` : undefined;
    const hintId = hint ? `${selectId}-hint` : undefined;

    return (
      <Wrapper $fullWidth={fullWidth}>
        {label && (
          <Label htmlFor={selectId}>
            {label}
            {required && <span aria-hidden="true" style={{ color: 'var(--omf-colors-semantic-error-DEFAULT)', marginLeft: '2px' }}>*</span>}
          </Label>
        )}
        <SelectContainer $hasError={!!error}>
          <StyledSelect
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={`${errorId || ''} ${hintId || ''}`.trim() || undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled selected hidden>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </StyledSelect>
          <ChevronWrapper aria-hidden="true">
            <ChevronIcon />
          </ChevronWrapper>
        </SelectContainer>
        {(error || hint) && (
          <HelperText $error={!!error} id={errorId || hintId}>
            {error || hint}
          </HelperText>
        )}
      </Wrapper>
    );
  },
);

Select.displayName = 'Select';

export { Select };