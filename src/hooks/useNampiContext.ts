import { NampiContext } from "components/NampiContext";
import { useContext } from "react";
import { ContextState } from "types/types";

export const useNampiContext = (): ContextState => useContext(NampiContext);
