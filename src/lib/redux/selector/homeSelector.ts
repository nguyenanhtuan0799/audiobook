import { RootState } from "lib/redux/store";

export const listProductSelector = (state: RootState) => state.home.listProduct;
