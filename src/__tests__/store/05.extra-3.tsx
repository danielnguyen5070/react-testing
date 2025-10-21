import * as React from 'react'
import { render, screen } from '../test/test-utils'
import EasyButton from '../../components/easy-button'

test('renders with the light styles for the light theme', () => {
  render(<EasyButton>Easy</EasyButton>, { theme: 'light' })
  const button = screen.getByRole('button', { name: /easy/i })
  expect(button).toHaveStyle(`
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
  `)
})

test('renders with the dark styles for the dark theme', () => {
  render(<EasyButton>Easy</EasyButton>, { theme: 'dark' })
  const button = screen.getByRole('button', { name: /easy/i })
  expect(button).toHaveStyle(`
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
  `)
})
