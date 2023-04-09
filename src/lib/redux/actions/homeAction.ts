import { createAction } from "@reduxjs/toolkit";

export const getProductsRq = createAction<any>("home/getProductsRq");
export const getCategoriesRq = createAction<undefined>("home/getCategoriesRq");
