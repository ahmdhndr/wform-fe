import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Container, Typography } from '@mui/material';

import LoginForm from '../components/LoginForm';
import Toast from '../components/Toast';
import { clearNotification } from '../features/users/userSlice';
import { loginUser } from '../features/users/userActions';

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const { loading, notification } = useSelector((state) => state.user);

  const onLoginHandler = async ({ email, password }) => {
    const { payload } = await dispatch(loginUser({ email, password }));
    if (payload !== undefined && payload.status === 'success') {
      navigate(location.state?.path || '/');
    }
  };

  const handleClose = () => {
    dispatch(clearNotification());
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>WForm - Login Page</title>
        </Helmet>
      </HelmetProvider>
      {notification.open && (
        <Toast
          open={notification.open}
          handleClose={handleClose}
          message={t(notification.message)}
          status={notification.type}
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
