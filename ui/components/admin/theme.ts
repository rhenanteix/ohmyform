export const adminTheme = {
  colors: {
    primary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
      950: '#022c22',
    },
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    amber: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    red: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
    },
    surface: {
      DEFAULT: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
    },
    border: {
      DEFAULT: '#e2e8f0',
      muted: '#f1f5f9',
      strong: '#cbd5e1',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      muted: '#94a3b8',
      inverse: '#ffffff',
    },
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      draft: '#94a3b8',
    },
  },
  spacing: {
    0: '0',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
  },
  borderRadius: {
    none: '0',
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '18px',
    '2xl': '24px',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(15, 23, 42, 0.04)',
    DEFAULT: '0 4px 12px rgba(15, 23, 42, 0.06)',
    md: '0 8px 24px rgba(15, 23, 42, 0.08)',
    lg: '0 16px 48px rgba(15, 23, 42, 0.1)',
    xl: '0 24px 64px rgba(15, 23, 42, 0.12)',
    inner: 'inset 0 2px 4px rgba(15, 23, 42, 0.04)',
  },
  transitions: {
    fast: '120ms cubic-bezier(0.4, 0, 0.2, 1)',
    DEFAULT: '180ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '240ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  typography: {
    fontFamily: {
      sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
    },
    fontSize: {
      xs: ['11px', { lineHeight: '16px', letterSpacing: '0.02em' }],
      sm: ['13px', { lineHeight: '20px', letterSpacing: '0' }],
      base: ['15px', { lineHeight: '24px', letterSpacing: '0' }],
      lg: ['17px', { lineHeight: '28px', letterSpacing: '0' }],
      xl: ['20px', { lineHeight: '28px', letterSpacing: '-0.01em' }],
      '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.02em' }],
      '3xl': ['30px', { lineHeight: '36px', letterSpacing: '-0.02em' }],
      '4xl': ['36px', { lineHeight: '40px', letterSpacing: '-0.03em' }],
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  zIndex: {
    dropdown: 100,
    sticky: 200,
    fixed: 300,
    modalBackdrop: 400,
    modal: 500,
    popover: 600,
    tooltip: 700,
    toast: 800,
  },
} as const;

export type AdminTheme = typeof adminTheme;

export const cssVariables = `
  :root {
    --omf-color-primary-50: ${adminTheme.colors.primary[50]};
    --omf-color-primary-100: ${adminTheme.colors.primary[100]};
    --omf-color-primary-200: ${adminTheme.colors.primary[200]};
    --omf-color-primary-300: ${adminTheme.colors.primary[300]};
    --omf-color-primary-400: ${adminTheme.colors.primary[400]};
    --omf-color-primary-500: ${adminTheme.colors.primary[500]};
    --omf-color-primary-600: ${adminTheme.colors.primary[600]};
    --omf-color-primary-700: ${adminTheme.colors.primary[700]};
    --omf-color-primary-800: ${adminTheme.colors.primary[800]};
    --omf-color-primary-900: ${adminTheme.colors.primary[900]};
    --omf-color-primary-950: ${adminTheme.colors.primary[950]};

    --omf-color-slate-50: ${adminTheme.colors.slate[50]};
    --omf-color-slate-100: ${adminTheme.colors.slate[100]};
    --omf-color-slate-200: ${adminTheme.colors.slate[200]};
    --omf-color-slate-300: ${adminTheme.colors.slate[300]};
    --omf-color-slate-400: ${adminTheme.colors.slate[400]};
    --omf-color-slate-500: ${adminTheme.colors.slate[500]};
    --omf-color-slate-600: ${adminTheme.colors.slate[600]};
    --omf-color-slate-700: ${adminTheme.colors.slate[700]};
    --omf-color-slate-800: ${adminTheme.colors.slate[800]};
    --omf-color-slate-900: ${adminTheme.colors.slate[900]};
    --omf-color-slate-950: ${adminTheme.colors.slate[950]};

    --omf-color-surface: ${adminTheme.colors.surface.DEFAULT};
    --omf-color-surface-secondary: ${adminTheme.colors.surface.secondary};
    --omf-color-surface-tertiary: ${adminTheme.colors.surface.tertiary};

    --omf-color-border: ${adminTheme.colors.border.DEFAULT};
    --omf-color-border-muted: ${adminTheme.colors.border.muted};
    --omf-color-border-strong: ${adminTheme.colors.border.strong};

    --omf-color-text-primary: ${adminTheme.colors.text.primary};
    --omf-color-text-secondary: ${adminTheme.colors.text.secondary};
    --omf-color-text-muted: ${adminTheme.colors.text.muted};
    --omf-color-text-inverse: ${adminTheme.colors.text.inverse};

    --omf-color-status-success: ${adminTheme.colors.status.success};
    --omf-color-status-warning: ${adminTheme.colors.status.warning};
    --omf-color-status-error: ${adminTheme.colors.status.error};
    --omf-color-status-info: ${adminTheme.colors.status.info};
    --omf-color-status-draft: ${adminTheme.colors.status.draft};

    --omf-radius-sm: ${adminTheme.borderRadius.sm};
    --omf-radius-md: ${adminTheme.borderRadius.md};
    --omf-radius-lg: ${adminTheme.borderRadius.lg};
    --omf-radius-xl: ${adminTheme.borderRadius.xl};
    --omf-radius-2xl: ${adminTheme.borderRadius['2xl']};
    --omf-radius-full: ${adminTheme.borderRadius.full};

    --omf-shadow-sm: ${adminTheme.shadows.sm};
    --omf-shadow: ${adminTheme.shadows.DEFAULT};
    --omf-shadow-md: ${adminTheme.shadows.md};
    --omf-shadow-lg: ${adminTheme.shadows.lg};
    --omf-shadow-xl: ${adminTheme.shadows.xl};
    --omf-shadow-inner: ${adminTheme.shadows.inner};

    --omf-transition-fast: ${adminTheme.transitions.fast};
    --omf-transition: ${adminTheme.transitions.DEFAULT};
    --omf-transition-slow: ${adminTheme.transitions.slow};

    --omf-font-sans: ${adminTheme.typography.fontFamily.sans};
    --omf-font-mono: ${adminTheme.typography.fontFamily.mono};
  }
`;

export default adminTheme;
