import { signInWithGoogle } from "lib/services/firebase";
import { call, put, takeLatest } from "redux-saga/effects";

function* handleSignInGoogle(_action: any) {
  try {
    const res: Generator<any, void, any> = yield call(signInWithGoogle);
    if (res) {
    }
  } catch (err) {
    console.log(err);
  }
}

function* authSaga() {
  // yield takeLatest(handleLogoutAuthRq.type, handleLogoutGoogle);
}

export default authSaga;
