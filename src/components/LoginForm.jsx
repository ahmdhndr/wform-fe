import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';

function LoginForm(props) {
  const { t } = useTranslation();
  const { loginHandler, loading } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerValidateOptions = {
    email: {
      required: t('FIELD_REQUIRED', { field: 'Email' }),
      pattern: {
        value: /[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/,
        message: t('VALID_EMAIL'),
      },
    },
    password: {
      required: t('FIELD_REQUIRED', { field: t('PASSWORD') }),
      pattern: {
        value: /^[a-zA-Z0-9]{6,}$/,
        message: t('FIELD_MIN_LENGTH', { field: t('PASSWORD'), min: '6' }),
      },
    },
  };

  return (
    <Box component="form" onSubmit={handleSubmit(loginHandler)}>
      <TextField
        autoFocus
        margin="normal"
        fullWidth
        type="email"
        id="email"
        label="Email Address"
        name="email"
        {...register('email', registerValidateOptions.email)}
        error={!!errors.email}
        helperText={errors?.email && errors.email.message}
      />
      <TextField
        margin="normal"
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        {...register('password', registerValidateOptions.password)}
        error={!!errors.password}
        helperText={errors?.password && errors.password.message}
      />
      <LoadingButton
        type="submit"
        loading={loading}
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
        }}
      >
        {t('LOGIN')}
      </LoadingButton>
      <Box>
        {t('DONT_HAVE_ACCOUNT')}{' '}
        <Link to="/register">
          <Typography
            sx={{
              color: 'text.primary',
              fontWeight: 'bold',
              display: 'inline-block',
            }}
          >
            {t('REGISTER')}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

LoginForm.propTypes = {
  loginHandler: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default LoginForm;
