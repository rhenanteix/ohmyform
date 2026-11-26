export type Theme = {
  colors: {
    primary: string
    primary2: string
    primary3: string
    success: string
    warning: string
    danger: string
    info: string
    bg: string
    bgSecondary: string
    card: string
    text: string
    textMuted: string
    border: string
    white: string
    gradient: string
    gradientText: string
  }
  radii: {
    sm: string
    md: string
    lg: string
  }
  shadows: {
    sm: string
    md: string
    lg: string
  }
  transitions: {
    default: string
  }
}

export const theme: Theme = {
  colors: {
    primary: '#176b58',
    primary2: '#438675',
    primary3: '#b78136',
    success: '#10B981',
    warning: '#b78136',
    danger: '#EF4444',
    info: '#3B82F6',
    bg: '#F8FAFC',
    bgSecondary: '#F1F5F9',
    card: '#FFFFFF',
    text: '#0F172A',
    textMuted: '#64748B',
    border: '#E2E8F0',
    white: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #176b58 0%, #438675 50%, #b78136 100%)',
    gradientText: 'linear-gradient(135deg, #176b58 0%, #438675 100%)',
  },
  radii: {
    sm: '8px',
    md: '16px',
    lg: '24px',
  },
  shadows: {
    sm: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    md: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
    lg: '0 20px 40px -10px rgba(0, 0, 0, 0.1), 0 10px 20px -10px rgba(0, 0, 0, 0.04)',
  },
  transitions: {
    default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
}
