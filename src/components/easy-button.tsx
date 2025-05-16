import * as React from 'react'
import { useTheme } from './theme'

function EasyButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [theme] = useTheme()

  const baseClasses =
    'px-4 py-2 rounded-md font-semibold transition-colors duration-200'

  const lightThemeClasses = 'bg-white text-black border border-gray-300 hover:bg-gray-100'
  const darkThemeClasses = 'bg-black text-white border border-gray-600 hover:bg-gray-800'

  const themeClasses = theme === 'dark' ? darkThemeClasses : lightThemeClasses

  return (
    <button className={`${baseClasses} ${themeClasses}`} {...props} />
  )
}

export default EasyButton
