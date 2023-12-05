import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    initialState: {
      isFetching: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    },
    users: {
      allUsers: null,
      isFetching: false,
      error: false,
    },
    staffaccount: {
      allStaffAccount: null,
      isFetching: false,
      error: false,
    },
    staffinfo: {
      allStaffInfo: null,
      isFetching: false,
      error: false,
    },
    customeraccount: {
      allCustomerAccount: null,
      isFetching: false,
      error: false,
    },
    customerinfo: {
      allCustomerInfo: null,
      isFetching: false,
      error: false,
    },
    currentstaffinfo: {
      onlyCurrentstaffinfo: null,
    },
    updateStaffInfo: {
      isUpdating: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    },
    deleteStaffInfo: {
      isDeleting: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    },
    createStaffAccount: {
      isCreating: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    },
    updateStaffAccount: {
      isUpdating: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    },
    deleteStaffAccount: {
      isDeleting: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    },
    createCustomerInfo: {
      isCreating: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    },
    updateCustomerInfo: {
      isUpdating: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    },
    deleteCustomerInfo: {
      isDeleting: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    },
    createCustomerAccount: {
      isCreating: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    },
    updateCustomerAccount: {
      isUpdating: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    },
    deleteCustomerAccount: {
      isDeleting: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    },
  },
  reducers: {
    updateStaffInfoStart: (state) => {
      state.updateStaffInfo.isUpdating = true;
      state.updateStaffInfo.isSuccess = false;
      state.updateStaffInfo.isError = false;
      state.updateStaffInfo.errorMessage = '';
    },
    updateStaffInfoSuccess: (state) => {
      state.updateStaffInfo.isUpdating = false;
      state.updateStaffInfo.isSuccess = true;
      state.updateStaffInfo.isError = false;
      state.updateStaffInfo.errorMessage = '';
    },
    updateStaffInfoFailure: (state, action) => {
      state.updateStaffInfo.isUpdating = false;
      state.updateStaffInfo.isSuccess = false;
      state.updateStaffInfo.isError = true;
      state.updateStaffInfo.errorMessage = action.payload;
    },
    getUserStart: (state) => {
      state.users.isFetching = true;
    },
    getUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
      state.users.error = false;
    },
    getUserFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },

    getStaffAccountStart: (state) => {
      state.staffaccount.isFetching = true;
    },
    getStaffAccountSuccess: (state, action) => {
      state.staffaccount.isFetching = false;
      state.staffaccount.allStaffAccount = action.payload;
      state.staffaccount.error = false;
    },
    getStaffAccountFailed: (state) => {
      state.staffaccount.isFetching = false;
      state.staffaccount.error = true;
    },

    getStaffInfoStart: (state) => {
      state.staffinfo.isFetching = true;
    },
    getStaffInfoSuccess: (state, action) => {
      state.staffinfo.isFetching = false;
      state.staffinfo.allStaffInfo = action.payload;
      state.staffinfo.error = false;
    },
    getStaffInfoFailed: (state) => {
      state.staffinfo.isFetching = false;
      state.staffinfo.error = true;
    },

    getCustomerAccountStart: (state) => {
      state.customeraccount.isFetching = true;
    },
    getCustomerAccountSuccess: (state, action) => {
      state.customeraccount.isFetching = false;
      state.customeraccount.allCustomerAccount = action.payload;
      state.customeraccount.error = false;
    },
    getCustomerAccountFailed: (state) => {
      state.customeraccount.isFetching = false;
      state.customeraccount.error = true;
    },

    getCustomerInfoStart: (state) => {
      state.customerinfo.isFetching = true;
    },

    getCustomerInfoSuccess: (state, action) => {
      state.customerinfo.isFetching = false;
      state.customerinfo.allCustomerInfo = action.payload;
      state.customerinfo.error = false;
    },
    getCustomerInfoFailed: (state) => {
      state.customerinfo.isFetching = false;
      state.customerinfo.error = true;
    },

    getCurrentStaffInfoStart: (state) => {},

    getCurrentStaffInfoSuccess: (state, action) => {
      state.currentstaffinfo.onlyCurrentstaffinfo = action.payload;
    },
    getCurrentStaffInfoFailed: (state) => {},
    clearUsersPayload: (state) => {
      state.users.allUsers = null;
      state.staffaccount.allStaffAccount = null;
      state.staffinfo.allStaffInfo = null;
      state.customeraccount.allCustomerAccount = null;
      state.customerinfo.allCustomerInfo = null;
    },
    createUserStart: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
    },
    createUserSuccess: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = '';
    },
    createUserFailure: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    deleteStaffInfoStart: (state) => {
      state.deleteStaffInfo.isDeleting = true;
      state.deleteStaffInfo.isSuccess = false;
      state.deleteStaffInfo.isError = false;
      state.deleteStaffInfo.errorMessage = '';
    },
    deleteStaffInfoSuccess: (state) => {
      state.deleteStaffInfo.isDeleting = false;
      state.deleteStaffInfo.isSuccess = true;
      state.deleteStaffInfo.isError = false;
      state.deleteStaffInfo.errorMessage = '';
    },
    deleteStaffInfoFailure: (state, action) => {
      state.deleteStaffInfo.isDeleting = false;
      state.deleteStaffInfo.isSuccess = false;
      state.deleteStaffInfo.isError = true;
      state.deleteStaffInfo.errorMessage = action.payload;
    },
    createStaffAccountStart: (state) => {
      state.createStaffAccount.isCreating = true;
      state.createStaffAccount.isSuccess = false;
      state.createStaffAccount.isError = false;
      state.createStaffAccount.errorMessage = '';
    },
    createStaffAccountSuccess: (state) => {
      state.createStaffAccount.isFetching = false;
      state.createStaffAccount.isSuccess = true;
      state.createStaffAccount.isError = false;
      state.createStaffAccount.errorMessage = '';
    },
    createStaffAccountFailure: (state, action) => {
      state.createStaffAccount.isFetching = false;
      state.createStaffAccount.isSuccess = false;
      state.createStaffAccount.isError = true;
      state.createStaffAccount.errorMessage = action.payload;
    },
    deleteStaffAccountStart: (state) => {
      state.deleteStaffAccount.isDeleting = true;
      state.deleteStaffAccount.isSuccess = false;
      state.deleteStaffAccount.isError = false;
      state.deleteStaffAccount.errorMessage = '';
    },
    deleteStaffAccountSuccess: (state) => {
      state.deleteStaffAccount.isDeleting = false;
      state.deleteStaffAccount.isSuccess = true;
      state.deleteStaffAccount.isError = false;
      state.deleteStaffAccount.errorMessage = '';
    },
    deleteStaffAccountFailure: (state, action) => {
      state.deleteStaffAccount.isDeleting = false;
      state.deleteStaffAccount.isSuccess = false;
      state.deleteStaffAccount.isError = true;
      state.deleteStaffAccount.errorMessage = action.payload;
    },
    updateStaffAccountStart: (state) => {
      state.updateStaffAccount.isUpdating = true;
      state.updateStaffAccount.isSuccess = false;
      state.updateStaffAccount.isError = false;
      state.updateStaffAccount.errorMessage = '';
    },
    updateStaffAccountSuccess: (state) => {
      state.updateStaffAccount.isUpdating = false;
      state.updateStaffAccount.isSuccess = true;
      state.updateStaffAccount.isError = false;
      state.updateStaffAccount.errorMessage = '';
    },
    updateStaffAccountFailure: (state, action) => {
      state.updateStaffAccount.isUpdating = false;
      state.updateStaffAccount.isSuccess = false;
      state.updateStaffAccount.isError = true;
      state.updateStaffAccount.errorMessage = action.payload;
    },

    createCustomerInfoStart: (state) => {
      state.createCustomerInfo.isCreating = true;
      state.createCustomerInfo.isSuccess = false;
      state.createCustomerInfo.isError = false;
      state.createCustomerInfo.errorMessage = '';
    },
    createCustomerInfoSuccess: (state) => {
      state.createCustomerInfo.isCreating = false;
      state.createCustomerInfo.isSuccess = true;
      state.createCustomerInfo.isError = false;
      state.createCustomerInfo.errorMessage = '';
    },
    createCustomerInfoFailure: (state, action) => {
      state.createCustomerInfo.isCreating = false;
      state.createCustomerInfo.isSuccess = false;
      state.createCustomerInfo.isError = true;
      state.createCustomerInfo.errorMessage = action.payload;
    },
    updateCustomerInfoStart: (state) => {
      state.updateCustomerInfo.isUpdating = true;
      state.updateCustomerInfo.isSuccess = false;
      state.updateCustomerInfo.isError = false;
      state.updateCustomerInfo.errorMessage = '';
    },
    updateCustomerInfoSuccess: (state) => {
      state.updateCustomerInfo.isUpdating = false;
      state.updateCustomerInfo.isSuccess = true;
      state.updateCustomerInfo.isError = false;
      state.updateCustomerInfo.errorMessage = '';
    },
    updateCustomerInfoFailure: (state, action) => {
      state.updateCustomerInfo.isUpdating = false;
      state.updateCustomerInfo.isSuccess = false;
      state.updateCustomerInfo.isError = true;
      state.updateCustomerInfo.errorMessage = action.payload;
    },

    deleteCustomerInfoStart: (state) => {
      state.deleteCustomerInfo.isDeleting = true;
      state.deleteCustomerInfo.isSuccess = false;
      state.deleteCustomerInfo.isError = false;
      state.deleteCustomerInfo.errorMessage = '';
    },
    deleteCustomerInfoSuccess: (state) => {
      state.deleteCustomerInfo.isDeleting = false;
      state.deleteCustomerInfo.isSuccess = true;
      state.deleteCustomerInfo.isError = false;
      state.deleteCustomerInfo.errorMessage = '';
    },
    deleteCustomerInfoFailure: (state, action) => {
      state.deleteCustomerInfo.isDeleting = false;
      state.deleteCustomerInfo.isSuccess = false;
      state.deleteCustomerInfo.isError = true;
      state.deleteCustomerInfo.errorMessage = action.payload;
    },
    createCustomerAccountStart: (state) => {
      state.createCustomerAccount.isCreating = true;
      state.createCustomerAccount.isSuccess = false;
      state.createCustomerAccount.isError = false;
      state.createCustomerAccount.errorMessage = '';
    },
    createCustomerAccountSuccess: (state) => {
      state.createCustomerAccount.isCreating = false;
      state.createCustomerAccount.isSuccess = true;
      state.createCustomerAccount.isError = false;
      state.createCustomerAccount.errorMessage = '';
    },
    createCustomerAccountFailure: (state, action) => {
      state.createCustomerAccount.isCreating = false;
      state.createCustomerAccount.isSuccess = false;
      state.createCustomerAccount.isError = true;
      state.createCustomerAccount.errorMessage = action.payload;
    },
    updateCustomerAccountStart: (state) => {
      state.updateCustomerAccount.isUpdating = true;
      state.updateCustomerAccount.isSuccess = false;
      state.updateCustomerAccount.isError = false;
      state.updateCustomerAccount.errorMessage = '';
    },
    updateCustomerAccountSuccess: (state) => {
      state.updateCustomerAccount.isUpdating = false;
      state.updateCustomerAccount.isSuccess = true;
      state.updateCustomerAccount.isError = false;
      state.updateCustomerAccount.errorMessage = '';
    },
    updateCustomerAccountFailure: (state, action) => {
      state.updateCustomerAccount.isUpdating = false;
      state.updateCustomerAccount.isSuccess = false;
      state.updateCustomerAccount.isError = true;
      state.updateCustomerAccount.errorMessage = action.payload;
    },
    deleteCustomerAccountStart: (state) => {
      state.deleteCustomerAccount.isDeleting = true;
      state.deleteCustomerAccount.isSuccess = false;
      state.deleteCustomerAccount.isError = false;
      state.deleteCustomerAccount.errorMessage = '';
    },

    deleteCustomerAccountSuccess: (state) => {
      state.deleteCustomerAccount.isDeleting = false;
      state.deleteCustomerAccount.isSuccess = true;
      state.deleteCustomerAccount.isError = false;
      state.deleteCustomerAccount.errorMessage = '';
    },
    deleteCustomerAccountFailure: (state, action) => {
      state.deleteCustomerAccount.isDeleting = false;
      state.deleteCustomerAccount.isSuccess = false;
      state.deleteCustomerAccount.isError = true;
      state.deleteCustomerAccount.errorMessage = action.payload;
    },
  },
});
export const {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  getStaffAccountStart,
  getStaffAccountSuccess,
  getStaffAccountFailed,
  getStaffInfoStart,
  getStaffInfoSuccess,
  getStaffInfoFailed,
  getCustomerAccountStart,
  getCustomerAccountSuccess,
  getCustomerAccountFailed,
  getCustomerInfoStart,
  getCustomerInfoSuccess,
  getCustomerInfoFailed,
  getCurrentStaffInfoStart,
  getCurrentStaffInfoSuccess,
  getCurrentStaffInfoFailed,
  clearUsersPayload,
  createUserStart,
  createUserSuccess,
  createUserFailure,
  updateStaffInfoStart,
  updateStaffInfoSuccess,
  updateStaffInfoFailure,
  deleteStaffInfoStart,
  deleteStaffInfoSuccess,
  deleteStaffInfoFailure,
  createStaffAccountStart,
  createStaffAccountSuccess,
  createStaffAccountFailure,
  updateStaffAccountStart,
  updateStaffAccountFailure,
  updateStaffAccountSuccess,
  deleteStaffAccountStart,
  deleteStaffAccountSuccess,
  deleteStaffAccountFailure,
  createCustomerInfoStart,
  createCustomerInfoSuccess,
  createCustomerInfoFailure,
  updateCustomerInfoStart,
  updateCustomerInfoSuccess,
  updateCustomerInfoFailure,
  deleteCustomerInfoStart,
  deleteCustomerInfoSuccess,
  deleteCustomerInfoFailure,
  createCustomerAccountStart,
  createCustomerAccountSuccess,
  createCustomerAccountFailure,
  updateCustomerAccountStart,
  updateCustomerAccountSuccess,
  updateCustomerAccountFailure,
  deleteCustomerAccountStart,
  deleteCustomerAccountSuccess,
  deleteCustomerAccountFailure,
} = userSlice.actions;
export default userSlice.reducer;
