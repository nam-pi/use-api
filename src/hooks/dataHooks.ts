import { person } from "mappers/person";
import { user } from "mappers/user";
import { FetchCollectionResult, FetchResult, Person, User } from "types";
import { buildPath } from "utils/buildPath";
import { useFetch } from "./useFetch";
import { useNampiContext } from "./useNampiContext";

export const usePerson = (idLocal: string): FetchResult<Person> => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "person", idLocal), person);
};

export const usePersons = (): FetchCollectionResult<Person> => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "persons"), person, {});
};

export const useUser = (): FetchResult<User> => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "user"), user);
};
