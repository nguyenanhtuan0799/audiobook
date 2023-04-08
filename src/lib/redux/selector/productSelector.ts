import { RootState } from "lib/redux/store";

export const productDetailSelector = (state: RootState) => state.product.detail;
