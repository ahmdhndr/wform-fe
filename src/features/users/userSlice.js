import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { getAccessToken, getUserLogged } from '../../services/cookiesManager';
import { registerUser, loginUser, getUserDetail } from './userActions';

const userToken = getAccessToken() || null;
const data = getUserLogged(userToken);
let userInfo;
if (data !== null) userInfo = data.data;

const initialState = {
  loading: false,
  userInfo,
  userToken,
  notification: {
    open: false,
    type: 'info',
    message: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      Cookies.remove('token');
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
    },
    clearNotification(state) {
      state.notification.open = false;
      state.notification.type = 'info';
      state.notification.message = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        if (action.error.code) action.error.message = action.error.code;
        state.loading = false;
        state.notification = {
          open: true,
          type: 'error',
          message: action.error.message,
        };
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.data;
        state.userToken = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        if (action.error.code) action.error.message = action.error.code;
        state.notification = {
          open: true,
          type: 'error',
          message: action.error.message,
        };
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.userInfo = action.payload.data;
      });
  },
});
const { actions, reducer } = userSlice;
export const { logout, changeStatus, clearNotification } = actions;
export default reducer;