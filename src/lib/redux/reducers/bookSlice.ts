import { createSlice } from "@reduxjs/toolkit";

interface BookSlice {
  book: any;
}

const initialState: BookSlice = {
  book: undefined,
};

export const BookSlice = createSlice({
  name: "bookListen",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveBookListen: (state, action) => {
      state.book = action.payload;
    },
  },
});

export const { saveBookListen } = BookSlice.actions;
export default BookSlice.reducer;
