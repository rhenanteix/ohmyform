export const colors = {
  primary: {
    50: '#edf3e9',
    100: '#ddebd5',
    200: '#c5dbb9',
    300: '#a0c29a',
    400: '#7ba47c',
    500: '#498369',
    600: '#245d4c',
    700: '#1c4d3e',
    800: '#193f34',
    900: '#17352d',
    950: '#10251f',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  slate: {
    50: '#f7f8f5',
    100: '#f0f2ec',
    200: '#e1e6dd',
    300: '#cbd4c7',
    400: '#748178',
    500: '#64748b',
    600: '#637167',
    700: '#334155',
    800: '#1e293b',
    900: '#233c35',
    950: '#020617',
  },
  semantic: {
    success: {
      light: '#ddebd5',
      DEFAULT: '#498369',
      dark: '#1c4d3e',
      foreground: '#ffffff',
    },
    warning: {
      light: '#fef3c7',
      DEFAULT: '#f59e0b',
      dark: '#b45309',
      foreground: '#000000',
    },
    error: {
      light: '#fee2e2',
      DEFAULT: '#ef4444',
      dark: '#b91c1c',
      foreground: '#ffffff',
    },
    info: {
      light: '#dbeafe',
      DEFAULT: '#3b82f6',
      dark: '#1d4ed8',
      foreground: '#ffffff',
    },
  },
  background: {
    primary: '#ffffff',
    secondary: '#fcfbf7',
    tertiary: '#f0f2ec',
    inverse: '#233c35',
  },
  text: {
    primary: '#233c35',
    secondary: '#637167',
    muted: '#748178',
    inverse: '#ffffff',
    link: '#245d4c',
    linkHover: '#1c4d3e',
  },
  border: {
    DEFAULT: '#e1e6dd',
    strong: '#cbd4c7',
    muted: '#f0f2ec',
    focus: '#245d4c',
  },
  overlay: {
    light: 'rgba(15, 23, 42, 0.4)',
    medium: 'rgba(15, 23, 42, 0.6)',
    heavy: 'rgba(15, 23, 42, 0.8)',
  },
}

export const darkColors = {
  primary: {
    50: '#022c22',
    100: '#064e3b',
    200: '#065f46',
    300: '#047857',
    400: '#059669',
    500: '#10b981',
    600: '#34d399',
    700: '#6ee7b7',
    800: '#a7f3d0',
    900: '#d1fae5',
    950: '#ecfdf5',
  },
  neutral: {
    50: '#0a0a0a',
    100: '#171717',
    200: '#262626',
    300: '#404040',
    400: '#525252',
    500: '#737373',
    600: '#a3a3a3',
    700: '#d4d4d4',
    800: '#e5e5e5',
    900: '#f5f5f5',
    950: '#fafafa',
  },
  slate: {
    50: '#020617',
    100: '#0f172a',
    200: '#1e293b',
    300: '#334155',
    400: '#475569',
    500: '#64748b',
    600: '#94a3b8',
    700: '#cbd5e1',
    800: '#e2e8f0',
    900: '#f1f5f9',
    950: '#f8fafc',
  },
  semantic: {
    success: {
      light: '#064e3b',
      DEFAULT: '#10b981',
      dark: '#34d399',
      foreground: '#000000',
    },
    warning: {
      light: '#78350f',
      DEFAULT: '#f59e0b',
      dark: '#fbbf24',
      foreground: '#000000',
    },
    error: {
      light: '#7f1d1d',
      DEFAULT: '#ef4444',
      dark: '#f87171',
      foreground: '#ffffff',
    },
    info: {
      light: '#1e3a5f',
      DEFAULT: '#3b82f6',
      dark: '#93c5fd',
      foreground: '#ffffff',
    },
  },
  background: {
    primary: '#0f172a',
    secondary: '#1e293b',
    tertiary: '#334155',
    inverse: '#f8fafc',
  },
  text: {
    primary: '#f8fafc',
    secondary: '#cbd5e1',
    muted: '#94a3b8',
    inverse: '#0f172a',
    link: '#34d399',
    linkHover: '#6ee7b7',
  },
  border: {
    DEFAULT: '#334155',
    strong: '#475569',
    muted: '#1e293b',
    focus: '#34d399',
  },
  overlay: {
    light: 'rgba(0, 0, 0, 0.4)',
    medium: 'rgba(0, 0, 0, 0.6)',
    heavy: 'rgba(0, 0, 0, 0.8)',
  },
}

export const typography = {
  fontFamily: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
  },
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '3.75rem', // 60px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    tight: 1.1,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.04em',
    widest: '0.1em',
  },
}

export const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  7: '1.75rem', // 28px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
}

export const borderRadius = {
  none: '0',
  sm: '0.25rem', // 4px
  DEFAULT: '0.375rem', // 6px
  md: '0.5rem', // 8px
  lg: '0.75rem', // 12px
  xl: '1rem', // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
}

export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  focus: '0 0 0 3px rgb(16 185 129 / 0.4)',
}

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  DEFAULT: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
}

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
}

export const gradients = {
  primary: 'linear-gradient(135deg, #245d4c 0%, #245d4c 100%)',
  primaryHover: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
  primaryText: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #f59e0b 100%)',
  surface: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  surfaceDark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
}

export const layout = {
  headerHeight: '72px',
  headerHeightMobile: '60px',
  sidebarWidth: '280px',
  sidebarWidthCollapsed: '72px',
  containerMax: '1400px',
  containerPadding: '24px',
}

export const lightTheme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  zIndex,
  gradients,
  layout,
}

export const darkTheme = {
  ...lightTheme,
  colors: darkColors,
  gradients: {
    ...gradients,
    surface: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    surfaceDark: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',
  },
}

export type Theme = typeof lightTheme
export type ColorScale = typeof colors.primary
export type SemanticColor = typeof colors.semantic.success
