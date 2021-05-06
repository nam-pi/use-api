import { namespaces } from "namespaces";
import { FetchMapper, JSONPathJson, Person } from "types";
import { jsonPath } from "../utils/jsonPath";
import { events } from "./events";
import { idLocal } from "./idLocal";
import { multilangTexts } from "./multilangTexts";

export const person: FetchMapper<Person> = (json) => {
  const { core, rdfs } = namespaces;
  const id = jsonPath<string>(json, "$.id");
  const types = jsonPath<string[]>(json, "$.type");
  const labelsJson = jsonPath(json, `$['${rdfs.label}']`);
  const bornInJson = jsonPath<undefined | JSONPathJson>(
    json,
    `$['${core.isBornIn}']`
  );
  const diesInJson = jsonPath<undefined | JSONPathJson>(
    json,
    `$['${core.diesIn}']`
  );
  return {
    bornIn: bornInJson ? events(bornInJson) : undefined,
    diesIn: diesInJson ? events(diesInJson) : undefined,
    id,
    idLocal: idLocal(id),
    labels: multilangTexts(labelsJson),
    types,
  };
};
