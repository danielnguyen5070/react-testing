import Counter from '../../examples/counter-hook';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
test('1: counter increments and decrements when the buttons are clicked', async () => {
    render(<Counter />);

    const message = screen.getByText(/current count:/i)
    const decrementButton = screen.getByRole('button', {
        name: /decrement/i
    });
    const incrementButton = screen.getByRole('button', {
        name: /increment/i
    });
    expect(message).toHaveTextContent('Current count: 0');

    await userEvent.click(incrementButton);
    expect(message).toHaveTextContent('Current count: 1');

    await userEvent.click(incrementButton);
    expect(message).toHaveTextContent('Current count: 2');

    await userEvent.click(decrementButton);
    expect(message).toHaveTextContent('Current count: 1');
});

test('2: counter increments when the buttons are clicked twice', async () => {
    render(<Counter />);

    const message = screen.getByText(/Current count:/i);
    const incrementButton = screen.getByRole('button', {
        name: /increment/i
    });

    expect(message).toHaveTextContent('Current count: 0');

    await userEvent.click(incrementButton);
    expect(message).toHaveTextContent('Current count: 1');

    await userEvent.click(incrementButton);
    expect(message).toHaveTextContent('Current count: 2');
});