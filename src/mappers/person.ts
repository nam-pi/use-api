import { rdfs } from "@hydra-cg/heracles.ts";
import { JSONPathJson, Namespaces, Person } from "types";
import { jsonPath } from "../utils/jsonPath";
import { events } from "./events";
import { idLocal } from "./idLocal";
import { multilangTexts } from "./multilangTexts";

export const person = (json: JSONPathJson, namespaces: Namespaces): Person => {
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
    bornIn: events(bornInJson, namespaces),
    diesIn: events(diesInJson, namespaces),
    id,
    idLocal: idLocal(id),
    labels: multilangTexts(labelsJson),
    types,
  };
};
