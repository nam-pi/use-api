import { person } from "mappers/person";
import { user } from "mappers/user";
import {
  FetchCollectionResult,
  FetchResult,
  Person,
  PersonQuery,
  QueryParams,
  User,
} from "types";
import { buildPath } from "utils/buildPath";
import { useFetch } from "./useFetch";
import { useNampiContext } from "./useNampiContext";

export const usePerson = (idLocal: string): FetchResult<Person> => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "person", idLocal), person);
};

export const usePersons = (
  query: PersonQuery = {}
): FetchCollectionResult<Person> => {
  const { apiUrl, namespaces } = useNampiContext();
  const params = {
    [namespaces.doc.personOrderByVariable]: "label",
  } as QueryParams;
  let key: keyof PersonQuery;
  for (key in query) {
    if (key === "text" && query[key]) {
      params[namespaces.doc.textVariable] = query[key];
    }
  }
  return useFetch(buildPath(apiUrl, "persons"), person, params);
};

export const useUser = (): FetchResult<User> => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "user"), user);
};
