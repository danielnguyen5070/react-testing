import * as React from 'react'
import type { Theme } from './easy-button'

const ThemeContext = React.createContext<
  [Theme, React.Dispatch<React.SetStateAction<Theme>>] | undefined
>(undefined);

function useTheme(): [Theme, React.Dispatch<React.SetStateAction<Theme>>] {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
interface ThemeProviderProps extends React.PropsWithChildren {
  initialTheme?: Theme;
}

function ThemeProvider({ initialTheme = 'light', children }: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(initialTheme);
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export { useTheme, ThemeProvider };

