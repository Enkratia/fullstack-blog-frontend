import { createContext } from "react";

type ResetContextType = () => void | never;

export const ResetContext = createContext<ResetContextType>(undefined as never);
