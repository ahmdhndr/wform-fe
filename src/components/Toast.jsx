import { Alert, Snackbar } from '@mui/material';
import PropTypes from 'prop-types';

function Toast(props) {
  const { open, message, status, handleClose } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      sx={{ width: { sm: '550px', md: '600px' } }}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={status}
        sx={{ width: '100%', color: '#fff' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

Toast.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  status: PropTypes.oneOf(['error', 'success', 'warning', 'info']).isRequired,
};

export default Toast;
