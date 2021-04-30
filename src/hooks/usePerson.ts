import { rdfs } from "@hydra-cg/heracles.ts";
import { useCallback } from "react";
import { FetchFunction, FetchResult, JSONPathJson, Person } from "types";
import { buildPath } from "utils/buildPath";
import { getEvents } from "utils/getEvents";
import { getLocalId } from "utils/getLocalId";
import { getMultilangTexts } from "utils/getMultilangTexts";
import { jsonPath } from "utils/jsonPath";
import { useFetch } from "./useFetch";
import { useNampiContext } from "./useNampiContext";

export const usePerson = (idLocal: string): FetchResult<Person> => {
  const { apiUrl, namespaces } = useNampiContext();
  const fetch = useCallback<FetchFunction<Person>>(
    async (json) => {
      const id = jsonPath<string>(json, "$[0].id");
      const types = jsonPath<string[]>(json, "$[0].type");
      const labelsJson = jsonPath<JSONPathJson>(json, `$[0]['${rdfs.label}']`);
      const bornInJson = jsonPath<JSONPathJson>(
        json,
        `$[0]['${namespaces.core.isBornIn}']`
      );
      const diesInJson = jsonPath<JSONPathJson>(
        json,
        `$[0]['${namespaces.core.diesIn}']`
      );
      return {
        bornIn: getEvents(bornInJson, namespaces),
        diesIn: getEvents(diesInJson, namespaces),
        id,
        idLocal: getLocalId(id),
        labels: getMultilangTexts(labelsJson),
        types,
      };
    },
    [namespaces]
  );
  return useFetch<Person>(buildPath(apiUrl, "person", idLocal), fetch);
};
