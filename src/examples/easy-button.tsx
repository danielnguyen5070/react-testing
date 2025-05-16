import * as React from 'react'
import EasyButton from '../components/easy-button'
import { ThemeProvider, useTheme } from '../components/theme'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        <h1 className="text-3xl mt-12 font-bold mb-6">Hit the easy button!</h1>

        <EasyButton onClick={() => alert('that was easy')}>
          Easy!
        </EasyButton>

        <div className="my-6 w-full max-w-sm border-t border-gray-300 dark:border-gray-700" />

        <ThemeToggler />
      </div>
    </ThemeProvider>
  )
}

function ThemeToggler() {
  const [theme, setTheme] = useTheme()
  return (
    <button
      onClick={() => setTheme((t: 'dark' | 'light') => (t === 'dark' ? 'light' : 'dark'))}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
    >
      Toggle theme: {theme}
    </button>
  )
}

export default App
