import { useState, useMemo, useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// context
import ColorModeContext from './context/ColorModeContext';

// pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import getDesignTokens from './utils/getDesignTokens';
import {
  COLOR_MODE,
  HOME,
  LOGIN_PATH,
  NOT_FOUND_PATH,
  REGISTER_PATH,
} from './utils/Constants';
import NotFoundPage from './pages/NotFoundPage';
import RequireAuth from './components/RequireAuth';
import HomePage from './pages/HomePage';
import { AuthContext } from './context/AuthContext';
import Header from './components/Header';

function App() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [mode, setMode] = useState(
    () => localStorage.getItem(COLOR_MODE) || 'light'
  );
  const [initializing, setInitializing] = useState(null);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem(COLOR_MODE, newMode);
      },
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    if (isLoggedIn && isLoggedIn !== 'undefined') {
      setInitializing(false);
      navigate('/');
    }
  }, []);

  if (initializing) return null;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <HelmetProvider>
          <Helmet>
            <title>WForm - Home</title>
          </Helmet>
        </HelmetProvider>
        {/* Main App */}
        <Container
          sx={{
            bgcolor: 'background.paper',
            color: 'text.primary',
            transition: 'all 300ms',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            minWidth: '100%',
            paddingLeft: 0,
            paddingRight: 0,
          }}
          className="app-container"
        >
          {/* header */}
          <Header theme={theme} onClick={colorMode.toggleColorMode} />
          <Container component="main" sx={{ flex: 1, position: 'relative' }}>
            <Routes>
              <Route exact path={LOGIN_PATH} element={<LoginPage />} />
              <Route path={REGISTER_PATH} element={<RegisterPage />} />
              <Route
                path={HOME}
                element={
                  <RequireAuth>
                    <HomePage />
                  </RequireAuth>
                }
              />
              <Route
                path={NOT_FOUND_PATH}
                element={
                  <RequireAuth>
                    <NotFoundPage />
                  </RequireAuth>
                }
              />
            </Routes>
          </Container>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
