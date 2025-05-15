import * as React from 'react'
import {useTheme} from './theme'

export type Theme = 'light' | 'dark';

const styles: Record<Theme, React.CSSProperties> = {
  dark: {
    backgroundColor: 'black',
    color: 'white',
  },
  light: {
    color: 'black',
    backgroundColor: 'white',
  },
};

function EasyButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [theme] = useTheme(); 
  return <button style={styles[theme]} {...props} />;
}

export default EasyButton
