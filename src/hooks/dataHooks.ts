import { sortByEventDate } from "sorters/sortByEventDate";
import { sortById } from "sorters/sortById";
import { sortByLabel } from "sorters/sortByLabel";
import {
  Act,
  ActsQuery,
  Aspect,
  AspectsQuery,
  Author,
  AuthorsQuery,
  CollectionQuery,
  Event,
  EventsQuery,
  FetchCollectionHook,
  FetchHook,
  FetchResult,
  Group,
  GroupsQuery,
  Person,
  PersonsQuery,
  Place,
  SortFunction,
  Source,
  SourcesQuery,
  Type,
  TypesQuery,
  User,
} from "types";
import { buildPath } from "utils/buildPath";
import { getDateString } from "utils/getDateString";
import { useFetch } from "./useFetch";
import { useNampiContext } from "./useNampiContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDefaultSorter = (query: CollectionQuery): SortFunction<any> => {
  switch (query.orderBy) {
    case "label":
      return sortByLabel;
      break;
    default:
      return sortById;
  }
};

export const useActs: FetchCollectionHook<Act, ActsQuery> = ({
  paused,
  query,
}) => {
  const { apiUrl } = useNampiContext();
  const sorter = getDefaultSorter(query);
  return useFetch(buildPath(apiUrl, "acts"), query, sorter, paused);
};

export const useAct: FetchHook<Act> = ({ idLocal, paused }) => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "act", idLocal), paused);
};

export const useAspects: FetchCollectionHook<Aspect, AspectsQuery> = ({
  paused,
  query,
}) => {
  const { apiUrl } = useNampiContext();
  const sorter = getDefaultSorter(query);
  return useFetch(buildPath(apiUrl, "aspects"), query, sorter, paused);
};

export const useAspect: FetchHook<Aspect> = ({ idLocal, paused }) => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "aspect", idLocal), paused);
};

export const useAuthors: FetchCollectionHook<Author, AuthorsQuery> = ({
  paused,
  query,
}) => {
  const { apiUrl } = useNampiContext();
  const sorter = getDefaultSorter(query);
  return useFetch(buildPath(apiUrl, "authors"), query, sorter, paused);
};

export const useAuthor: FetchHook<Author> = ({ idLocal, paused }) => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "author", idLocal), paused);
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
    default:
      sorter = getDefaultSorter(query);
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

export const useGroup: FetchHook<Group> = ({ idLocal, paused }) => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "group", idLocal), paused);
};

export const useGroups: FetchCollectionHook<Group, GroupsQuery> = ({
  paused,
  query,
}) => {
  const { apiUrl } = useNampiContext();
  const sorter = getDefaultSorter(query);
  return useFetch(buildPath(apiUrl, "groups"), query, sorter, paused);
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
  const sorter = getDefaultSorter(query);
  return useFetch(buildPath(apiUrl, "persons"), query, sorter, paused);
};

export const usePlace: FetchHook<Place> = ({ idLocal, paused }) => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "place", idLocal), paused);
};

export const usePlaces: FetchCollectionHook<Place, PersonsQuery> = ({
  paused,
  query,
}) => {
  const { apiUrl } = useNampiContext();
  const sorter = getDefaultSorter(query);
  return useFetch(buildPath(apiUrl, "places"), query, sorter, paused);
};

export const useSource: FetchHook<Source> = ({ idLocal, paused }) => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "source", idLocal), paused);
};

export const useSources: FetchCollectionHook<Source, SourcesQuery> = ({
  paused,
  query,
}) => {
  const { apiUrl } = useNampiContext();
  const sorter = getDefaultSorter(query);
  return useFetch(buildPath(apiUrl, "sources"), query, sorter, paused);
};

export const useTypes: FetchCollectionHook<Type, TypesQuery> = ({
  paused,
  query,
}) => {
  const { apiUrl } = useNampiContext();
  const sorter = getDefaultSorter(query);
  return useFetch(buildPath(apiUrl, "types"), query, sorter, paused);
};

export const useUser = (): FetchResult<User> => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "user"));
};
