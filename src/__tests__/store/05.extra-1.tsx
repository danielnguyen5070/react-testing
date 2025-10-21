import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../../components/theme'
import EasyButton from '../../components/easy-button'

test('renders with the light styles for the light theme', () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider initialTheme="light">{children}</ThemeProvider>
  )
  render(<EasyButton>Easy</EasyButton>, { wrapper: Wrapper })
  const button = screen.getByRole('button', { name: /easy/i })
  expect(button).toHaveStyle(`
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
  `)
})

test('renders with the dark styles for the dark theme', () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
  )
  render(<EasyButton>Easy</EasyButton>, { wrapper: Wrapper })
  const button = screen.getByRole('button', { name: /easy/i })
  expect(button).toHaveStyle(`
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
  `)
})
