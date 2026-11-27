import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

const useId = () => {
  const [id, setId] = React.useState(() => `id-${Math.random().toString(36).substr(2, 9)}`);
  return id;
};

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  switchSize?: 'sm' | 'md' | 'lg';
}

const Wrapper = styled.label<{ $size: SwitchProps['switchSize'] }>`
  display: inline-flex;
  align-items: center;
  gap: var(--omf-spacing-3);
  cursor: pointer;
  user-select: none;

  ${({ $size }) => {
    const sizes = {
      sm: css`
        .switch-track {
          width: 36px;
          height: 20px;
        }
        .switch-thumb {
          width: 16px;
          height: 16px;
        }
        .switch-thumb[data-checked="true"] {
          transform: translateX(16px);
        }
      `,
      md: css`
        .switch-track {
          width: 44px;
          height: 24px;
        }
        .switch-thumb {
          width: 20px;
          height: 20px;
        }
        .switch-thumb[data-checked="true"] {
          transform: translateX(20px);
        }
      `,
      lg: css`
        .switch-track {
          width: 52px;
          height: 28px;
        }
        .switch-thumb {
          width: 24px;
          height: 24px;
        }
        .switch-thumb[data-checked="true"] {
          transform: translateX(24px);
        }
      `,
    };
    return sizes[$size || 'md'];
  }}
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

const SwitchTrack = styled.div<{ $checked: boolean; $disabled?: boolean }>`
  position: relative;
  flex-shrink: 0;
  border-radius: var(--omf-borderRadius-full);
  background: ${({ $checked, $disabled }) =>
    $checked
      ? 'var(--omf-colors-primary-600)'
      : $disabled
      ? 'var(--omf-colors-border)'
      : 'var(--omf-colors-border)'};
  border: 2px solid ${({ $checked, $disabled }) =>
    $checked
      ? 'transparent'
      : $disabled
      ? 'var(--omf-colors-border)'
      : 'var(--omf-colors-border)'};
  box-shadow: ${({ $checked }) =>
    $checked ? '0 0 0 2px var(--omf-colors-primary-100)' : 'inset 0 2px 4px rgba(0,0,0,0.05)'};
  transition: all var(--omf-transitions-fast);

  [data-theme="dark"] & {
    box-shadow: ${({ $checked }) =>
      $checked ? '0 0 0 2px var(--omf-colors-primary-900)' : 'inset 0 2px 4px rgba(0,0,0,0.2)'};
  }

  ${Wrapper}:hover:not(:has(input:disabled)) & {
    border-color: ${({ $checked }) => ($checked ? 'transparent' : 'var(--omf-colors-primary-400)')};
    background: ${({ $checked }) => ($checked ? 'var(--omf-colors-primary-500)' : 'var(--omf-colors-border)')};
  }

  ${Wrapper}:has(input:focus-visible) & {
    box-shadow: var(--omf-shadows-focus);
  }
`;

const SwitchThumb = styled.div<{ $checked: boolean }>`
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translateY(-50%);
  border-radius: var(--omf-borderRadius-full);
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: transform var(--omf-transitions-fast), background var(--omf-transitions-fast);
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--omf-colors-primary-600);

  ${({ $checked }) =>
    $checked
      ? css`
          transform: translateY(-50%) translateX(20px);
        `
      : css``}
`;

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

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, switchSize = 'md', disabled, id, required, ...props }, ref) => {
    const switchId = id || `switch-${useId()}`;
    const [checked, setChecked] = React.useState(props.defaultChecked || false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      props.onChange?.(e);
    };

    return (
      <Wrapper $size={switchSize} htmlFor={switchId}>
        <HiddenInput
          ref={ref}
          type="checkbox"
          id={switchId}
          checked={checked}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          {...props}
        />
        <SwitchTrack $checked={checked} $disabled={disabled} className="switch-track" aria-hidden="true">
          <SwitchThumb $checked={checked} className="switch-thumb" data-checked={checked} aria-hidden="true">
            {checked && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </SwitchThumb>
        </SwitchTrack>
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

Switch.displayName = 'Switch';

export { Switch };