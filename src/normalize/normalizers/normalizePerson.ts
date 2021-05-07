import { namespaces } from "namespaces";
import { MaybeNodes, Normalizer } from "types";
import { addLinks } from "../helpers/addLinks";
import { normalizeNode } from "../helpers/normalizeNode";

const { core } = namespaces;

export const normalizePerson: Normalizer = (
  node,
  normalized,
  cache,
  blanks
) => {
  const isBornInNodes = node[core.isBornIn] as MaybeNodes;
  if (Array.isArray(isBornInNodes)) {
    const births: string[] = [];
    for (let i = 0, length = isBornInNodes.length; i < length; i++) {
      const birth = normalizeNode(isBornInNodes[i], cache, blanks);
      if (birth) {
        births.push(birth.idLocal);
      }
    }
    addLinks(normalized, "bornIn", births, blanks);
  }
  const deathNodes = node[core.diesIn] as MaybeNodes;
  if (Array.isArray(deathNodes)) {
    const deaths: string[] = [];
    for (let i = 0, length = deathNodes.length; i < length; i++) {
      const death = normalizeNode(deathNodes[i], cache, blanks);
      if (death) {
        deaths.push(death.idLocal);
      }
    }
    addLinks(normalized, "diesIn", deaths, blanks);
  }
};
