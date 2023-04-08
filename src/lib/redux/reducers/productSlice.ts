import { createSlice } from "@reduxjs/toolkit";
import { User } from "lib/types/type";

interface ProductSlice {
  detail: any | undefined;
}

const initialState: ProductSlice = {
  detail: undefined,
};

export const ProductSlice = createSlice({
  name: "product",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getProductDetail: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const { getProductDetail } = ProductSlice.actions;
export default ProductSlice.reducer;
