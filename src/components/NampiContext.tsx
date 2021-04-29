import { createContext } from "react";
import { ContextState } from "types";

export const NampiContext = createContext<ContextState>({
  initialized: false,
} as ContextState);
