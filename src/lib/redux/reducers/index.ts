import { combineReducers } from "@reduxjs/toolkit";
import home from "./homeSlice";
import product from "lib/redux/reducers/productSlice";
import bookListen from "lib/redux/reducers/bookSlice";

export default combineReducers({ product, home, bookListen });
