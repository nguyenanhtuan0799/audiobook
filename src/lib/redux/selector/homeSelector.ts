import { RootState } from "lib/redux/store";

export const listProductSelector = (state: RootState) =>
  state.home.listProduct || [];
export const listCategorySelector = (state: RootState) => {
  const listCate = state.home.listCategory || [];
  return [{ id: "tat-ca", name: "Tất cả", slug: "tat-ca" }, ...listCate];
};
