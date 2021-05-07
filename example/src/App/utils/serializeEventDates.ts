import { format as fmt } from "date-fns";
import { Event } from "nampi-use-api/bundle";

export const serializeEventDates = (
  events: undefined | Event[] = [],
  format = "yyyy-MM-dd",
  separator = ", "
): string => {
  const dates: string[] = [];
  for (let i = 0, length = events.length; i < length; i++) {
    const event = events[i];
    const dString = event.exact
      ? fmt(new Date(event.exact), format)
      : event.earliest && event.latest
      ? `${fmt(new Date(event.earliest), format)} - ${fmt(
          new Date(event.latest),
          format
        )}`
      : event.earliest
      ? fmt(new Date(event.earliest), format)
      : event.latest
      ? fmt(new Date(event.latest), format)
      : "";
    if (dString) {
      dates.push(dString);
    }
  }
  return dates.join(separator);
};
