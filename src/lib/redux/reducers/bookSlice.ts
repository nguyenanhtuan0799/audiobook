import { createSlice } from "@reduxjs/toolkit";

interface BookSlice {
  book: any;
  infoPause: any | undefined;
}

const initialState: BookSlice = {
  book: undefined,
  infoPause: undefined,
};

export const BookSlice = createSlice({
  name: "bookListen",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveBookListen: (state, action) => {
      state.book = action.payload;
    },
    saveSeekListen: (state, action) => {
      state.infoPause = action.payload;
    },
  },
});

export const { saveBookListen, saveSeekListen } = BookSlice.actions;
export default BookSlice.reducer;
