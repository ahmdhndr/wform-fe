import { blue } from '@mui/material/colors';

const colorTheme = (mode) => ({
  palette: {
    custom: {
      main: '#ffffff'
    },
    primary: {
      main: blue[600],
    },
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        secondary: {
          main: '#ffffff'
        },
        background: {
          paper: '#e2e8f1',
        },
      }
      : {
        // palette values for dark mode
        secondary: {
          main: '#ffffff'
        },
        background: {
          paper: '#262626',
        },
      }),
  },
});

export default colorTheme;
