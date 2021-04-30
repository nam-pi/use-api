import { hydra } from "@hydra-cg/heracles.ts";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CollectionNav,
  FetchCollectionResult,
  FetchMapper,
  FetchResult,
  JSONPathJson,
} from "types";
import { expandContainer } from "utils/expandContainer";
import { jsonPath } from "utils/jsonPath";
import { useNampiContext } from "./useNampiContext";

type Search = Record<string, string>;

const getCollectionMeta = (json: JSONPathJson) => ({
  members: jsonPath<Record<string, unknown>[]>(json, `$[0]['${hydra.member}']`),
  viewIri: jsonPath<string>(json, `$[0]['${hydra.view}'][0].id`),
  first: jsonPath<undefined | string>(
    json,
    `$[0]['${hydra.view}'][0]['${hydra.first}'][0].id`
  ),
  previous: jsonPath<undefined | string>(
    json,
    `$[0]['${hydra.view}'][0]['${hydra.previous}'][0].id`
  ),
  next: jsonPath<undefined | string>(
    json,
    `$[0]['${hydra.view}'][0]['${hydra.next}'][0].id`
  ),
  last: jsonPath<undefined | string>(
    json,
    `$[0]['${hydra.view}'][0]['${hydra.last}'][0].id`
  ),
  total: jsonPath<number>(json, `$[0]['${hydra.totalItems}'][0].value`),
});

export function useFetch<T>(
  url: string,
  mapper: FetchMapper<T>
): FetchResult<T>;
export function useFetch<T>(
  url: string,
  mapper: FetchMapper<T>,
  search: Search
): FetchCollectionResult<T>;
export function useFetch<T>(
  url: string,
  mapper: FetchMapper<T>,
  search?: Search
) {
  const firstUrl = useRef<string>(url);
  const [loading, setLoading] = useState<boolean>(false);
  const [nav, setNav] = useState<CollectionNav>({});
  const [data, setData] = useState<undefined | T | T[]>();
  const { hydra: client, initialized, namespaces } = useNampiContext();
  const [total, setTotal] = useState<undefined | number>();

  const fetch = useCallback(
    async (url: string) => {
      setLoading(true);
      await client
        .getResource(url)
        .then(async (container) => {
          const json = await expandContainer(container);
          if (search) {
            const {
              first,
              last,
              members,
              next,
              previous,
              total,
              viewIri,
            } = getCollectionMeta(json);
            setTotal(total);
            setNav({
              first:
                first && viewIri !== first ? () => fetch(first) : undefined,
              previous: previous ? () => fetch(previous) : undefined,
              next: next ? () => fetch(next) : undefined,
              last: last && viewIri !== last ? () => fetch(last) : undefined,
            });
            return members.map((m) => mapper(m, namespaces));
          } else {
            return mapper(json, namespaces);
          }
        })
        .then(setData)
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
    [client, mapper, namespaces, search]
  );

  useEffect(() => {
    if (Object.keys(nav).length === 0) {
      fetch(firstUrl.current);
      return;
    }
  }, [fetch, nav]);

  return search
    ? { initialized, loading, data, nav, total }
    : { initialized, loading, data };
}
