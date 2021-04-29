import { IHydraClient } from "@hydra-cg/heracles.ts";
import { KeycloakInstance } from "keycloak-js";

export interface UseAuth
  extends Pick<KeycloakInstance, "authenticated" | "login" | "logout"> {
  initialized: boolean;
}

export interface Config {
  api: string;
  auth: string;
  client: string;
  realm: string;
}

export interface ContextState {
  hydra: IHydraClient;
  initialized: boolean;
  keycloak: KeycloakInstance;
}
