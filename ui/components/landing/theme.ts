export const landingTheme = {
  colors: {
    primary: '#176B58',
    primaryDark: '#0f4d3f',
    accent: '#b78136',
    bg: '#ffffff',
    surface: '#f8fafc',
    text: '#0f172a',
    muted: '#64748b',
    border: '#e2e8f0',
    highlight: '#fde68a',
  },
  radius: { sm: '8px', md: '12px', lg: '16px', xl: '24px', pill: '999px' },
  shadow: {
    sm: '0 1px 2px rgba(15,23,42,0.05)',
    md: '0 4px 12px rgba(15,23,42,0.08)',
    lg: '0 20px 40px -10px rgba(15,23,42,0.12)',
  },
  space: { xs: 4, sm: 8, md: 16, lg: 24, xl: 40, xxl: 80 },
}
export type LandingTheme = typeof landingTheme
