import { all } from "redux-saga/effects";
import productSaga from "lib/redux/sagas/productSaga";

export function* rootSaga() {
  yield all([productSaga()]);
}
