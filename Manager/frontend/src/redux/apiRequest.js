import axios from 'axios';
import {
  loginFailed,
  loginStart,
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
} from './authSlice';
import {
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
} from './userSlice';

import {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailed,
  getDrinksInfoSuccess,
  getDrinksInfoStart,
  getDrinksInfoFailed,
  getDrinksPriceStart,
  getDrinksPriceSuccess,
  getDrinksPriceFailed,
  createCategoriesStart,
  createCategoriesSuccess,
  createCategoriesFailed,
  updateCategoriesFailed,
  updateCategoriesSuccess,
  updateCategoriesStart,
  deleteCategoriesFailed,
  deleteCategoriesStart,
  deleteCategoriesSuccess,
  createDrinksInfoFailed,
  createDrinksInfoStart,
  createDrinksInfoSuccess,
  updateDrinksInfoFailed,
  updateDrinksInfoStart,
  updateDrinksInfoSuccess,
  deleteDrinksInfoFailed,
  deleteDrinksInfoStart,
  deleteDrinksInfoSuccess,
  createDrinksPriceFailed,
  createDrinksPriceStart,
  createDrinksPriceSuccess,
  updateDrinksPriceFailed,
  updateDrinksPriceStart,
  updateDrinksPriceSuccess,
  deleteDrinksPriceFailed,
  deleteDrinksPriceStart,
  deleteDrinksPriceSuccess,
  clearDrinksPayload,
} from './drinksSlice';

import {
  getOrdersStart,
  getOrdersSuccess,
  getOrdersFailed,
  getOrdersDetailStart,
  getOrdersDetailSuccess,
  getOrdersDetailFailed,
  createOrdersStart,
  createOrdersSuccess,
  createOrdersFailed,
  updateOrdersStart,
  updateOrdersSuccess,
  updateOrdersFailed,
  deleteOrdersStart,
  deleteOrdersSuccess,
  deleteOrdersFailed,
  createOrdersDetailStart,
  createOrdersDetailSuccess,
  createOrdersDetailFailed,
  updateOrdersDetailStart,
  updateOrdersDetailSuccess,
  updateOrdersDetailFailed,
  deleteOrdersDetailStart,
  deleteOrdersDetailSuccess,
  deleteOrdersDetailFailed,
  clearOrdersPayload,
} from './ordersSlice';

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post('http://localhost:8000/manager/auth/login', user, { withCredentials: true });
    dispatch(loginSuccess(res.data));
    navigate('/dashboard/app');
  } catch (err) {
    dispatch(loginFailed(err.response.data));
  }
};
export const changePassword = async (accessToken, dispatch, passwords, axiosJWT) => {
  dispatch(changePasswordStart());
  try {
    const res = await axiosJWT.post('http://localhost:8000/manager/auth/changepassword', passwords, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(changePasswordSuccess());
    return statusCode;
  } catch (err) {
    dispatch(changePasswordFailed(err.response.data));
    return err;
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post('http://localhost:8000/manager/auth/register', user);
    dispatch(registerSuccess(res.data));
    navigate('/login');
  } catch (err) {
    dispatch(registerFailed(err.response.data));
  }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUserStart());
  try {
    const res = await axiosJWT.get('http://localhost:8000/manager/user/getAllUsers', {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getUserFailed());
  }
};

export const getStaffAccount = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getStaffAccountStart());
  try {
    const res = await axiosJWT.get('http://localhost:8000/manager/user/getStaffAccount', {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getStaffAccountSuccess(res.data));
  } catch (err) {
    dispatch(getStaffAccountFailed());
  }
};

