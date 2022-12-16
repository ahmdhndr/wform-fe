/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createBrowserHistory } from 'history';
import Cookies from 'js-cookie';
import { BASE_URL } from '../utils/Constants';
import { getAccessToken, getRefreshToken, updateAccessToken } from '../services/api';

const history = createBrowserHistory();

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res?.data,
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== '/login' && err.response) {
      // Access token was expired
      const { message } = err.response.data;
      if (message === 'INVALID_REFRESH_TOKEN' || message === 'REFRESH_TOKEN_EXPIRED') {
        Cookies.remove('token');
        history.push('/login');
      }
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await axiosInstance.post('/refresh-token', {
            refreshToken: getRefreshToken(),
          });
          const { accessToken } = rs.data;
          updateAccessToken(accessToken);

          return axiosInstance(originalConfig);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(err.response && err.response.data
      ? err.response.data
      : err);
  }
);

export default axiosInstance;