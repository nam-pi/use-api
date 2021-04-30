import { FetchCollectionResult, FetchResult, Person, User } from "types";
import { buildPath } from "utils/buildPath";
import { getPerson } from "utils/getPerson";
import { getUser } from "utils/getUser";
import { useFetch } from "./useFetch";
import { useNampiContext } from "./useNampiContext";

export const usePerson = (idLocal: string): FetchResult<Person> => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "person", idLocal), getPerson);
};

export const usePersons = (): FetchCollectionResult<Person> => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "persons"), getPerson, {});
};

export const useUser = (): FetchResult<User> => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "user"), getUser);
};
