import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from './internal';
import { getUserLogged, setAuthCookies } from '../../services/cookiesManager';

const registerUser = createAsyncThunk('user/register', async (initialUser) => {
  const response = await axiosInstance.post('/register', initialUser);
  return response;
});

const loginUser = createAsyncThunk('user/login', async (user) => {
  const response = await axiosInstance.post('/login', user);
  setAuthCookies(response.data);
  const { data } = getUserLogged(response.data.accessToken);
  return { data, token: response.data.accessToken };
});

const getUserDetail = createAsyncThunk('user/getUserDetail', async () => {
  const response = await axiosInstance.get('/profile');
  return response;
});

export { registerUser, loginUser, getUserDetail };