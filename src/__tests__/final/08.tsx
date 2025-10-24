import useCounter from "../../components/use-counter";
import { waitFor, renderHook } from "@testing-library/react";

test('exposes the count and increment/decrement functions', async () => {
    const { result } = renderHook(useCounter);
    waitFor(() => {
        expect(result.current.count).toBe(0);
        result.current.increment();
        expect(result.current.count).toBe(1);
        result.current.decrement();
        expect(result.current.count).toBe(0);
    })
})

test('accepts an initial count', async () => {
    const { result } = renderHook(useCounter);
    waitFor(() => {
        expect(result.current.count).toBe(5);
        result.current.increment();
        expect(result.current.count).toBe(6);
        result.current.decrement();
        expect(result.current.count).toBe(5);
    })
})

test('change step works correctly', async () => {
    const { result } = renderHook(useCounter);

    waitFor(() => {
        expect(result.current.count).toBe(0);
        result.current.increment();
        expect(result.current.count).toBe(2);
        result.current.decrement();
        expect(result.current.count).toBe(0);
    })
})