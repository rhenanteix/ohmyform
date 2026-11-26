import styled from 'styled-components'

export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: var(--omf-transition);
  white-space: nowrap;
  text-decoration: none;
  outline: none;

  ${({ size }) => {
    switch (size) {
      case 'sm':
        return `
          padding: 8px 16px;
          font-size: 13px;
        `
      case 'lg':
        return `
          padding: 14px 28px;
          font-size: 16px;
        `
      default:
        return `
          padding: 10px 20px;
          font-size: 14px;
        `
    }
  }}

  ${({ variant }) => {
    switch (variant || 'primary') {
      case 'primary':
        return `
          background: var(--omf-gradient);
          color: #fff;
          box-shadow: 0 4px 14px 0 rgba(23, 107, 88, 0.35);
          &:hover:not(:disabled) {
            filter: brightness(1.05);
            box-shadow: 0 6px 20px 0 rgba(23, 107, 88, 0.45);
            transform: translateY(-1px);
          }
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `
      case 'secondary':
        return `
          background: #fff;
          color: #0f172a;
          border: 1px solid #e2e8f0;
          &:hover:not(:disabled) {
            background: #f8fafc;
            border-color: #cbd5e1;
            transform: translateY(-1px);
          }
        `
      case 'outline':
        return `
          background: transparent;
          color: #0f172a;
          border: 1px solid #e2e8f0;
          &:hover:not(:disabled) {
            background: #f8fafc;
            border-color: #176b58;
            color: #176b58;
          }
        `
      case 'ghost':
        return `
          background: transparent;
          color: #64748b;
          &:hover:not(:disabled) {
            background: #f1f5f9;
            color: #0f172a;
          }
        `
      case 'danger':
        return `
          background: #EF4444;
          color: #fff;
          &:hover:not(:disabled) {
            background: #dc2626;
            transform: translateY(-1px);
          }
        `
    }
  }}

  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  ${({ loading }) => loading && 'opacity: 0.7; cursor: not-allowed;'}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`

export const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid ${({ error }) => (error ? '#EF4444' : '#cbd5e1')};
  border-radius: 10px;
  background: #fff;
  color: #0f172a;
  outline: none;
  transition: var(--omf-transition);

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: #176b58;
    box-shadow: 0 0 0 3px rgba(23, 107, 88, 0.15);
  }

  ${({ error }) =>
    error &&
    `
    &:focus {
      border-color: #EF4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
    }
  `}
`

export const Textarea = styled.textarea<{ error?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid ${({ error }) => (error ? '#EF4444' : '#cbd5e1')};
  border-radius: 10px;
  background: #fff;
  color: #0f172a;
  outline: none;
  transition: var(--omf-transition);
  resize: vertical;
  min-height: 100px;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: #176b58;
    box-shadow: 0 0 0 3px rgba(23, 107, 88, 0.15);
  }
`

export const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: #334155;
  margin-bottom: 6px;
  letter-spacing: 0.01em;
`

export const FormField = styled.div<{ error?: string }>`
  margin-bottom: 16px;

  ${({ error }) =>
    error &&
    `
    .form-error {
      color: #EF4444;
      font-size: 12px;
      margin-top: 4px;
      display: block;
    }
  `}
`
