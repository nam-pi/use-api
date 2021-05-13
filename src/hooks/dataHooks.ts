import { sortByEventDate } from "sorters/sortByEventDate";
import { sortById } from "sorters/sortById";
import { sortByLabel } from "sorters/sortByLabel";
import {
  Aspect,
  AspectsQuery,
  Class,
  ClassesQuery,
  Event,
  EventsQuery,
  FetchCollectionHook,
  FetchHook,
  FetchResult,
  Person,
  PersonsQuery,
  SortFunction,
  User,
} from "types";
import { buildPath } from "utils/buildPath";
import { getDateString } from "utils/getDateString";
import { useFetch } from "./useFetch";
import { useNampiContext } from "./useNampiContext";

export const useAspects: FetchCollectionHook<Aspect, AspectsQuery> = ({
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
  return useFetch(buildPath(apiUrl, "aspects"), query, sorter, paused);
};

export const useAspect: FetchHook<Aspect> = ({ idLocal, paused }) => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "aspect", idLocal), paused);
};

export const useClasses: FetchCollectionHook<Class, ClassesQuery> = ({
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
  return useFetch(buildPath(apiUrl, "classes"), query, sorter, paused);
};

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
    case "id":
      sorter = sortById;
      break;
    case "label":
      sorter = sortByLabel;
      break;
  }
  if (query.startDate || query.endDate) {
    const dates = `${getDateString(query.startDate)}-${getDateString(
      query.endDate
    )}`;
    delete query.startDate;
    delete query.endDate;
    query.dates = dates;
  }
  return useFetch(buildPath(apiUrl, "events"), query, sorter, paused);
};

export const usePerson: FetchHook<Person> = ({ idLocal, paused }) => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "person", idLocal), paused);
};

export const usePersons: FetchCollectionHook<Person, PersonsQuery> = ({
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
