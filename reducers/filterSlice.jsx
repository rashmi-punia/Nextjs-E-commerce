import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  byStock: false,
  byFreeDelivery: false,
  byRating: 0,
  searchQuery: "",
  byDiscount: false,
  sort: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    SORT_BY_PRICE: (state, action) => {
      state.sort = action.payload;
    },
    filterByStock: (state) => {
      state.byStock = !state.byStock;
    },
    filterByDelivery: (state) => {
      state.byFreeDelivery = !state.byFreeDelivery;
    },
    filterByRating: (state, action) => {
      state.byRating = action.payload;
    },
    filterBySearch: (state, action) => {
      state.searchQuery = action.payload;
    },
    filterByDiscount: (state) => {
      state.byDiscount = !state.byDiscount;
    },
    clearFilters: (state) => {
      state.byStock = false;
      state.byFreeDelivery = false;
      state.byRating = 0;
      state.searchQuery = "";
      state.byDiscount = false;
    },
  },
});

export const {
  sortByPrice,
  filterByStock,
  filterByDelivery,
  filterByRating,
  filterBySearch,
  filterByDiscount,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
