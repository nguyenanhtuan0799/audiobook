import { createSlice } from "@reduxjs/toolkit";

interface HomeSlice {
  listProduct: any[];
}

const initialState: HomeSlice = {
  listProduct: [],
};

export const homeSlice = createSlice({
  name: "home",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getListProductOk: (state, action) => {
      state.listProduct = action.payload;
    },
  },
});

export const { getListProductOk } = homeSlice.actions;
export default homeSlice.reducer;
