import { RootState } from "../store";

export const selectMenuBtn = (state: RootState) => state.auth.token;
