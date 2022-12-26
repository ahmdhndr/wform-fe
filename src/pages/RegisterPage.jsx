import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Container, Typography } from '@mui/material';

import RegisterForm from '../components/RegisterForm';
import Toast from '../components/Toast';

import { clearNotification } from '../features/users/userSlice';
import { registerUser } from '../features/users/userActions';

function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, notification } = useSelector((state) => state.user);

  const onRegisterHandler = async (user) => {
    const data = await dispatch(registerUser(user));
    if (data.payload !== undefined && data.payload.status === 'success') {
      navigate('/login');
    }
  };

  const handleClose = () => {
    dispatch(clearNotification());
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
        {notification.open && (
          <Toast
            open={notification.open}
            handleClose={handleClose}
            message={t(notification.message)}
            status={notification.type}
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
          <RegisterForm registerHandler={onRegisterHandler} loading={loading} />
        </Box>
      </Container>
    </>
  );
}

export default RegisterPage;
