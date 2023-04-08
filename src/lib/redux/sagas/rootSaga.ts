import { all } from "redux-saga/effects";
import productSaga from "lib/redux/sagas/productSaga";
import homeSaga from "./homeSaga";

export function* rootSaga() {
  yield all([productSaga(), homeSaga()]);
}
