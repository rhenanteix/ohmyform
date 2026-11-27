'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, type Theme } from './tokens'

interface ThemeContextValue {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
  resolvedTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'omf-theme',
}: {
  children: React.ReactNode
  defaultTheme?: 'light' | 'dark'
  storageKey?: string
}) {
  const [theme, setThemeState] = useState<'light' | 'dark'>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(defaultTheme)

  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as 'light' | 'dark' | null
    const initial = stored === 'dark' || stored === 'light' ? stored : defaultTheme
    setThemeState(initial)
    setResolvedTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [storageKey, defaultTheme])

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme)
    setResolvedTheme(newTheme)
    localStorage.setItem(storageKey, newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const styledTheme = useMemo(() => (theme === 'light' ? lightTheme : darkTheme), [theme])

  const cssVariables = useMemo(() => generateCSSVariables(styledTheme), [styledTheme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, resolvedTheme }}>
      <StyledThemeProvider theme={styledTheme}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root, [data-theme="light"] {
                ${cssVariables.light}
              }
              [data-theme="dark"] {
                ${cssVariables.dark}
              }
            `,
          }}
        />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

function generateCSSVariables(theme: Theme) {
  const lightVars = flattenObject(lightTheme, '--omf')
  const darkVars = flattenObject(darkTheme, '--omf')
  return {
    light: Object.entries(lightVars)
      .map(([k, v]) => `${k}: ${v};`)
      .join('\n'),
    dark: Object.entries(darkVars)
      .map(([k, v]) => `${k}: ${v};`)
      .join('\n'),
  }
}

function flattenObject(
  obj: any,
  prefix = '',
  result: Record<string, string> = {}
): Record<string, string> {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}-${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenObject(value, newKey, result)
    } else {
      result[newKey] = String(value)
      if (key === 'DEFAULT') result[prefix] = String(value)
    }
  }
  return result
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function useResolvedTheme() {
  const { resolvedTheme } = useTheme()
  return resolvedTheme
}
