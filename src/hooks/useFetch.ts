import { useCallback, useEffect, useState } from "react";
import { FetchFunction, FetchResult } from "types";
import { expandContainer } from "utils/expandContainer";
import { jsonPath } from "utils/jsonPath";
import { useNampiContext } from "./useNampiContext";

export const useFetch = <T>(
  url: string,
  fetch: FetchFunction<T>
): FetchResult<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<undefined | T>();
  const { hydra, initialized } = useNampiContext();
  const doFetch = useCallback(async () => {
    setLoading(true);
    await hydra
      .getResource(url)
      .then(async (data) => {
        const json = await expandContainer(data);
        const path = <P>(path: string) => jsonPath<P>(json, path);
        return fetch(path);
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
  }, [fetch, hydra, url]);
  useEffect(() => {
    doFetch();
  }, [doFetch]);
  return { initialized, loading, data };
};
