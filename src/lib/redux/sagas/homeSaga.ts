import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { getCategoriesRq, getProductsRq } from "../actions/homeAction";
import {
  getCategoriesAPI,
  getProductsAPI,
  getProductsByCatAPI,
} from "lib/services/firebase";
import { getListCategoryOk, getListProductOk } from "../reducers/homeSlice";

function* getListCategory(_action: any) {
  try {
    const res: Generator<
      // step types
      any,
      // return type
      void,
      // intermediate argument
      any
    > = yield call(getCategoriesAPI);
    if (res) {
      yield put(getListCategoryOk(res));
    }
  } catch (err) {
    console.log(err);
  }
}

function* getListProductSaga(_action: any) {
  try {
    const res: Generator<any, void, any> = yield call(
      getProductsByCatAPI,
      _action.payload?.id
    );
    console.log(res, "???0", _action.payload?.id);

    if (res) {
      yield put(getListProductOk(res));
    }
  } catch (err) {
    console.log(err);
  }
}

function* homeSaga() {
  yield takeLatest(getProductsRq.type, getListProductSaga);
  yield takeLatest(getCategoriesRq.type, getListCategory);
}

export default homeSaga;
