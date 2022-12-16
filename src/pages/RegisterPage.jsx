import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import RegisterForm from '../components/RegisterForm';
import Toast from '../components/Toast';
import { register } from '../services/api';

function RegisterPage() {
  const { t } = useTranslation();
  const [serverError, setServerError] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onRegisterHandler = async (user) => {
    setIsLoading(true);

    const res = await register(user);

    if (res.message === 'EMAIL_ALREADY_EXIST') {
      setServerError(true);
      setErrorMessage(t('EMAIL_ALREADY_EXIST'));
    } else if (res.code === 'ERR_NETWORK') {
      res.message = 'ERR_NETWORK';
      setOpen(true);
      setAlertMessage(res.message);
    }
    setIsLoading(false);

    if (res.status === 'success') navigate('/');
  };

  const onResetEmailExist = () => {
    setServerError(false);
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
          <title>WForm - Register Page</title>
        </Helmet>
      </HelmetProvider>
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
        {open && (
          <Toast
            open={open}
            handleClose={handleClose}
            alertMessage={t(alertMessage)}
            status="error"
          />
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" fontWeight={500}>
            {t('REGISTER')}
          </Typography>
          <Avatar sx={{ m: 1 }}>
            <LockOutlined sx={{ color: 'text.primary' }} />
          </Avatar>
          <RegisterForm
            registerHandler={onRegisterHandler}
            serverError={serverError}
            errorMessage={errorMessage}
            resetEmailExist={onResetEmailExist}
            loading={isLoading}
          />
        </Box>
      </Container>
    </>
  );
}

export default RegisterPage;
