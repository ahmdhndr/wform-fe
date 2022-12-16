import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

// eslint-disable-next-line import/no-cycle
import axiosInstance from '../middleware/network-service';
import { BASE_URL } from '../utils/Constants';

function setAuthCookies(data) {
  // const in1hour = new Date(new Date().getTime() + 60 * 60 * 1000);
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
  Cookies.set('token', JSON.stringify(parsedData), { expires: 1 });
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
    return { data: { id, accessToken, email, fullname, exp } };
  }
  return {};
}

function getRefreshTokenExp() {
  const data = Cookies.get('token');
  if (data) {
    const parsedData = JSON.parse(data);
    const { refreshToken } = parsedData;
    const { exp } = jwtDecode(refreshToken);
    return exp;
  }
  return '';
}

async function axiosWithToken(url, config = {}) {
  return axios(url, {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${getAccessToken()}`
    },
  });
}

async function register({ fullname, email, password }) {
  try {
    const response = await axios(`${BASE_URL}/register`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { fullname, email, password },
    });

    const { data } = response;
    return data;
  } catch (error) {
    return error.response && error.response.data
      ? error.response.data
      : error;
  }
}

async function login(email, password) {
  try {
    const response = await axios(`${BASE_URL}/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { email, password },
    });

    const { data } = response;
    return data;
  } catch (error) {
    return error.response && error.response.data
      ? error.response.data
      : error;
  }
}

async function getForms() {
  try {
    const { data, status } = await axiosInstance.get('/forms');
    return { data, status };
  } catch (error) {
    console.log(error);
    return error.response && error.response.data
      ? error.response.data
      : error;
  }
  // return axiosInstance.get('/forms');
}

async function addNewForm(title, description) {
  try {
    const { data, status } = await axiosInstance.post('/forms', {
      title: title || 'Untitled form',
      description: description || 'Form description'
    });
    return { data, status };
  } catch (error) {
    return error.response && error.response.data
      ? error.response.data
      : error;
  }
}

async function addNewQuestion(formId) {
  try {
    const { data, status } = await axiosInstance.post(`/forms/${formId}/questions`, {
      question: 'Untitled question',
      // type: type || 'text',
      // required: required || false,
    });
    return { data, status };
  } catch (error) {
    return error.response && error.response.data
      ? error.response.data
      : error;
  }
}

export {
  axiosWithToken,
  getAccessToken,
  updateAccessToken,
  getRefreshToken,
  getRefreshTokenExp,
  setAuthCookies,
  register,
  login,
  getUserLogged,
  getForms,
  addNewForm,
  addNewQuestion
};
