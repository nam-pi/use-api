import { useNampiContext } from "context";
import { UseAuth } from "types";

export const useAuth = (): UseAuth => {
  const { initialized, keycloak } = useNampiContext();
  const { authenticated, login, logout } = keycloak;
  return { initialized, authenticated, login, logout };
};
