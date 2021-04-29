import { rdfs } from "@hydra-cg/heracles.ts";
import { useCallback } from "react";
import { FetchFunction, FetchResult, JSONPathJson, Person } from "types";
import { buildPath } from "utils/buildPath";
import { getEvents } from "utils/getEvents";
import { getLocalId } from "utils/getLocalId";
import { getMultilangTexts } from "utils/getMultilangTexts";
import { useFetch } from "./useFetch";
import { useNampiContext } from "./useNampiContext";

export const usePerson = (idLocal: string): FetchResult<Person> => {
  const { apiUrl, namespaces } = useNampiContext();
  const fetch = useCallback<FetchFunction<Person>>(
    async (path) => {
      const id = path<string>("$[0].id");
      const types = path<string[]>("$[0].type");
      const labels = path<JSONPathJson>(`$[0]['${rdfs.label}']`);
      const bornIn = path<JSONPathJson>(`$[0]['${namespaces.core.isBornIn}']`);
      const diesIn = path<JSONPathJson>(`$[0]['${namespaces.core.diesIn}']`);
      return {
        bornIn: getEvents(bornIn, namespaces),
        diesIn: getEvents(diesIn, namespaces),
        id,
        idLocal: getLocalId(id),
        labels: getMultilangTexts(labels),
        types,
      } as Person;
    },
    [namespaces]
  );
  return useFetch<Person>(buildPath(apiUrl, "person", idLocal), fetch);
};
