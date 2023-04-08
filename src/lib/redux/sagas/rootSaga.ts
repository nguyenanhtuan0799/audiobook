import { all } from "redux-saga/effects";
import authSaga from "lib/redux/sagas/authSaga";
import homeSaga from "./homeSaga";
export function* rootSaga() {
  yield all([authSaga(), homeSaga()]);
}
