import { HttpCallFacility } from "@hydra-cg/heracles.ts";
import { KeycloakInstance } from "keycloak-js";

const DEFAULT_CONFIG: RequestInit = {
  headers: {
    Accept: "application/ld+json",
  },
};

export const callFacility = (
  keycloak: KeycloakInstance
): HttpCallFacility => async (url) => {
  const config = { ...DEFAULT_CONFIG };
  if (keycloak.token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${keycloak.token}`,
    };
  }
  return keycloak
    .updateToken(30)
    .then(() => fetch(url, config))
    .catch(() => fetch(url, DEFAULT_CONFIG));
};
