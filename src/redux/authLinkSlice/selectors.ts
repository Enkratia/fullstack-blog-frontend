import { RootState } from "../store";

export const selectAuthLink = (state: RootState) => state.authLink.authLink;
