import { rdfs } from "@hydra-cg/heracles.ts";
import { namespaces } from "namespaces";
import { Event, EventDate, FetchMapper } from "types";
import { jsonPath } from "utils/jsonPath";
import { idLocal } from "./idLocal";
import { multilangTexts } from "./multilangTexts";

export const event: FetchMapper<Event> = (json) => {
  const { core } = namespaces;
  const id = jsonPath<string>(json, "$.id");
  const types = jsonPath<string[]>(json, "$.type");
  const labels = multilangTexts(jsonPath(json, `$['${rdfs.label}']`));
  const exact = jsonPath<undefined | string>(
    json,
    `$['${core.takesPlaceOn}'][0]['${core.hasXsdDateTime}'][0].value`
  );
  const earliest = jsonPath<undefined | string>(
    json,
    `$['${core.takesPlaceNotEarlierThan}'][0]['${core.hasXsdDateTime}'][0].value`
  );
  const sort = jsonPath<undefined | string>(
    json,
    `$['${core.hasSortingDate}'][0]['${core.hasXsdDateTime}'][0].value`
  );
  const latest = jsonPath<undefined | string>(
    json,
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
  return {
    id,
    idLocal: idLocal(id),
    types,
    labels,
    date,
  };
};
