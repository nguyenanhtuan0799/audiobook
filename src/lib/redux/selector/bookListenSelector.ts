import { RootState } from "../store";

export const bookSelector = (state: RootState) =>
  state.bookListen.book || undefined;
