import { Event, FetchMapper } from "types";
import { event } from "./event";

export const events: FetchMapper<undefined | Event[]> = (json) => {
  const results: Event[] = [];
  const data = Array.isArray(json) ? json : [json];
  for (let i = 0, length = data.length; i < length; i++) {
    results.push(event(data[i]));
  }
  return results.length === 0 ? undefined : results;
};
