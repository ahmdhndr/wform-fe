import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Box, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

function RegisterForm(props) {
  const { t } = useTranslation();
  const {
    registerHandler,
    serverError,
    errorMessage,
    resetEmailExist,
    loading,
  } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const registerValidateOptions = {
    fullname: { required: t('FIELD_REQUIRED', { field: t('FULL_NAME') }) },
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
    confirmPassword: {
      required: t('PASSWORD_CONFIRM'),
      validate: (value) =>
        watch('password') === value ||
        t('MATCH_PASSWORD_CONFIRM', { field: t('PASSWORD') }),
    },
  };

  return (
    <Box component="form" onSubmit={handleSubmit(registerHandler)}>
      <TextField
        margin="normal"
        fullWidth
        id="fullname"
        label="Full Name"
        name="fullname"
        autoFocus
        {...register('fullname', registerValidateOptions.fullname)}
        error={!!errors.fullname}
        helperText={errors?.fullname && errors.fullname.message}
      />
      <TextField
        margin="normal"
        fullWidth
        type="email"
        id="email"
        label="Email Address"
        name="email"
        onKeyDown={resetEmailExist}
        {...register('email', registerValidateOptions.email)}
        error={!!errors.email || !!serverError}
        helperText={
          (serverError && errorMessage) ||
          (errors?.email && errors.email.message)
        }
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
      <TextField
        margin="normal"
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        {...register(
          'confirmPassword',
          registerValidateOptions.confirmPassword
        )}
        error={!!errors.confirmPassword}
        helperText={errors?.confirmPassword && errors.confirmPassword.message}
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
        {t('REGISTER')}
      </LoadingButton>
      <Box>
        {t('HAVE_ACCOUNT')}{' '}
        <Link to="/login">
          <Typography
            sx={{
              color: 'text.primary',
              fontWeight: 'bold',
              display: 'inline-block',
            }}
          >
            {t('LOGIN')}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

RegisterForm.propTypes = {
  registerHandler: PropTypes.func.isRequired,
  serverError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  resetEmailExist: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default RegisterForm;
