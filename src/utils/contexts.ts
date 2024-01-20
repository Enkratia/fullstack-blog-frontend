import { createContext } from "react";

type ResetContextType = React.Dispatch<React.SetStateAction<number>> | never;

export const ResetContext = createContext<ResetContextType>(undefined as never);
