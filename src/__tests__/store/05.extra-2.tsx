import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../../components/theme'
import EasyButton from '../../components/easy-button'
import type { Theme } from '../../components/theme'

function renderWithProviders(ui: React.ReactNode, { theme = 'light' as Theme, ...options } = {}) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  )
  return render(ui, { wrapper: Wrapper, ...options })
}

test('renders with the light styles for the light theme', () => {
  renderWithProviders(<EasyButton>Easy</EasyButton>)
  const button = screen.getByRole('button', { name: /easy/i })
  expect(button).toHaveStyle(`
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
  `)
})

test('renders with the dark styles for the dark theme', () => {
  renderWithProviders(<EasyButton>Easy</EasyButton>, {
    theme: 'dark',
  })
  const button = screen.getByRole('button', { name: /easy/i })
  expect(button).toHaveStyle(`
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
  `)
})
