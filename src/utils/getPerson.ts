import { rdfs } from "@hydra-cg/heracles.ts";
import { JSONPathJson, Namespaces, Person } from "types";
import { getEvents } from "./getEvents";
import { getLocalId } from "./getLocalId";
import { getMultilangTexts } from "./getMultilangTexts";
import { jsonPath } from "./jsonPath";

export const getPerson = (
  json: JSONPathJson,
  namespaces: Namespaces
): Person => {
  console.log(json);
  const id = jsonPath<string>(json, "$.id");
  const types = jsonPath<string[]>(json, "$.type");
  const labelsJson = jsonPath<JSONPathJson>(json, `$['${rdfs.label}']`);
  const bornInJson = jsonPath<JSONPathJson>(
    json,
    `$['${namespaces.core.isBornIn}']`
  );
  const diesInJson = jsonPath<JSONPathJson>(
    json,
    `$['${namespaces.core.diesIn}']`
  );
  return {
    bornIn: getEvents(bornInJson, namespaces),
    diesIn: getEvents(diesInJson, namespaces),
    id,
    idLocal: getLocalId(id),
    labels: getMultilangTexts(labelsJson),
    types,
  };
};
