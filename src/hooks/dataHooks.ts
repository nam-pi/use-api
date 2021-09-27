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
    EventMutationPayload,
    EventsQuery,
    FetchCollectionHook,
    FetchHook,
    FetchResult,
    Group,
    GroupsQuery,
    Hierarchy,
    HierarchyQuery,
    MutationHook,
    Person,
    PersonsQuery,
    Place,
    SortFunction,
    Source,
    SourcesQuery,
    Type,
    TypesQuery,
    User
} from "types";
import { buildPath } from "utils/buildPath";
import { getDateString } from "utils/getDateString";
import { useFetch } from "./useFetch";
import { useMutation } from "./useMutation";
import { useNampiContext } from "./useNampiContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDefaultSorter = (query: CollectionQuery): SortFunction<any> => {
  switch (query.orderBy) {
    case "label":
      return sortByLabel;
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
  return useFetch(buildPath(apiUrl, "acts", idLocal), paused);
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
  return useFetch(buildPath(apiUrl, "aspects", idLocal), paused);
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
  return useFetch(buildPath(apiUrl, "authors", idLocal), paused);
};

export const useEvent: FetchHook<Event> = ({ idLocal, paused }) => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "events", idLocal), paused);
};

export const useEventMutations: MutationHook<EventMutationPayload, Event> =
  useMutation;

export const useEvents: FetchCollectionHook<Event, EventsQuery> = ({
  paused,
  query,
}) => {
  const copy = { ...query };
  const { apiUrl } = useNampiContext();
  let sorter: undefined | SortFunction<any> = undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
  switch (copy.orderBy) {
    case "date":
      sorter = sortByEventDate;
      break;
    default:
      sorter = getDefaultSorter(copy);
  }
  if (copy.startDate || copy.endDate) {
    const dates = `${getDateString(copy.startDate)}-${getDateString(
      copy.endDate
    )}`;
    delete copy.startDate;
    delete copy.endDate;
    copy.dates = dates;
  }
  return useFetch(buildPath(apiUrl, "events"), copy, sorter, paused);
};

export const useGroup: FetchHook<Group> = ({ idLocal, paused }) => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "groups", idLocal), paused);
};

export const useGroups: FetchCollectionHook<Group, GroupsQuery> = ({
  paused,
  query,
}) => {
  const { apiUrl } = useNampiContext();
  const sorter = getDefaultSorter(query);
  return useFetch(buildPath(apiUrl, "groups"), query, sorter, paused);
};

export const useHierarchy = ({
  paused,
  query,
}: Parameters<
  FetchCollectionHook<Hierarchy, HierarchyQuery>
>[0]): FetchResult<Hierarchy> => {
  const { apiUrl } = useNampiContext();
  const { data, initialized, loading } = useFetch<Hierarchy, HierarchyQuery>(
    buildPath(apiUrl, "hierarchy"),
    query,
    undefined,
    paused
  );
  return { data: data as unknown as Hierarchy, initialized, loading };
};

export const usePerson: FetchHook<Person> = ({ idLocal, paused }) => {
  const { apiUrl } = useNampiContext();
  return useFetch(buildPath(apiUrl, "persons", idLocal), paused);
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
  return useFetch(buildPath(apiUrl, "places", idLocal), paused);
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
  return useFetch(buildPath(apiUrl, "sources", idLocal), paused);
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
  return useFetch(buildPath(apiUrl, "users", "current"));
};
