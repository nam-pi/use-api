import { expand } from "jsonld";
import { namespaces } from "namespaces";
import { normalize } from "normalize";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Collection,
  CollectionNav,
  CollectionQuery,
  Entity,
  FetchCollectionResult,
  FetchResult,
  NormalizeResult,
  SortFunction,
  Timeout,
} from "types";
import { useNampiContext } from "./useNampiContext";

const DEFAULT_CONFIG: RequestInit = {
  headers: {
    Accept: "application/ld+json",
  },
};

interface State<T> {
  total?: undefined | number;
  data?: undefined | T | T[];
  nav?: undefined | CollectionNav;
}

function toUrlSearchParams(url: string): URLSearchParams;
function toUrlSearchParams<Query extends CollectionQuery>(
  query: Query
): URLSearchParams;
function toUrlSearchParams<Query extends CollectionQuery>(
  urlOrQuery: string | Query
) {
  if (typeof urlOrQuery === "string") {
    const parser = document.createElement("a");
    parser.href = urlOrQuery;
    return new URLSearchParams(parser.search);
  } else {
    const searchParams = new URLSearchParams();
    const query = urlOrQuery;
    const keys = Object.keys(query);
    for (let i = 0, length = keys.length; i < length; i++) {
      const key = keys[i];
      const value = query[key];
      if (value) {
        searchParams.append(key, String(value));
      }
    }
    return searchParams;
  }
}

export function useFetch<T extends Entity>(
  baseUrl: string,
  paused?: boolean
): FetchResult<T>;
export function useFetch<T extends Entity, Query extends CollectionQuery>(
  baseUrl: string,
  query: Query,
  sorter?: SortFunction<T>,
  paused?: boolean
): FetchCollectionResult<T>;
export function useFetch<T extends Entity, Query extends CollectionQuery>(
  baseUrl: string,
  query?: Query,
  sorter?: SortFunction<T>,
  paused = false
) {
  const dirty = useRef<boolean>(false);
  const inputTimeout = useRef<Timeout>();
  const oldQuery = useRef<string>("");
  const {
    initialized,
    keycloak,
    propertyMap,
    searchTimeout,
  } = useNampiContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<State<T>>({});
  const [searchParams, setSearchParams] = useState<undefined | URLSearchParams>(
    () => (query ? toUrlSearchParams(query) : undefined)
  );

  const mergeSearchParams = useCallback((url: string) => {
    dirty.current = true;
    setSearchParams((oldState) => {
      const newState = new URLSearchParams();
      const fromUrl = toUrlSearchParams(url).entries();
      let result = fromUrl.next();
      if (result.done) {
        return oldState;
      }
      if (oldState) {
        oldState.forEach((value, name) => newState.append(name, value));
      }
      while (!result.done) {
        newState.set(...result.value);
        result = fromUrl.next();
      }
      return newState;
    });
  }, []);

  const mapResult = useCallback(
    (result: undefined | NormalizeResult) => {
      if (result?.types.includes(namespaces.hydra.Collection.iri)) {
        // Map collection data
        const {
          members,
          first,
          last,
          id,
          next,
          page,
          previous,
          total,
        } = (result as unknown) as Collection<T>;
        return {
          data: sorter && total > 0 ? members.sort(sorter) : members,
          nav: {
            first:
              first && id !== first
                ? () => mergeSearchParams(first)
                : undefined,
            previous: previous ? () => mergeSearchParams(previous) : undefined,
            next: next ? () => mergeSearchParams(next) : undefined,
            last:
              last && id !== last ? () => mergeSearchParams(last) : undefined,
          },
          page,
          total,
        } as FetchCollectionResult<T>;
      } else {
        // Map single class data
        return {
          data: (result as unknown) as T,
        } as Partial<FetchResult<T>>;
      }
    },
    [mergeSearchParams, sorter]
  );

  const doFetch = useCallback(
    async (url: string) => {
      const config: RequestInit = { ...DEFAULT_CONFIG };
      if (keycloak.token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${keycloak.token}`,
        };
      }
      const fullUrl =
        url + (searchParams ? "?" + searchParams?.toString() : "");
      keycloak
        .updateToken(30)
        .then(() => fetch(fullUrl, config))
        .catch(() => fetch(fullUrl, DEFAULT_CONFIG))
        .then((response) => response.json())
        .then(expand)
        .then((json) => normalize(json, propertyMap))
        .then(mapResult)
        .then(setState)
        .catch((e) => {
          if (e.message === "Remote server responded with a status of 401") {
            console.info("User not logged in");
          } else {
            console.warn(e);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [keycloak, mapResult, propertyMap, searchParams]
  );

  // Update the search params state when receiving new search params after a timeout
  useEffect(() => {
    if (!initialized || paused) {
      return;
    }
    if (inputTimeout.current) {
      clearTimeout(inputTimeout.current);
    }
    inputTimeout.current = setTimeout(() => {
      const nextQuery = JSON.stringify(query);
      if (query && oldQuery.current !== nextQuery) {
        dirty.current = true;
        oldQuery.current = nextQuery;
        setSearchParams(toUrlSearchParams(query));
      }
    }, searchTimeout);
  }, [initialized, paused, query, searchTimeout]);

  // Fetch result for non-query uses
  useEffect(() => {
    if (initialized && !query && !paused) {
      doFetch(baseUrl);
    }
  }, [baseUrl, doFetch, initialized, paused, query]);

  // Fetch a new state when dirty
  useEffect(() => {
    if (initialized && dirty.current && !paused) {
      dirty.current = false;
      doFetch(baseUrl);
    }
  }, [baseUrl, doFetch, initialized, paused]);

  return {
    initialized,
    loading,
    ...state,
  };
}
