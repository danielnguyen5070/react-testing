// http://localhost:3000/counter-hook

import * as React from 'react'
import useCounter from '../components/use-counter'

function Counter() {
  const { count, increment, decrement } = useCounter()
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-6xl font-semibold mb-6 mt-12">
        <span className="text-blue-600">Current count: {count}</span>
      </div>
      <div className="space-x-4">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          Decrement
        </button>
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          Increment
        </button>
      </div>
    </div>
  )
}

export default Counter
