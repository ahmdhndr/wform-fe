import { useContext, useState } from 'react';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { AuthContext } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import Toast from '../components/Toast';
import { login, setAuthCookies } from '../services/api';

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { onLogin } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const onLoginHandler = async ({ email, password }) => {
    setLoading(true);
    const res = await login(email, password);

    if (res.code === 'ERR_NETWORK') {
      res.message = 'ERR_NETWORK';
      setOpen(true);
      setAlertMessage(res.message);
      setLoading(false);
    } else if (res.status === 'fail') {
      setOpen(true);
      setAlertMessage(res.message);
      setLoading(false);
    }

    if (res.status === 'success') {
      const { accessToken, refreshToken } = res.data;
      const data = {
        accessToken,
        refreshToken,
      };
      onLogin(accessToken);
      setAuthCookies(data);
      setLoading(false);
      navigate(state?.path || '/');
    }
    setLoading(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>WForm - Login Page</title>
        </Helmet>
      </HelmetProvider>
      {open && (
        <Toast
          open={open}
          handleClose={handleClose}
          alertMessage={t(alertMessage)}
          status="error"
        />
      )}
      <Container
        component="section"
        maxWidth="xs"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" fontWeight={500}>
            {t('LOGIN')}
          </Typography>
          <Avatar sx={{ m: 1 }}>
            <LockOutlined sx={{ color: 'text.primary' }} />
          </Avatar>
          <LoginForm loginHandler={onLoginHandler} loading={loading} />
        </Box>
      </Container>
    </>
  );
}

export default LoginPage;
