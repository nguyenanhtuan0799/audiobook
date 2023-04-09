import { combineReducers } from "@reduxjs/toolkit";
import home from "./homeSlice";
import product from "lib/redux/reducers/productSlice";

export default combineReducers({ product, home });
