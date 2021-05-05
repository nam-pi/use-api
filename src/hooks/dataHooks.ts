import { event } from "mappers/event";
import { person } from "mappers/person";
import { user } from "mappers/user";
import { namespaces } from "namespaces";
import {
  Event,
  EventQuery,
  FetchCollectionResult,
  FetchResult,
  Person,
  PersonQuery,
  QueryParams,
  SortFunction,
  User,
} from "types";
import { buildPath } from "utils/buildPath";
import { sortByEventDate } from "utils/sortByEventDate";
import { sortById } from "utils/sortById";
import { sortByLabel } from "utils/sortByLabel";
import { useFetch } from "./useFetch";
import { useNampiContext } from "./useNampiContext";

export const useEvent = (idLocal: string): FetchResult<Event> => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "event", idLocal), event);
};

export const useEvents = (
  query: EventQuery = {}
): FetchCollectionResult<Event> => {
  const { apiUrl } = useNampiContext();
  const params = {
    [namespaces.api.eventOrderByVariable]: "id",
  } as QueryParams;
  let key: keyof EventQuery;
  let sorter: undefined | SortFunction<any> = undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
  for (key in query) {
    if (key === "text" && query[key]) {
      params[namespaces.api.textVariable] = query[key];
    }
    if (key === "orderBy" && query[key]) {
      params[namespaces.api.eventOrderByVariable] = query[key];
      switch (query[key]) {
        case "date":
          sorter = sortByEventDate;
          break;
        case "label":
          sorter = sortByLabel;
          break;
      }
    }
    if (key === "participant" && query[key]) {
      params[namespaces.api.eventParticipantVariable] = query[key];
    }
  }
  return useFetch(buildPath(apiUrl, "events"), event, params, sorter);
};

export const usePerson = (idLocal: string): FetchResult<Person> => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "person", idLocal), person);
};

export const usePersons = (
  query: PersonQuery = {}
): FetchCollectionResult<Person> => {
  const { apiUrl } = useNampiContext();
  const params = {
    [namespaces.api.personOrderByVariable]: "id",
  } as QueryParams;
  let sorter: undefined | SortFunction<any> = sortById; // eslint-disable-line @typescript-eslint/no-explicit-any
  let key: keyof PersonQuery;
  for (key in query) {
    if (key === "text" && query[key]) {
      params[namespaces.api.textVariable] = query[key];
    }
    if (key === "orderBy" && query[key]) {
      params[namespaces.api.personOrderByVariable] = query[key];
      switch (query[key]) {
        case "id":
          sorter = sortById;
          break;
        case "label":
          sorter = sortByLabel;
          break;
      }
    }
  }
  return useFetch(buildPath(apiUrl, "persons"), person, params, sorter);
};

export const useUser = (): FetchResult<User> => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "user"), user);
};