export const getStaffInfo = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getStaffInfoStart());
  try {
    const res = await axiosJWT.get('http://localhost:8000/manager/user/getStaffInfo', {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getStaffInfoSuccess(res.data));
  } catch (err) {
    dispatch(getStaffInfoFailed());
  }
};
export const createStaffAccount = async (accessToken, dispatch, staffAccount, axiosJWT) => {
  dispatch(createStaffAccountStart());
  try {
    const res = await axiosJWT.post('http://localhost:8000/manager/user/createStaffAccount', staffAccount, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(createStaffAccountSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(createStaffAccountFailure(err.response.data));
    return err;
  }
};

export const updateStaffAccount = async (accessToken, dispatch, updatedStaffAccount, axiosJWT) => {
  dispatch(updateStaffAccountStart());
  try {
    const res = await axiosJWT.post(`http://localhost:8000/manager/user/updateStaffAccount`, updatedStaffAccount, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;

    dispatch(updateStaffAccountSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(updateStaffAccountFailure(err.response.data));
    return err;
  }
};

export const deleteStaffAccount = async (accessToken, dispatch, staffAccountId, axiosJWT) => {
  dispatch(deleteStaffAccountStart());
  try {
    const res = await axiosJWT.delete(`http://localhost:8000/manager/user/deleteStaffAccount/${staffAccountId}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(deleteStaffAccountSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(deleteStaffAccountFailure(err.response.data));
    return err;
  }
};

export const createUser = async (accessToken, dispatch, user, axiosJWT) => {
  dispatch(createUserStart());
  try {
    const res = await axiosJWT.post('http://localhost:8000/manager/user/createUser', user, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(createUserSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(createUserFailure(err.response.data));
    return err;
  }
};

export const updateStaffInfo = async (accessToken, dispatch, updatedUser, axiosJWT) => {
  dispatch(updateStaffInfoStart());
  try {
    const res = await axiosJWT.post(`http://localhost:8000/manager/user/updateStaffInfo`, updatedUser, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;

    dispatch(updateStaffInfoSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(updateStaffInfoFailure(err.response.data));
    return err;
  }
};

export const deleteStaffInfo = async (accessToken, dispatch, userId, axiosJWT) => {
  dispatch(deleteStaffInfoStart());
  try {
    const res = await axiosJWT.delete(`http://localhost:8000/manager/user/deleteUser/${userId}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(deleteStaffInfoSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(deleteStaffInfoFailure(err.response.data));
    return err;
  }
};

export const getCustomerAccount = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getCustomerAccountStart());
  try {
    const res = await axiosJWT.get('http://localhost:8000/manager/user/getCustomerAccount', {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getCustomerAccountSuccess(res.data));
  } catch (err) {
    dispatch(getCustomerAccountFailed());
  }
};
export const createCustomerAccount = async (accessToken, dispatch, customerAccount, axiosJWT) => {
  dispatch(createCustomerAccountStart());
  try {
    const res = await axiosJWT.post('http://localhost:8000/manager/user/createCustomerAccount', customerAccount, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(createCustomerAccountSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(createCustomerAccountFailure(err.response.data));
    return err;
  }
};

export const updateCustomerAccount = async (accessToken, dispatch, updatedCustomerAccount, axiosJWT) => {
  dispatch(updateCustomerAccountStart());
  try {
    const res = await axiosJWT.post(
      `http://localhost:8000/manager/user/updateCustomerAccount`,
      updatedCustomerAccount,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    const statusCode = res.status;

    dispatch(updateCustomerAccountSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(updateCustomerAccountFailure(err.response.data));
    return err;
  }
};

export const deleteCustomerAccount = async (accessToken, dispatch, customerAccountId, axiosJWT) => {
  dispatch(deleteCustomerAccountStart());
  try {
    const res = await axiosJWT.delete(`http://localhost:8000/manager/user/deleteCustomerAccount/${customerAccountId}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(deleteCustomerAccountSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(deleteCustomerAccountFailure(err.response.data));
    return err;
  }
};

export const getCustomerInfo = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getCustomerInfoStart());
  try {
    const res = await axiosJWT.get('http://localhost:8000/manager/user/getCustomerInfo', {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getCustomerInfoSuccess(res.data));
  } catch (err) {
    dispatch(getCustomerInfoFailed());
  }
};
export const createCustomerInfo = async (accessToken, dispatch, customerInfo, axiosJWT) => {
  dispatch(createCustomerInfoStart());
  try {
    const res = await axiosJWT.post('http://localhost:8000/manager/user/createCustomerInfo', customerInfo, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(createCustomerInfoSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(createCustomerInfoFailure(err.response.data));
    return err;
  }
};

export const updateCustomerInfo = async (accessToken, dispatch, updatedCustomerInfo, axiosJWT) => {
  dispatch(updateCustomerInfoStart());
  try {
    const res = await axiosJWT.post(`http://localhost:8000/manager/user/updateCustomerInfo`, updatedCustomerInfo, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;

    dispatch(updateCustomerInfoSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(updateCustomerInfoFailure(err.response.data));
    return err;
  }
};

export const deleteCustomerInfo = async (accessToken, dispatch, customerInfoId, axiosJWT) => {
  dispatch(deleteCustomerInfoStart());
  try {
    const res = await axiosJWT.delete(`http://localhost:8000/manager/user/deleteCustomerInfo/${customerInfoId}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(deleteCustomerInfoSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(deleteCustomerInfoFailure(err.response.data));
    return err;
  }
};

export const getCategories = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getCategoriesStart());
  try {
    const res = await axiosJWT.get('http://localhost:8000/manager/drinks/getCategories', {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getCategoriesSuccess(res.data));
  } catch (err) {
    dispatch(getCategoriesFailed());
  }
};
export const createCategories = async (accessToken, dispatch, categoriesData, axiosJWT) => {
  dispatch(createCategoriesStart());
  try {
    const res = await axiosJWT.post('http://localhost:8000/manager/drinks/createCategories', categoriesData, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(createCategoriesSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(createCategoriesFailed(err.response.data));
    return err;
  }
};

export const updateCategories = async (accessToken, dispatch, updatedCategoriesData, axiosJWT) => {
  dispatch(updateCategoriesStart());
  try {
    const res = await axiosJWT.post(`http://localhost:8000/manager/drinks/updateCategories`, updatedCategoriesData, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;

    dispatch(updateCategoriesSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(updateCategoriesFailed(err.response.data));
    return err;
  }
};

export const deleteCategories = async (accessToken, dispatch, categoryId, axiosJWT) => {
  dispatch(deleteCategoriesStart());
  try {
    const res = await axiosJWT.delete(`http://localhost:8000/manager/drinks/deleteCategories/${categoryId}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(deleteCategoriesSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(deleteCategoriesFailed(err.response.data));
    return err;
  }
};

export const getDrinksInfo = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getDrinksInfoStart());
  try {
    const res = await axiosJWT.get('http://localhost:8000/manager/drinks/getDrinksInfo', {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getDrinksInfoSuccess(res.data));
  } catch (err) {
    dispatch(getDrinksInfoFailed());
  }
};
export const createDrinksInfo = async (accessToken, dispatch, drinksInfoData, axiosJWT) => {
  dispatch(createDrinksInfoStart());
  try {
    const res = await axiosJWT.post('http://localhost:8000/manager/drinks/createDrinksInfo', drinksInfoData, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(createDrinksInfoSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(createDrinksInfoFailed(err.response.data));
    return err;
  }
};

export const updateDrinksInfo = async (accessToken, dispatch, updatedDrinksInfoData, axiosJWT) => {
  dispatch(updateDrinksInfoStart());
  try {
    const res = await axiosJWT.post(`http://localhost:8000/manager/drinks/updateDrinksInfo`, updatedDrinksInfoData, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;

    dispatch(updateDrinksInfoSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(updateDrinksInfoFailed(err.response.data));
    return err;
  }
};

export const deleteDrinksInfo = async (accessToken, dispatch, drinksInfoId, axiosJWT) => {
  dispatch(deleteDrinksInfoStart());
  try {
    const res = await axiosJWT.delete(`http://localhost:8000/manager/drinks/deleteDrinksInfo/${drinksInfoId}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(deleteDrinksInfoSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(deleteDrinksInfoFailed(err.response.data));
    return err;
  }
};

export const getDrinksPrice = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getDrinksPriceStart());
  try {
    const res = await axiosJWT.get('http://localhost:8000/manager/drinks/getDrinksPrice', {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getDrinksPriceSuccess(res.data));
  } catch (err) {
    dispatch(getDrinksPriceFailed());
  }
};
export const createDrinksPrice = async (accessToken, dispatch, drinksPriceData, axiosJWT) => {
  dispatch(createDrinksPriceStart());
  try {
    const res = await axiosJWT.post('http://localhost:8000/manager/drinks/createDrinksPrice', drinksPriceData, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(createDrinksPriceSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(createDrinksPriceFailed(err.response.data));
    return err;
  }
};

export const updateDrinksPrice = async (accessToken, dispatch, updatedDrinksPriceData, axiosJWT) => {
  dispatch(updateDrinksPriceStart());
  try {
    const res = await axiosJWT.post(`http://localhost:8000/manager/drinks/updateDrinksPrice`, updatedDrinksPriceData, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;

    dispatch(updateDrinksPriceSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(updateDrinksPriceFailed(err.response.data));
    return err;
  }
};

export const deleteDrinksPrice = async (accessToken, dispatch, drinksPriceId, axiosJWT) => {
  dispatch(deleteDrinksPriceStart());
  try {
    const res = await axiosJWT.delete(`http://localhost:8000/manager/drinks/deleteDrinksPrice/${drinksPriceId}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(deleteDrinksPriceSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(deleteDrinksPriceFailed(err.response.data));
    return err;
  }
};

export const getOrders = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getOrdersStart());
  try {
    const res = await axiosJWT.get('http://localhost:8000/manager/orders/getOrders', {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getOrdersSuccess(res.data));
  } catch (err) {
    dispatch(getOrdersFailed());
  }
};
export const createOrder = async (accessToken, dispatch, orderData, axiosJWT) => {
  dispatch(createOrdersStart());
  try {
    const res = await axiosJWT.post('http://localhost:8000/manager/orders/createOrders', orderData, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(createOrdersSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(createOrdersFailed(err.response.data));
    return err;
  }
};

export const updateOrders = async (accessToken, dispatch, updatedOrderData, axiosJWT) => {
  dispatch(updateOrdersStart());
  try {
    const res = await axiosJWT.post(`http://localhost:8000/manager/orders/updateOrders`, updatedOrderData, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;

    dispatch(updateOrdersSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(updateOrdersFailed(err.response.data));
    return err;
  }
};

export const deleteOrders = async (accessToken, dispatch, orderId, axiosJWT) => {
  dispatch(deleteOrdersStart());
  try {
    const res = await axiosJWT.delete(`http://localhost:8000/manager/orders/deleteOrders/${orderId}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(deleteOrdersSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(deleteOrdersFailed(err.response.data));
    return err;
  }
};

export const getOrdersDetail = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getOrdersDetailStart());
  try {
    const res = await axiosJWT.get('http://localhost:8000/manager/orders/getOrdersDetail', {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getOrdersDetailSuccess(res.data));
  } catch (err) {
    dispatch(getOrdersDetailFailed());
  }
};
export const createOrdersDetail = async (accessToken, dispatch, orderDetailData, axiosJWT) => {
  dispatch(createOrdersDetailStart());
  try {
    const res = await axiosJWT.post('http://localhost:8000/manager/orders/createOrdersDetail', orderDetailData, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(createOrdersDetailSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(createOrdersDetailFailed(err.response.data));
    return err;
  }
};

export const updateOrdersDetail = async (accessToken, dispatch, updatedOrderDetailData, axiosJWT) => {
  dispatch(updateOrdersDetailStart());
  try {
    const res = await axiosJWT.post(`http://localhost:8000/manager/orders/updateOrdersDetail`, updatedOrderDetailData, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;

    dispatch(updateOrdersDetailSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(updateOrdersDetailFailed(err.response.data));
    return err;
  }
};

export const deleteOrdersDetail = async (accessToken, dispatch, orderDetailId, axiosJWT) => {
  dispatch(deleteOrdersDetailStart());
  try {
    const res = await axiosJWT.delete(`http://localhost:8000/manager/orders/deleteOrdersDetail/${orderDetailId}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const statusCode = res.status;
    dispatch(deleteOrdersDetailSuccess(res.data));
    return statusCode;
  } catch (err) {
    dispatch(deleteOrdersDetailFailed(err.response.data));
    return err;
  }
};

export const logout = async (dispatch, navigate, id, accessToken, axiosJWT) => {
  dispatch(logoutStart());
  console.log();
  try {
    const res = await axiosJWT.post('http://localhost:8000/manager/auth/logout', id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logoutSuccess());
    dispatch(clearDrinksPayload());
    dispatch(clearAuthPayload());
    dispatch(clearOrdersPayload());
    dispatch(clearUsersPayload());
    navigate('/login');
  } catch (err) {
    dispatch(logoutFailed());
  }
};
