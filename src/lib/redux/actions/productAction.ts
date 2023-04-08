import { createAction } from "@reduxjs/toolkit";

export const handleProductDetailRq = createAction<string>(
  "product/productDetailRq"
);
