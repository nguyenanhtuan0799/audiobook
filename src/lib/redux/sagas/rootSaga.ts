import { all } from "redux-saga/effects";
import authSaga from "lib/redux/sagas/authSaga";

export function* rootSaga() {
  yield all([authSaga()]);
}
