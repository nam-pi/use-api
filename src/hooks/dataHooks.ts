import { sortByEventDate } from "sorters/sortByEventDate";
import { sortById } from "sorters/sortById";
import { sortByLabel } from "sorters/sortByLabel";
import {
  Event,
  EventsQuery,
  FetchCollectionHook,
  FetchHook,
  FetchResult,
  Person,
  PersonQuery,
  SortFunction,
  User,
} from "types";
import { buildPath } from "utils/buildPath";
import { useFetch } from "./useFetch";
import { useNampiContext } from "./useNampiContext";

export const useEvent: FetchHook<Event> = ({ idLocal, paused }) => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "event", idLocal), paused);
};

export const useEvents: FetchCollectionHook<Event, EventsQuery> = ({
  paused,
  query,
}) => {
  const { apiUrl } = useNampiContext();
  let sorter: undefined | SortFunction<any> = undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
  switch (query.orderBy) {
    case "date":
      sorter = sortByEventDate;
      break;
    case "label":
      sorter = sortByLabel;
      break;
  }
  return useFetch(buildPath(apiUrl, "events"), query, sorter, paused);
};

export const usePerson: FetchHook<Person> = ({ idLocal, paused }) => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "person", idLocal), paused);
};

export const usePersons: FetchCollectionHook<Person, PersonQuery> = ({
  paused,
  query,
}) => {
  const { apiUrl } = useNampiContext();
  let sorter: undefined | SortFunction<any> = sortById; // eslint-disable-line @typescript-eslint/no-explicit-any
  switch (query.orderBy) {
    case "id":
      sorter = sortById;
      break;
    case "label":
      sorter = sortByLabel;
      break;
  }
  return useFetch(buildPath(apiUrl, "persons"), query, sorter, paused);
};

export const useUser = (): FetchResult<User> => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "user"));
};
