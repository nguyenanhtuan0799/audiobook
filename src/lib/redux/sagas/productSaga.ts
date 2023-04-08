import { getProductDetailAPI, signInWithGoogle } from "lib/services/firebase";
import { call, put, takeLatest } from "redux-saga/effects";
import { handleProductDetailRq } from "../actions/productAction";
import { getProductDetail } from "../reducers/productSlice";

function* handleGetProductDetail(_action: any) {
  try {
    const res: Generator<any, void, any> = yield call(
      getProductDetailAPI,
      _action.payload
    );
    if (res) {
      console.log(res, "????resresres");
      yield put(getProductDetail(res));
    }
  } catch (err) {
    console.log(err);
  }
}

function* productSaga() {
  yield takeLatest(handleProductDetailRq.type, handleGetProductDetail);
}

export default productSaga;
