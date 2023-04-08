import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { getProductsRq } from "../actions/homeAction";
import { getCategoriesAPI, getProductsAPI } from "lib/services/firebase";
import { getListProductOk } from "../reducers/homeSlice";

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
    // yield put(getListCategoryOk(res));
  } catch (err) {
    console.log(err);
  }
}

function* getListProductSaga(_action: any) {
  try {
    const res: Generator<any, void, any> = yield call(getProductsAPI);
    if (res) {
      yield put(getListProductOk(res));
    }
  } catch (err) {
    console.log(err);
  }
}

function* homeSaga() {
  yield takeLatest(getProductsRq.type, getListProductSaga);
}

export default homeSaga;
