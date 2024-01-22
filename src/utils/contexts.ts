import { createContext } from "react";

type ReinitAppContextType = () => void | never;

export const ReinitAppContext = createContext<ReinitAppContextType>(undefined as never);
