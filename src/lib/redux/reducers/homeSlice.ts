import { createSlice } from "@reduxjs/toolkit";

interface HomeSlice {
  listProduct: any[];
  listCategory: any[];
}

const initialState: HomeSlice = {
  listProduct: [],
  listCategory: [],
};

export const homeSlice = createSlice({
  name: "home",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getListProductOk: (state, action) => {
      state.listProduct = action.payload;
    },
    getListCategoryOk: (state, action) => {
      state.listCategory = action.payload;
    },
  },
});

export const { getListProductOk, getListCategoryOk } = homeSlice.actions;
export default homeSlice.reducer;
