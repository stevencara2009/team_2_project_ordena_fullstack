import { createContext, useCallback, useEffect, useState } from 'react'

export const ThemeContext = createContext(null)

const STORAGE_KEY = 'ordena-theme'

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* almacenamiento no disponible */
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const isLight = theme === 'light'

  return (
    <ThemeContext.Provider value={{ theme, isLight, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}