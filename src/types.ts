import { IHydraClient } from "@hydra-cg/heracles.ts";
import { JSONPath } from "jsonpath-plus";
import { KeycloakInstance } from "keycloak-js";
import { namespaces } from "namespaces";

export interface CollectionNav {
  first?: undefined | (() => Promise<void>);
  previous?: undefined | (() => Promise<void>);
  next?: undefined | (() => Promise<void>);
  last?: undefined | (() => Promise<void>);
  page?: undefined | number;
}

export interface CollectionMeta {
  first: undefined | string;
  last: undefined | string;
  members: undefined | Record<string, unknown>[];
  next: undefined | string;
  previous: undefined | string;
  total: undefined | number;
  viewIri: string;
}

export interface ContextState {
  apiUrl: string;
  hydra: IHydraClient;
  initialized: boolean;
  keycloak: KeycloakInstance;
  searchTimeout: number;
}

export interface EventQuery {
  text?: string;
  orderBy?: "id" | "label" | "date";
  participant?: string;
}

export interface Entity {
  idLocal?: string;
  labels: MultilangText[];
  types: string[];
}

export type SortFunction<T> = (a: T, b: T) => -1 | 0 | 1;

export interface Event extends Item {
  date: EventDate;
}

export interface EventDate {
  sort: Date;
  exact?: Date;
  earliest?: Date;
  latest?: Date;
}

export type FetchFunction<T> = (json: JSONPathJson) => Promise<T>;

export interface FetchResult<T> {
  initialized: boolean;
  loading: boolean;
  data: undefined | T;
}

export interface FetchCollectionResult<T> extends FetchResult<T[]> {
  nav: CollectionNav;
  total: undefined | number;
}

export type FetchMapper<T> = (json: JSONPathJson) => T;

export interface Item extends Entity {
  id: string;
}

export type JSONPathJson = Parameters<typeof JSONPath>[1];

export interface MultilangText {
  value: string;
  language?: string;
}

export type Namespaces = typeof namespaces;

export interface NampiConfig {
  /**
   * The URL of the NAMPI API endpoint
   * */
  api: string;
  /**
   * The URL of the NAMPI Keycloak auth endpoint
   */
  auth: string;
  /**
   * The name of the Keycloak client to use
   */
  client: string;
  /**
   * The name of the Keycloak realm
   */
  realm: string;
  /**
   * The timeout in ms to bundle search box entries when live searching so the server doesn't get flooded. Defaults to 200ms
   */
  searchTimeout?: number;
  /**
   * Whether or not to to keep users logged in over browser restarts
   */
  sso?: boolean;
  /**
   * Enables the silent sso check. If enabled, the url to a site on the NAMPI app with special content needs to be provided.
   * The content is described in the Keycloak documentation: https://github.com/keycloak/keycloak-documentation/blob/master/securing_apps/topics/oidc/javascript-adapter.adoc
   */
  silentSsoUri?: string;
}

export interface Person extends Item {
  bornIn?: Event[];
  diesIn?: Event[];
}

export interface PersonQuery {
  text?: string;
  orderBy?: "id" | "label";
}

export type QueryParams = { [key: string]: unknown };

export type Timeout = undefined | ReturnType<typeof setTimeout>;

export interface User extends Entity {
  email: string;
  familyName: undefined | string;
  givenName: undefined | string;
  username: string;
  idAuthor: undefined | string;
  idAuthorLocal: undefined | string;
}

export interface UseAuth
  extends Pick<KeycloakInstance, "authenticated" | "login" | "logout"> {
  initialized: boolean;
}
