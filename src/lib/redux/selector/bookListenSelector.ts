import { RootState } from "../store";

export const bookSelector = (state: RootState) =>
  state.bookListen.book || undefined;
export const seekSelector = (state: RootState) => state.bookListen.infoPause;
