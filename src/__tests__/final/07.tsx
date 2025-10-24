import EasyButton from "../../components/easy-button"
import { render, screen } from "@testing-library/react"
import { ThemeProvider, type Theme } from "../../components/theme"
import React from "react"

const renderWithTheme = (ui: React.ReactNode, { theme = 'light' as Theme, ...options } = {}) => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
        <ThemeProvider initialTheme={theme}>
            {children}
        </ThemeProvider>

    render(ui, { wrapper, ...options })
}

test('renders with light theme styles', () => {
    renderWithTheme(<EasyButton>easy</EasyButton>, { theme: 'light' })
    const button = screen.getByRole('button', { name: /easy/i })
    expect(button).toHaveStyle({
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(0, 0, 0)',
    });
})

test('renders with dark theme styles by default', () => {
    renderWithTheme(<EasyButton>easy</EasyButton>, { theme: 'dark' })
    const button = screen.getByRole('button', { name: /easy/i })
    expect(button).toHaveStyle({
        backgroundColor: 'rgb(0, 0, 0)',
        color: 'rgb(255, 255, 255)',
    });
})