import { expand } from "jsonld";
import { collectionMeta } from "mappers/collectionMeta";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CollectionNav,
  CollectionQuery,
  Entity,
  FetchCollectionResult,
  FetchMapper,
  FetchResult,
  JSONPathJson,
  SortFunction,
  Timeout,
} from "types";
import { useNampiContext } from "./useNampiContext";

const LIMIT_REGEX = /(?:limit=(?<limit>\d*))/;
const OFFSET_REGEX = /(?:offset=(?<offset>\d*))/;

const getPage = (url: string) => {
  const limit = Number(url.match(LIMIT_REGEX)?.groups?.limit || 1);
  const offset = Number(url.match(OFFSET_REGEX)?.groups?.offset || 0);
  return Math.floor(offset / limit + 1);
};

const REPLACE_REGEX = /@(id|type|language|value)/g;

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
  mapper: FetchMapper<T>,
  paused?: boolean
): FetchResult<T>;
export function useFetch<T extends Entity, Query extends CollectionQuery>(
  baseUrl: string,
  mapper: FetchMapper<T>,
  query: Query,
  sorter?: SortFunction<T>,
  paused?: boolean
): FetchCollectionResult<T>;
export function useFetch<T extends Entity, Query extends CollectionQuery>(
  baseUrl: string,
  mapper: FetchMapper<T>,
  query?: Query,
  sorter?: SortFunction<T>,
  paused = false
) {
  const dirty = useRef<boolean>(false);
  const inputTimeout = useRef<Timeout>();
  const oldQuery = useRef<string>("");
  const { initialized, keycloak, searchTimeout } = useNampiContext();
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
        .then((expanded) =>
          JSON.parse(JSON.stringify(expanded).replace(REPLACE_REGEX, "$1"))
        )
        .then<State<T>>((json: JSONPathJson) => {
          if (searchParams) {
            const {
              first,
              last,
              members,
              next,
              previous,
              total,
              viewIri,
            } = collectionMeta(json);
            const result = (members || []).map(mapper);
            return {
              data: sorter ? result.sort(sorter) : result,
              nav: {
                first:
                  first && viewIri !== first
                    ? () => mergeSearchParams(first)
                    : undefined,
                previous: previous
                  ? () => mergeSearchParams(previous)
                  : undefined,
                next: next ? () => mergeSearchParams(next) : undefined,
                last:
                  last && viewIri !== last
                    ? () => mergeSearchParams(last)
                    : undefined,
                page: getPage(viewIri),
              },
              total,
            };
          } else {
            return { data: mapper((json as JSONPathJson[])[0]) };
          }
        })
        .then(setState)
        .catch((e) => {
          if (e.message === "Remote server responded with a status of 401") {
            console.log("User not logged in");
          } else {
            console.log(e);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [keycloak, mapper, mergeSearchParams, searchParams, sorter]
  );

  useEffect(() => {
    if (initialized && !query && !paused) {
      doFetch(baseUrl);
    }
  }, [baseUrl, doFetch, initialized, paused, query]);

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
