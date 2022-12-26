import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

function setAuthCookies(data) {
  return Cookies.set('token', JSON.stringify(data), { expires: 1 });
}

function getAccessToken() {
  const data = Cookies.get('token');
  let accessToken = null;
  if (data) {
    const parsedToken = JSON.parse(data);
    const { accessToken: token } = parsedToken;
    accessToken = token;
  }
  return accessToken;
}

function updateAccessToken(token) {
  const data = Cookies.get('token');
  const parsedData = JSON.parse(data);
  parsedData.accessToken = token;
  Cookies.set('token', JSON.stringify(parsedData), { expires: 7 });
}

function getRefreshToken() {
  const data = Cookies.get('token');
  let refreshToken = null;
  if (data) {
    const parsedToken = JSON.parse(data);
    const { refreshToken: token } = parsedToken;
    refreshToken = token;
  }
  return refreshToken;
}

function getUserLogged(accessToken) {
  if (accessToken) {
    const { id, email, fullname, exp } = jwtDecode(accessToken);
    return { data: { id, email, fullname, exp } };
  }
  return null;
}

export {
  updateAccessToken,
  getRefreshToken,
  getAccessToken,
  setAuthCookies,
  getUserLogged,
};
