import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

const useId = () => {
  const [id, setId] = React.useState(() => `id-${Math.random().toString(36).substr(2, 9)}`);
  return id;
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
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

const InputContainer = styled.div<{ $hasError: boolean }>`
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

const IconWrapper = styled.div<{ $position: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--omf-colors-text-muted);
  padding: 0 var(--omf-spacing-3);
  pointer-events: none;

  ${({ $position }) =>
    $position === 'left'
      ? css`
          border-right: 1px solid var(--omf-colors-border-muted);
        `
      : css`
          border-left: 1px solid var(--omf-colors-border-muted);
        `}
`;

const StyledInput = styled.input`
  flex: 1;
  width: 100%;
  min-width: 0;
  height: 40px;
  padding: 0 var(--omf-spacing-3);
  font-family: var(--omf-typography-fontFamily-sans);
  font-size: var(--omf-typography-fontSize-base);
  line-height: var(--omf-typography-lineHeight-normal);
  color: var(--omf-colors-text-primary);
  background: transparent;
  border: none;
  outline: none;
  border-radius: var(--omf-borderRadius-md);

  &::placeholder {
    color: var(--omf-colors-text-muted);
  }

  &[disabled] {
    background: var(--omf-colors-background-tertiary);
    color: var(--omf-colors-text-muted);
    cursor: not-allowed;
  }

  &[readonly] {
    background: var(--omf-colors-background-secondary);
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 1000px var(--omf-colors-background-primary) inset;
    -webkit-text-fill-color: var(--omf-colors-text-primary);
  }
`;

const HelperText = styled.span<{ $error?: boolean }>`
  font-size: var(--omf-typography-fontSize-sm);
  color: ${({ $error }) => ($error ? 'var(--omf-colors-semantic-error-DEFAULT)' : 'var(--omf-colors-text-muted)')};
  display: flex;
  align-items: center;
  gap: var(--omf-spacing-1);
`;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      fullWidth = true,
      id,
      disabled,
      required,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || `input-${generatedId}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    if (props.type === 'hidden') return <input ref={ref} id={inputId} {...props} />;

    return (
      <Wrapper $fullWidth={fullWidth}>
        {label && (
          <Label htmlFor={inputId}>
            {label}
            {required && <span aria-hidden="true" style={{ color: 'var(--omf-colors-semantic-error-DEFAULT)', marginLeft: '2px' }}>*</span>}
          </Label>
        )}
        <InputContainer $hasError={!!error}>
          {leftIcon && <IconWrapper $position="left" aria-hidden="true">{leftIcon}</IconWrapper>}
          <StyledInput
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={`${errorId || ''} ${hintId || ''}`.trim() || undefined}
            {...props}
          />
          {rightIcon && <IconWrapper $position="right" aria-hidden="true">{rightIcon}</IconWrapper>}
        </InputContainer>
        {(error || hint) && (
          <HelperText $error={!!error} id={errorId || hintId}>
            {error || hint}
          </HelperText>
        )}
      </Wrapper>
    );
  },
);

Input.displayName = 'Input';

export { Input };