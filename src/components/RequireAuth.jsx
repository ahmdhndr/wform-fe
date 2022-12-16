import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/AuthContext';

function RequireAuth({ children }) {
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);
  return !isLoggedIn ? (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  ) : (
    children
  );
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
