import { hydra, ILink, ITemplatedLink } from "@hydra-cg/heracles.ts";
import { collectionMeta } from "mappers/collectionMeta";
import { namespaces } from "namespaces";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CollectionNav,
  Entity,
  FetchCollectionResult,
  FetchMapper,
  FetchResult,
  JSONPathJson,
  QueryParams,
  Timeout,
} from "types";
import { expandContainer } from "utils/expandContainer";
import { useNampiContext } from "./useNampiContext";

const LIMIT_REGEX = /(?:limit=(?<limit>\d*))/;
const OFFSET_REGEX = /(?:offset=(?<offset>\d*))/;

const getPage = (url: string) => {
  const limit = Number(url.match(LIMIT_REGEX)?.groups?.limit || 1);
  const offset = Number(url.match(OFFSET_REGEX)?.groups?.offset || 0);
  return Math.floor(offset / limit + 1);
};

export function useFetch<T extends Entity>(
  url: string,
  mapper: FetchMapper<T>
): FetchResult<T>;
export function useFetch<T extends Entity>(
  url: string,
  mapper: FetchMapper<T>,
  search: QueryParams
): FetchCollectionResult<T>;
export function useFetch<T extends Entity>(
  url: string,
  mapper: FetchMapper<T>,
  search?: QueryParams
) {
  const inflight = useRef<boolean>(false);
  const firstUrl = useRef<string>(url);
  const oldSearch = useRef<string>("");
  const searchTimeout = useRef<Timeout>();
  const context = useNampiContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [nav, setNav] = useState<CollectionNav>({});
  const [data, setData] = useState<undefined | T | T[]>();
  const [template, setTemplate] = useState<undefined | ITemplatedLink>();
  const [total, setTotal] = useState<undefined | number>();
  const [initialized, setInitialized] = useState<boolean>(
    search === undefined || Object.keys(search).length === 0
  );

  const fetch = useCallback(
    async (url: string | ILink) => {
      inflight.current = true;
      setLoading(true);
      await context.hydra
        .getResource(url)
        .then(async (container) => {
          const json = await expandContainer(container);
          if (search) {
            const collection = container.collections.first();
            const {
              first,
              last,
              members,
              next,
              previous,
              total,
              viewIri,
            } = collectionMeta(json);
            setNav({
              first:
                first && viewIri !== first ? () => fetch(first) : undefined,
              previous: previous ? () => fetch(previous) : undefined,
              next: next ? () => fetch(next) : undefined,
              last: last && viewIri !== last ? () => fetch(last) : undefined,
              page: getPage(viewIri),
            });
            setTemplate(
              collection.links.ofIri(hydra.search).first() as ITemplatedLink
            );
            setTotal(total);
            const data = (members || []).map(mapper);
            return search[namespaces.doc.personOrderByVariable] === "label"
              ? data.sort((a, b) => {
                  const labA = a.labels
                    .map((l) => l.value)
                    .join("")
                    .toLocaleLowerCase();
                  const labB = b.labels
                    .map((l) => l.value)
                    .join("")
                    .toLocaleLowerCase();
                  return labA < labB ? -1 : labA > labB ? 1 : 0;
                })
              : data;
          } else {
            return mapper((json as JSONPathJson[])[0]);
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
          inflight.current = false;
        });
    },
    [context.hydra, mapper, search]
  );

  useEffect(() => {
    if (inflight.current) {
      return;
    }
    if (Object.keys(nav).length === 0 || !template) {
      fetch(firstUrl.current);
      return;
    }
    const serializedSearch = JSON.stringify(search);
    if (serializedSearch === oldSearch.current) {
      return;
    }
    oldSearch.current = serializedSearch;
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(async () => {
      const finalTarget = template.expandTarget((p) => {
        for (const key of Object.keys(search || {})) {
          p.withProperty(key).havingValueOf(search?.[key]);
        }
        return p;
      });
      await fetch(finalTarget);
      setInitialized(true);
    }, context.searchTimeout);
  }, [context.searchTimeout, fetch, nav, search, template]);

  return {
    data,
    initialized: initialized && context.initialized,
    loading,
    nav: search ? nav : undefined,
    total,
  };
}
