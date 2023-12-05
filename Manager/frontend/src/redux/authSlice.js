import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
    changePassword: {
      isFetching: false,
      error: false,
      success: false,
    },
    msg: '',
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
      state.msg = '';
    },
    loginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.error = true;
      state.msg = action.payload;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
      state.msg = '';
    },
    registerFailed: (state, action) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
      state.msg = action.payload;
    },
    logoutStart: (state) => {
      state.login.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = false;
    },
    logoutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    changePasswordStart: (state) => {
      state.changePassword.isFetching = true;
    },
    changePasswordSuccess: (state) => {
      state.changePassword.isFetching = false;
      state.changePassword.success = true;
      state.changePassword.error = false;
      state.msg = '';
    },
    changePasswordFailed: (state, action) => {
      state.changePassword.isFetching = false;
      state.changePassword.success = false;
      state.changePassword.error = true;
      state.msg = action.payload;
    },
    clearAuthPayload: (state) => {
      state.login.currentUser = null;
      state.register.success = false;
    },
  },
});
export const {
  loginStart,
  loginFailed,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailed,
  clearAuthPayload,
} = authSlice.actions;
export default authSlice.reducer;
