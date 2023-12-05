import { createSlice } from '@reduxjs/toolkit';

const drinksSlice = createSlice({
  name: 'drinks',
  initialState: {
    categories: {
      allCategories: null,
      isFetching: false,
      error: false,
      msg: '',
    },

    drinksinfo: {
      allDrinksInfo: null,
      isFetching: false,
      error: false,
      msg: '',
    },

    drinksprice: {
      allDrinksPrice: null,
      isFetching: false,
      error: false,
      msg: '',
    },
  },
  reducers: {
    getCategoriesStart: (state) => {
      state.categories.isFetching = true;
    },
    getCategoriesSuccess: (state, action) => {
      state.categories.isFetching = false;
      state.categories.allCategories = action.payload;
      state.categories.error = false;
    },
    getCategoriesFailed: (state) => {
      state.categories.isFetching = false;
      state.categories.error = true;
    },

    createCategoriesStart: (state) => {
      state.categories.isFetching = true;
      state.categories.error = false;
    },
    createCategoriesSuccess: (state, action) => {
      state.categories.isFetching = false;
      state.categories.msg = action.payload;
      state.categories.error = false;
    },

    createCategoriesFailed: (state) => {
      state.categories.isFetching = false;
      state.categories.error = true;
    },
    updateCategoriesStart: (state) => {
      state.categories.isFetching = true;
      state.categories.error = false;
    },
    updateCategoriesSuccess: (state, action) => {
      state.categories.isFetching = false;
      state.categories.msg = action.payload;
      state.categories.error = false;
    },
    updateCategoriesFailed: (state) => {
      state.categories.isFetching = false;
      state.categories.error = true;
    },
    deleteCategoriesStart: (state) => {
      state.categories.isFetching = true;
      state.categories.error = false;
    },
    deleteCategoriesSuccess: (state, action) => {
      state.categories.isFetching = false;
      state.categories.msg = action.payload;
      state.categories.error = false;
    },
    deleteCategoriesFailed: (state) => {
      state.categories.isFetching = false;
      state.categories.error = true;
    },
    createDrinksInfoStart: (state) => {
      state.drinksinfo.isFetching = true;
      state.drinksinfo.error = false;
    },
    createDrinksInfoSuccess: (state, action) => {
      state.drinksinfo.isFetching = false;
      state.drinksinfo.msg = action.payload;
      state.drinksinfo.error = false;
    },
    createDrinksInfoFailed: (state) => {
      state.drinksinfo.isFetching = false;
      state.drinksinfo.error = true;
    },
    updateDrinksInfoStart: (state) => {
      state.drinksinfo.isFetching = true;
      state.drinksinfo.error = false;
    },
    updateDrinksInfoSuccess: (state, action) => {
      state.drinksinfo.isFetching = false;
      state.drinksinfo.msg = action.payload;
      state.drinksinfo.error = false;
    },
    updateDrinksInfoFailed: (state) => {
      state.drinksinfo.isFetching = false;
      state.drinksinfo.error = true;
    },
    deleteDrinksInfoStart: (state) => {
      state.drinksinfo.isFetching = true;
      state.drinksinfo.error = false;
    },
    deleteDrinksInfoSuccess: (state, action) => {
      state.drinksinfo.isFetching = false;
      state.drinksinfo.msg = action.payload;
      state.drinksinfo.error = false;
    },
    deleteDrinksInfoFailed: (state) => {
      state.drinksinfo.isFetching = false;
      state.drinksinfo.error = true;
    },
    createDrinksPriceStart: (state) => {
      state.drinksprice.isFetching = true;
      state.drinksprice.error = false;
    },
    createDrinksPriceSuccess: (state, action) => {
      state.drinksprice.isFetching = false;
      state.drinksprice.msg = action.payload;
      state.drinksprice.error = false;
    },
    createDrinksPriceFailed: (state) => {
      state.drinksprice.isFetching = false;
      state.drinksprice.error = true;
    },
    updateDrinksPriceStart: (state) => {
      state.drinksprice.isFetching = true;
      state.drinksprice.error = false;
    },
    updateDrinksPriceSuccess: (state, action) => {
      state.drinksprice.isFetching = false;
      state.drinksprice.msg = action.payload;
      state.drinksprice.error = false;
    },
    updateDrinksPriceFailed: (state) => {
      state.drinksprice.isFetching = false;
      state.drinksprice.error = true;
    },
    deleteDrinksPriceStart: (state) => {
      state.drinksprice.isFetching = true;
      state.drinksprice.error = false;
    },
    deleteDrinksPriceSuccess: (state, action) => {
      state.drinksprice.isFetching = false;
      state.drinksprice.msg = action.payload;
      state.drinksprice.error = false;
    },
    deleteDrinksPriceFailed: (state) => {
      state.drinksprice.isFetching = false;
      state.drinksprice.error = true;
    },

    getDrinksInfoStart: (state) => {
      state.drinksinfo.isFetching = true;
    },
    getDrinksInfoSuccess: (state, action) => {
      state.drinksinfo.isFetching = false;
      state.drinksinfo.allDrinksInfo = action.payload;
      state.drinksinfo.error = false;
    },
    getDrinksInfoFailed: (state) => {
      state.drinksinfo.isFetching = false;
      state.drinksinfo.error = true;
    },

    getDrinksPriceStart: (state) => {
      state.drinksprice.isFetching = true;
    },
    getDrinksPriceSuccess: (state, action) => {
      state.drinksprice.isFetching = false;
      state.drinksprice.allDrinksPrice = action.payload;
      state.drinksprice.error = false;
    },
    getDrinksPriceFailed: (state) => {
      state.drinksprice.isFetching = false;
      state.drinksprice.error = true;
    },
    clearDrinksPayload: (state) => {
      state.categories.allCategories = null;
      state.drinksinfo.allDrinksInfo = null;
      state.drinksprice.allDrinksPrice = null;
    },
  },
});
export const {
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
} = drinksSlice.actions;
export default drinksSlice.reducer;
