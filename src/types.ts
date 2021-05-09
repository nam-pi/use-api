import { NodeObject } from "jsonld";
import { KeycloakInstance } from "keycloak-js";
import { namespaces } from "namespaces";

/** An aspect */
export interface Aspect extends Item {
  /** The text content of the aspect */
  text?: MultilangText;
  /** Items, possibly in other databases, that are the same as this aspect. */
  sameAs?: string[];
}

/** An entity collection */
export interface Collection<T extends Entity> extends Item {
  /** The url to the first page of partial collection results */
  first: undefined | string;
  /** The url to the last page of partial collection results */
  last: undefined | string;
  /** The returned collection members */
  members: T[];
  /** The url to the next page of partial collection results */
  next: undefined | string;
  /** The url to the previous page of partial collection results */
  previous: undefined | string;
  /** The total number of results */
  total: number;
}

/** A set of functions to navigate to different parts of the collection */
export interface CollectionNav {
  /** Navigate to the first page in the collection */
  first?: undefined | VoidFunction;
  /** Navigate to the previous page in the collection */
  previous?: undefined | VoidFunction;
  /** Navigate to the next page in the collection */
  next?: undefined | VoidFunction;
  /** Navigate to the last page in the collection */
  last?: undefined | VoidFunction;
}

/** Query parameters to fetch a partial collection */
export interface CollectionQuery extends Record<string, unknown> {
  /** Limits the number of returned results to the given number */
  limit?: number;
  /** Starts to return results from the given offset */
  offset?: number;
  /** Returns the given page of results */
  page?: number;
}

/** The internal state of the use-NAMPI context */
export interface ContextState {
  apiUrl: string;
  initialized: boolean;
  keycloak: KeycloakInstance;
  searchTimeout: number;
}

/** A data entity */
export interface Entity {
  /** The local part of the id. Example: "12345" of "http://example.com/data/12345" */
  idLocal: string;
  /** The labels of the entity */
  labels: MultilangText[];
  /** The RDF type iris */
  types: string[];
}

/** An event */
export interface Event extends Item {
  /** The sorting date for the event, to be used when sorting the event as part of a list */
  sort?: string;
  /** The exact date the event happened */
  exact?: string;
  /** The earliest possible date an event could have happened */
  earliest?: string;
  /** The latest possible date an event could have happened */
  latest?: string;
  /** All participants of the event */
  participants: Person[];
  /** All aspects of the event */
  aspects: Aspect[];
}

/** Query parameters to fetch a partial events collection */
export interface EventsQuery extends CollectionQuery {
  /** Filter by aspect used in the event. Can be the iri of any aspect individual */
  aspect?: string;
  /** Filter by the type of aspect used in the event. Can be any subclass of *https://purl.org/nampi/owl/core#aspect* that is part of the connected ontologies */
  aspectType?: string;
  /** Filter by the type of aspect use. Can be any subclass of *https://purl.org/nampi/owl/core#uses_aspect* that is part of the connected ontologies */
  aspectUseType?: string;
  /** Filter events by end date. All events that have dates (exact, earliest, latest, sort), *at* or *before* this date will be included */
  endDate?: Date;
  /** What to order the events by */
  orderBy?: "id" | "label" | "date";
  /** Filter by event participant. Can be the iri of any agent individual */
  participant?: string;
  /** Filter by type of participant. Can by the iri of any subclass of *https://purl.org/nampi/owl/core#agent* that is part of the connected ontologies */
  participantType?: string;
  /** Filter by participation type. Can by any subclass of *https://purl.org/nampi/owl/core#has_participant* that is part of the connected ontologies */
  participationType?: string;
  /** Filter by event place. Can be the iri of any place individual */
  place?: string;
  /** Filter events by start date. All events that have dates (exact, earliest, latest, sort), *at* or *after* this date will be included */
  startDate?: Date;
  /** Filter by text content. Can by any text or regular expression */
  text?: string;
}

/** The result of an Entity collection fetch query */
export interface FetchCollectionResult<T> extends FetchResult<T[]> {
  /** Navigation to different parts of the collection */
  nav: CollectionNav;
  /** The current page of the collection */
  page: undefined | number;
  /** The total number of results (members) of the collection */
  total: undefined | number;
}

/** The result of a single item fetch query */
export interface FetchResult<T> {
  /** Whether or not the API connection is already initialized */
  initialized: boolean;
  /** Whether or not the result is currently being fetched */
  loading: boolean;
  /** The resulting data */
  data: undefined | T;
}

/** An item */
export interface Item extends Entity {
  /** The id (iri) */
  id: string;
}

/** A set of links in the normalized query cache */
export interface Links {
  [property: string]: string | string[];
}

/** A text with the possibility to have a language specified.  */
export interface MultilangText {
  value: string;
  language?: string;
}

/** The NAMPI Provider configuration */
export interface ProviderConfig {
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

/** A person */
export interface Person extends Item {
  bornIn?: Event[];
  diesIn?: Event[];
  sameAs?: string[];
}

/** Query parameters to fetch a partial persons collection */
export interface PersonQuery extends CollectionQuery {
  /** What to order the persons by */
  orderBy?: "id" | "label";
  /** Filter by text content. Can by any text or regular expression */
  text?: string;
  /** Filter by person type. Can be any subtype of *https://purl.org/nampi/owl/core#person* that is part of the connected ontologies */
  type?: string;
}

export interface UseAuth
  extends Pick<KeycloakInstance, "authenticated" | "login" | "logout"> {
  /** Whether or not the authentication connection is initialized */
  initialized: boolean;
}

/** A user */
export interface User extends Entity {
  /** The email */
  email: string;
  /** The family name */
  familyName: undefined | string;
  /** The given name */
  givenName: undefined | string;
  /** The NAMPI username */
  username: string;
  /** The id of an connected author entity*/
  idAuthor?: undefined | string;
  /** The localized part of the author id */
  idAuthorLocal?: undefined | string;
  /** The user identifier */
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

/** A function to sort a partial collection fetch result */
export type SortFunction<T> = (a: T, b: T) => -1 | 0 | 1;

export type Timeout = undefined | ReturnType<typeof setTimeout>;
