import { IHydraClient } from "@hydra-cg/heracles.ts";
import { namespaces } from "components/namespaces";
import { JSONPath } from "jsonpath-plus";
import { KeycloakInstance } from "keycloak-js";

export interface ContextState {
  apiUrl: string;
  hydra: IHydraClient;
  initialized: boolean;
  keycloak: KeycloakInstance;
  namespaces: Namespaces;
}

export interface Event extends Item {
  date: EventDate;
}

export interface EventDate {
  sort: Date;
  exact?: Date;
  earliest?: Date;
  latest?: Date;
}

export type FetchFunction<T> = (path: <P>(path: string) => P) => Promise<T>;

export interface FetchResult<T> {
  initialized: boolean;
  loading: boolean;
  data: undefined | T;
}

export interface Item {
  id: string;
  idLocal: string;
  labels: MultilangText[];
  types: string[];
}

export type JSONPathJson = Parameters<typeof JSONPath>[1];

export interface MultilangText {
  value: string;
  language?: string;
}

export type Namespaces = ReturnType<typeof namespaces>;

export interface NampiConfig {
  api: string;
  auth: string;
  client: string;
  realm: string;
}

export interface Person extends Item {
  bornIn?: Event[];
  diesIn?: Event[];
}

export interface Profile {
  email: string;
  familyName: undefined | string;
  givenName: undefined | string;
  idLocal: string;
  username: string;
  idAuthor: undefined | string;
  idAuthorLocal: undefined | string;
}

export interface UseAuth
  extends Pick<KeycloakInstance, "authenticated" | "login" | "logout"> {
  initialized: boolean;
}
