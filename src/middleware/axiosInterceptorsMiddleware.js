import axios from 'axios';

import { SERVER_URL } from '../utils/Constants';

import { logout } from '../features/users/userSlice';
import { getAccessToken, getRefreshToken, updateAccessToken } from '../services/cookiesManager';

let store;

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

export const injectStore = (_store) => {
  store = _store;
};

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
        store.dispatch(logout());
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