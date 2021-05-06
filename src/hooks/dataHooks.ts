import { event } from "mappers/event";
import { person } from "mappers/person";
import { user } from "mappers/user";
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
import { sortByEventDate } from "utils/sortByEventDate";
import { sortById } from "utils/sortById";
import { sortByLabel } from "utils/sortByLabel";
import { useFetch } from "./useFetch";
import { useNampiContext } from "./useNampiContext";

export const useEvent: FetchHook<Event> = ({ idLocal, paused }) => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "event", idLocal), event, paused);
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
  return useFetch(buildPath(apiUrl, "events"), event, query, sorter, paused);
};

export const usePerson: FetchHook<Person> = ({ idLocal, paused }) => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "person", idLocal), person, paused);
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
  return useFetch(buildPath(apiUrl, "persons"), person, query, sorter, paused);
};

export const useUser = (): FetchResult<User> => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "user"), user);
};
