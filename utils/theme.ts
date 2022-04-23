import { Theme } from 'theme-ui'

export const theme: Theme = {
  breakpoints: [],
  fonts: {
    body: 'Sniglet, cursive',
    heading: 'Sniglet, cursive',
    monospace: 'Sniglet, cursive',
  },
  fontSizes: {
    sm: 13,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 30,
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#f29c1f',
    secondary: '#30c',
    muted: '#f6f6f6',
  },
  forms: {
    input: {
      outline: 'none',
      border: '1px solid',
      borderColor: 'primary',
    },
  },
}

export default theme
