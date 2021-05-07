import { NodeObject } from "jsonld";
import { KeycloakInstance } from "keycloak-js";
import { namespaces } from "namespaces";

export interface Collection<T extends Entity> extends Item {
  first: undefined | string;
  last: undefined | string;
  members: T[];
  next: undefined | string;
  previous: undefined | string;
  total: number;
}

export interface CollectionNav {
  first?: undefined | VoidFunction;
  previous?: undefined | VoidFunction;
  next?: undefined | VoidFunction;
  last?: undefined | VoidFunction;
  page?: undefined | number;
}

export interface CollectionQuery {
  limit?: number;
  offset?: number;
  page?: number;
  [key: string]: undefined | number | string;
}

export interface ContextState {
  apiUrl: string;
  initialized: boolean;
  keycloak: KeycloakInstance;
  searchTimeout: number;
}

export interface Entity {
  idLocal: string;
  labels: MultilangText[];
  types: string[];
}

export interface Event extends Item {
  sort: string;
  exact?: string;
  earliest?: string;
  latest?: string;
}

export interface EventsQuery extends CollectionQuery {
  text?: string;
  orderBy?: "id" | "label" | "date";
  participant?: string;
}

export interface FetchCollectionResult<T> extends FetchResult<T[]> {
  nav: CollectionNav;
  total: undefined | number;
}

export interface FetchResult<T> {
  initialized: boolean;
  loading: boolean;
  data: undefined | T;
}

export interface Item extends Entity {
  id: string;
}

export interface Links {
  [property: string]: string | string[];
}

export interface MultilangText {
  value: string;
  language?: string;
}

export interface NampiConfig {
  /** * The URL of the NAMPI API endpoint * */
  api: string;
  /** * The URL of the NAMPI Keycloak auth endpoint.  */
  auth?: string;
  /** * The name of the Keycloak client to use. If not present in combination with "realm", the login and logout auth functions will throw an error on use.  */
  client?: string;
  /** * The name of the Keycloak realm. If not present in combination with "client", the login and logout auth functions will throw an error on use.  */
  realm?: string;
  /** * The timeout in ms to bundle search box entries when live searching so the server doesn't get flooded. Defaults to 200ms */
  searchTimeout?: number;
  /** * Whether or not to to keep users logged in over browser restarts */
  sso?: boolean;
  /** * Enables the silent sso check. If enabled, the url to a site on the NAMPI app with special content needs to be provided.  * The content is described in the Keycloak documentation: https://github.com/keycloak/keycloak-documentation/blob/master/securing_apps/topics/oidc/javascript-adapter.adoc */
  silentSsoUri?: string;
}

export interface NormalizeResult extends Record<string, unknown> {
  id: string;
  idLocal: string;
  labels?: MultilangText[];
  types: string[];
}

export interface Normalized extends NormalizeResult {
  links: Links;
}

export interface Person extends Item {
  bornIn?: Event[];
  diesIn?: Event[];
}

export interface PersonQuery extends CollectionQuery {
  orderBy?: "id" | "label";
  text?: string;
  type?: string;
}

export interface UseAuth
  extends Pick<KeycloakInstance, "authenticated" | "login" | "logout"> {
  initialized: boolean;
}

export interface User extends Entity {
  email: string;
  familyName: undefined | string;
  givenName: undefined | string;
  username: string;
  idAuthor: undefined | string;
  idAuthorLocal: undefined | string;
  identifier: string;
}

export type Blanks = Record<string, string>;

export type Cache = Record<string, Normalized>;

export type FetchCollectionHook<T, Q> = (config: {
  paused?: boolean;
  query: Q;
}) => FetchCollectionResult<T>;

export type FetchHook<T> = (config: {
  idLocal: string;
  paused?: boolean;
}) => FetchResult<T>;

export type MaybeNodes = undefined | NodeObject[];

export type Namespaces = typeof namespaces;

export type Normalizer = (
  node: NodeObject,
  normalized: Normalized,
  cache: Cache,
  blanks: Blanks
) => void;

export type SortFunction<T> = (a: T, b: T) => -1 | 0 | 1;

export type Timeout = undefined | ReturnType<typeof setTimeout>;
