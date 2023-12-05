import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: {
      allOrders: null,
      isFetching: false,
      error: false,
      msg: '',
    },
    ordersdetail: {
      allOrdersDetail: null,
      isFetching: false,
      error: false,
      msg: '',
    },
  },
  reducers: {
    getOrdersStart: (state) => {
      state.orders.isFetching = true;
      state.orders.error = false;
    },
    getOrdersSuccess: (state, action) => {
      state.orders.isFetching = false;
      state.orders.allOrders = action.payload;
      state.orders.error = false;
    },
    getOrdersFailed: (state) => {
      state.orders.isFetching = false;
      state.orders.error = true;
    },

    getOrdersDetailStart: (state) => {
      state.ordersdetail.isFetching = true;
      state.ordersdetail.error = false;
    },
    getOrdersDetailSuccess: (state, action) => {
      state.ordersdetail.isFetching = false;
      state.ordersdetail.allOrdersDetail = action.payload;
      state.ordersdetail.error = false;
    },
    getOrdersDetailFailed: (state) => {
      state.ordersdetail.isFetching = false;
      state.ordersdetail.error = true;
    },

    createOrdersStart: (state) => {
      state.orders.isFetching = true;
      state.orders.error = false;
    },
    createOrdersSuccess: (state, action) => {
      state.orders.isFetching = false;
      state.orders.msg = action.payload;
      state.orders.error = false;
    },
    createOrdersFailed: (state) => {
      state.orders.isFetching = false;
      state.orders.error = true;
    },

    updateOrdersStart: (state) => {
      state.orders.isFetching = true;
      state.orders.error = false;
    },
    updateOrdersSuccess: (state, action) => {
      state.orders.isFetching = false;
      state.orders.msg = action.payload;
      state.orders.error = false;
    },
    updateOrdersFailed: (state) => {
      state.orders.isFetching = false;
      state.orders.error = true;
    },

    deleteOrdersStart: (state) => {
      state.orders.isFetching = true;
      state.orders.error = false;
    },
    deleteOrdersSuccess: (state, action) => {
      state.orders.isFetching = false;
      state.orders.msg = action.payload;
      state.orders.error = false;
    },
    deleteOrdersFailed: (state) => {
      state.orders.isFetching = false;
      state.orders.error = true;
    },

    createOrdersDetailStart: (state) => {
      state.ordersdetail.isFetching = true;
      state.ordersdetail.error = false;
    },
    createOrdersDetailSuccess: (state, action) => {
      state.ordersdetail.isFetching = false;
      state.ordersdetail.msg = action.payload;
      state.ordersdetail.error = false;
    },
    createOrdersDetailFailed: (state) => {
      state.ordersdetail.isFetching = false;
      state.ordersdetail.error = true;
    },

    updateOrdersDetailStart: (state) => {
      state.ordersdetail.isFetching = true;
      state.ordersdetail.error = false;
    },
    updateOrdersDetailSuccess: (state, action) => {
      state.ordersdetail.isFetching = false;
      state.ordersdetail.msg = action.payload;
      state.ordersdetail.error = false;
    },
    updateOrdersDetailFailed: (state) => {
      state.ordersdetail.isFetching = false;
      state.ordersdetail.error = true;
    },

    deleteOrdersDetailStart: (state) => {
      state.ordersdetail.isFetching = true;
      state.ordersdetail.error = false;
    },
    deleteOrdersDetailSuccess: (state, action) => {
      state.ordersdetail.isFetching = false;
      state.ordersdetail.msg = action.payload;
      state.ordersdetail.error = false;
    },
    deleteOrdersDetailFailed: (state) => {
      state.ordersdetail.isFetching = false;
      state.ordersdetail.error = true;
    },

    clearOrdersPayload: (state) => {
      state.orders.allOrders = null;
      state.ordersdetail.allOrdersDetail = null;
    },
  },
});

// Export các actions
export const {
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
} = ordersSlice.actions;

export default ordersSlice.reducer;
