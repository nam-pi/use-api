import { UseAuth } from "types";
import { useNampiContext } from "./useNampiContext";

export const useAuth = (): UseAuth => {
  const { initialized, keycloak } = useNampiContext();
  const { authenticated, login, logout } = keycloak;
  return { initialized, authenticated, login, logout };
};
