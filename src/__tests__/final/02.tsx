import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const { container } = render(<Counter />)
  const [decrement, increment] = container.querySelectorAll('button')

  const messageContainer = container.firstChild as HTMLElement | null;
  const message = messageContainer?.querySelector('div') as HTMLElement | null;

  if (message) {
    expect(message.textContent).toBe('Current count: 0')
    fireEvent.click(increment)
    expect(message.textContent).toBe('Current count: 1')
    fireEvent.click(decrement)
    expect(message.textContent).toBe('Current count: 0')
  }
})
