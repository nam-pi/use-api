import { useCallback } from "react";
import { FetchFunction, FetchResult, Person } from "types";
import { buildPath } from "utils/buildPath";
import { getPerson } from "utils/getPerson";
import { jsonPath } from "utils/jsonPath";
import { useFetch } from "./useFetch";
import { useNampiContext } from "./useNampiContext";

export const usePerson = (idLocal: string): FetchResult<Person> => {
  const { apiUrl, namespaces } = useNampiContext();
  const fetch = useCallback<FetchFunction<Person>>(
    async (json) => getPerson(jsonPath(json, "$[0]"), namespaces),
    [namespaces]
  );
  return useFetch<Person>(buildPath(apiUrl, "person", idLocal), fetch);
};
