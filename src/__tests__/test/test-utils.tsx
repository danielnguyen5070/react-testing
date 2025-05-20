import * as React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { ThemeProvider } from '../../components/theme'
import type { Theme } from '../../components/theme'

function render(
  ui: React.ReactNode,
  { theme = 'light' as Theme, ...options }: { theme?: Theme } = {}
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  )
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
// override React Testing Library's render with our own
export { render }
