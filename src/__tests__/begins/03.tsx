import Counter from '../../examples/counter-hook';
import { render, fireEvent } from '@testing-library/react';

test('1: counter increments and decrements when the buttons are clicked', () => {
    const { container } = render(<Counter />);

    const message = container.querySelector('span');
    if (!message) throw new Error('Message element not found');

    const [decrementButton, incrementButton] = container.querySelectorAll('button');

    expect(message).toHaveTextContent('Current count: 0');

    fireEvent.click(incrementButton);
    expect(message).toHaveTextContent('Current count: 1');

    fireEvent.click(incrementButton);
    expect(message).toHaveTextContent('Current count: 2');

    fireEvent.click(decrementButton);
    expect(message).toHaveTextContent('Current count: 1');
});

test('2: counter increments when the buttons are clicked twice', () => {
    const { container } = render(<Counter />);

    const message = container.querySelector('span');
    if (!message) throw new Error('Message element not found');

    const [, incrementButton] = container.querySelectorAll('button');

    expect(message).toHaveTextContent('Current count: 0');

    fireEvent.click(incrementButton);
    expect(message).toHaveTextContent('Current count: 1');

    fireEvent.click(incrementButton);
    expect(message).toHaveTextContent('Current count: 2');
});