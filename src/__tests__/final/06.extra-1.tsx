import * as React from 'react'
import { render, act } from '@testing-library/react'
import useCounter from '../../components/use-counter'
import type { UseCounterResult } from '../../components/use-counter'

test('exposes the count and increment/decrement functions', () => {
  let result: UseCounterResult
  function TestComponent() {
    result = useCounter()
    return null
  }
  render(<TestComponent />)
  expect(result!.count).toBe(0)
  act(() => result.increment())
  expect(result!.count).toBe(1)
  act(() => result.decrement())
  expect(result!.count).toBe(0)
})
