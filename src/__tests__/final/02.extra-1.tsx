import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from '../../components/counter';

test('counter increments and decrements when the buttons are clicked', () => {
  const { container } = render(<Counter />);
  
  const buttons = container.querySelectorAll('button');
  const [decrement, increment] = buttons as NodeListOf<HTMLButtonElement>;

  const messageContainer  = container.firstChild as HTMLElement | null;
  const message = messageContainer?.querySelector('div') as HTMLDivElement | null;

  if (message) {
    expect(message).toHaveTextContent('Current count: 0');
    fireEvent.click(increment);
    expect(message).toHaveTextContent('Current count: 1');
    fireEvent.click(decrement);
    expect(message).toHaveTextContent('Current count: 0');
  }
});