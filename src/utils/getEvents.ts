import { rdfs } from "@hydra-cg/heracles.ts";
import { Event, EventDate, JSONPathJson, Namespaces } from "types";
import { getLocalId } from "./getLocalId";
import { getMultilangTexts } from "./getMultilangTexts";
import { jsonPath } from "./jsonPath";

export const getEvents = (
  json: JSONPathJson,
  { core }: Namespaces
): undefined | Event[] => {
  const results: Event[] = [];
  const data = Array.isArray(json) ? json : [json];
  for (let i = 0, length = data.length; i < length; i++) {
    const id = jsonPath<string>(data[i], "$.id");
    const types = jsonPath<string[]>(data[i], "$.type");
    const labels = getMultilangTexts(jsonPath(data[i], `$['${rdfs.label}']`));
    const exact = jsonPath<undefined | string>(
      data[i],
      `$['${core.takesPlaceOn}'][0]['${core.hasXsdDateTime}'][0].value`
    );
    const earliest = jsonPath<undefined | string>(
      data[i],
      `$['${core.takesPlaceNotEarlierThan}'][0]['${core.hasXsdDateTime}'][0].value`
    );
    const sort = jsonPath<undefined | string>(
      data[i],
      `$['${core.hasSortingDate}'][0]['${core.hasXsdDateTime}'][0].value`
    );
    const latest = jsonPath<undefined | string>(
      data[i],
      `$['${core.takesPlaceNotLaterThan}'][0]['${core.hasXsdDateTime}'][0].value`
    );
    const date = {} as EventDate;
    if (exact) {
      date.exact = new Date(exact);
    }
    if (earliest) {
      date.earliest = new Date(earliest);
    }
    if (latest) {
      date.earliest = new Date(latest);
    }
    date.sort = sort
      ? new Date(sort)
      : date.exact
      ? date.exact
      : date.latest
      ? date.latest
      : date.earliest
      ? date.earliest
      : new Date();
    results.push({ id, idLocal: getLocalId(id) || "", types, labels, date });
  }
  return results.length === 0 ? undefined : results;
};
