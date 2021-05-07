import { Event, SortFunction } from "types";

export const sortByEventDate: SortFunction<Event> = (a, b) => {
  const dateA = a.sort;
  const DateB = b.sort;
  return dateA < DateB ? -1 : dateA > DateB ? 1 : 0;
};
