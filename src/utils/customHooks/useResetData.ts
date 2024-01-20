import { useContext } from "react";

import { ResetContext } from "../contexts";

export const useResetData = () => {
  return useContext(ResetContext);
};
