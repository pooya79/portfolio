import { useEffect, useState, type ReactNode } from 'react'
import { ThemeContext, type Theme } from './theme'

function savedPreference(): Theme | null {
  try {
    const saved = localStorage.getItem('portfolio-theme')
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState(savedPreference)
  const [systemTheme, setSystemTheme] = useState<Theme>(() =>
    matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )
  const theme = preference ?? systemTheme

  useEffect(() => {
    const query = matchMedia('(prefers-color-scheme: dark)')
    const sync = () => setSystemTheme(query.matches ? 'dark' : 'light')
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#15231c' : '#f5f7f0')
  }, [theme])

  function setTheme(next: Theme) {
    setPreference(next)
    try { localStorage.setItem('portfolio-theme', next) } catch { /* Theme still works without storage. */ }
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
