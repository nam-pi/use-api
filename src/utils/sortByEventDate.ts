import { Event, SortFunction } from "types";

export const sortByEventDate: SortFunction<Event> = (a, b) => {
  const dateA = a.date.sort.getTime();
  const DateB = b.date.sort.getTime();
  return dateA < DateB ? -1 : dateA > DateB ? 1 : 0;
};
