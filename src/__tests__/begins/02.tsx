import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom'
import Counter from '../../examples/counter-hook';

beforeEach(() => {
    document.body.innerHTML = ''
});

test('1: counter increments and decrements when the buttons are clicked', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    flushSync(() => {
        root.render(<Counter />);
    });

    const message = document.body.querySelector('span');
    if (!message) throw new Error('Message element not found');

    const [decrementButton, incrementButton] = document.body.querySelectorAll('button');
    const incrementClickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        button: 0
    });

    expect(message.textContent).toBe('Current count: 0');

    flushSync(() => incrementButton.dispatchEvent(incrementClickEvent));
    expect(message.textContent).toBe('Current count: 1');

    flushSync(() => incrementButton.dispatchEvent(incrementClickEvent));
    expect(message.textContent).toBe('Current count: 2');

    const decrementClickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        button: 0
    });
    flushSync(() => decrementButton.dispatchEvent(decrementClickEvent));
    expect(message.textContent).toBe('Current count: 1');
});

test('2: counter increments when the buttons are clicked twice', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    flushSync(() => {
        root.render(<Counter />);
    });

    const message = document.body.querySelector('span');
    if (!message) throw new Error('Message element not found');

    const [, incrementButton] = document.body.querySelectorAll('button');

    expect(message.textContent).toBe('Current count: 0');

    flushSync(() => incrementButton.click());
    expect(message.textContent).toBe('Current count: 1');

    flushSync(() => incrementButton.click());
    expect(message.textContent).toBe('Current count: 2');
});