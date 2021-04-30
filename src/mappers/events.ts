import { rdfs } from "@hydra-cg/heracles.ts";
import { Event, EventDate, JSONPathJson, Namespaces } from "types";
import { jsonPath } from "utils/jsonPath";
import { idLocal } from "./idLocal";
import { multilangTexts } from "./multilangTexts";

export const events = (
  json: JSONPathJson,
  { core }: Namespaces
): undefined | Event[] => {
  const results: Event[] = [];
  const data = Array.isArray(json) ? json : [json];
  for (let i = 0, length = data.length; i < length; i++) {
    const id = jsonPath<string>(data[i], "$.id");
    const types = jsonPath<string[]>(data[i], "$.type");
    const labels = multilangTexts(jsonPath(data[i], `$['${rdfs.label}']`));
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
    results.push({
      id,
      idLocal: idLocal(id),
      types,
      labels,
      date,
    });
  }
  return results.length === 0 ? undefined : results;
};
