import { UseAuth } from "../types";
import { useNampiContext } from "./useNampiContext";

export const useAuth = (): UseAuth => {
  const { initialized, authenticated, keycloak } = useNampiContext();
  return {
    initialized,
    authenticated,
    login:
      keycloak?.login ||
      (() => {
        throw new Error("No Keycloak realm and client provided.");
      }),
    logout:
      keycloak?.logout ||
      (() => {
        throw new Error("No Keycloak realm and client provided.");
      }),
  };
};
