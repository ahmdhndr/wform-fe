import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// context
import ColorModeContext from './context/ColorModeContext';

// pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import colorTheme from './utils/colorTheme';
import {
  COLOR_MODE,
  DETAIL_FORM_PATH,
  HOME,
  LOGIN_PATH,
  NOT_FOUND_PATH,
  REGISTER_PATH,
} from './utils/Constants';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './utils/ProtectedRoute';
import PublicRoute from './utils/PublicRoute';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Toast from './components/Toast';
import DetailForms from './pages/DetailForms';
import { clearNotification } from './features/forms/formsSlice';

let isInitial = true;

function App() {
  const { t } = useTranslation();
  const [mode, setMode] = useState(
    () => localStorage.getItem(COLOR_MODE) || 'light'
  );
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

  const theme = useMemo(() => createTheme(colorTheme(mode)), [mode]);

  const { notification } = useSelector((state) => state.forms);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitial) isInitial = false;
  }, []);

  const handleClose = () => {
    dispatch(clearNotification());
  };

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
          {notification.open && (
            <Toast
              open={notification.open}
              message={t(notification.message)}
              status={notification.type}
              handleClose={handleClose}
            />
          )}
          {/* Header */}
          <Header theme={theme} onClick={colorMode.toggleColorMode} />
          {/* Main */}
          <Container
            component="main"
            maxWidth={false}
            sx={{ px: '0 !important', flex: 1, position: 'relative' }}
          >
            <Routes>
              <Route
                path={LOGIN_PATH}
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path={REGISTER_PATH}
                element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                }
              />
              <Route
                path={HOME}
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path={DETAIL_FORM_PATH}
                element={
                  <ProtectedRoute>
                    <DetailForms />
                  </ProtectedRoute>
                }
              />
              <Route path={NOT_FOUND_PATH} element={<NotFoundPage />} />
            </Routes>
          </Container>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
