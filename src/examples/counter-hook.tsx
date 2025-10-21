// http://localhost:3000/counter-hook
import useCounter from '../components/use-counter'

function Counter() {
  const { count, increment, decrement } = useCounter()
  return (
    <div className="flex flex-col items-center">
      <div>
        <span>Current count: {count}</span>
      </div>
      <div className="space-x-4">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white "
        >
          Decrement
        </button>
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white"
        >
          Increment
        </button>
      </div>
    </div>
  )
}

export default Counter
