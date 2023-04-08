import { createSlice } from "@reduxjs/toolkit";
import { User } from "lib/types/type";

interface AuthSlice {
  user: User | undefined;
}

const initialState: AuthSlice = {
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logoutAuth: (state, action) => {
      return initialState;
    },
  },
});

export const { logoutAuth } = authSlice.actions;
export default authSlice.reducer;
