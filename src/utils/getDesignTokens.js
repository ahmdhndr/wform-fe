import { blue } from '@mui/material/colors';

const getDesignTokens = (mode) => ({
  palette: {
    primary: {
      main: blue[600]
    },
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        background: {
          paper: '#e2e8f1',
        },
      }
      : {
        background: {
          paper: '#262626',
        },
      }),
  },
});

export default getDesignTokens;
