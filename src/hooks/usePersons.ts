import { hydra } from "@hydra-cg/heracles.ts";
import { useCallback } from "react";
import { FetchFunction, FetchResult, JSONPathJson, List, Person } from "types";
import { buildPath } from "utils/buildPath";
import { getPerson } from "utils/getPerson";
import { jsonPath } from "utils/jsonPath";
import { useFetch } from "./useFetch";
import { useNampiContext } from "./useNampiContext";

export const usePersons = (): FetchResult<List<Person>> => {
  const { apiUrl, namespaces } = useNampiContext();
  const fetch = useCallback<FetchFunction<List<Person>>>(
    async (json) => {
      const persons = jsonPath<JSONPathJson>(json, `$[0]['${hydra.member}']`);
      const members = (Array.isArray(persons)
        ? persons
        : [persons]
      ).map((json) => getPerson(json, namespaces));
      const total = jsonPath<number>(
        json,
        `$[0]['${hydra.totalItems}'][0].value`
      );
      return { members, total };
    },
    [namespaces]
  );
  return useFetch(buildPath(apiUrl, "persons"), fetch);
};
