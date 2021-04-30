import { collectionMeta } from "mappers/collectionMeta";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CollectionNav,
  FetchCollectionResult,
  FetchMapper,
  FetchResult,
} from "types";
import { expandContainer } from "utils/expandContainer";
import { useNampiContext } from "./useNampiContext";

type Search = Record<string, string>;

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
            } = collectionMeta(json);
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
