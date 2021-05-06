import { namespaces } from "namespaces";
import { FetchMapper, Person } from "types";
import { jsonPath } from "../utils/jsonPath";
import { events } from "./events";
import { idLocal } from "./idLocal";
import { multilangTexts } from "./multilangTexts";

export const person: FetchMapper<Person> = (json) => {
  const { core, rdfs } = namespaces;
  const id = jsonPath<string>(json, "$.id");
  const types = jsonPath<string[]>(json, "$.type");
  const labelsJson = jsonPath(json, `$['${rdfs.label}']`);
  const bornInJson = jsonPath(json, `$['${core.isBornIn}']`);
  const diesInJson = jsonPath(json, `$['${core.diesIn}']`);
  return {
    bornIn: events(bornInJson),
    diesIn: events(diesInJson),
    id,
    idLocal: idLocal(id),
    labels: multilangTexts(labelsJson),
    types,
  };
};
