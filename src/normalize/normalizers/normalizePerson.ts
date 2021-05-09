import { namespaces } from "namespaces";
import { MaybeNodes, Normalizer } from "types";
import { addLinks } from "../helpers/addLinks";
import { normalizeNode } from "../helpers/normalizeNode";

const { core, schema } = namespaces;

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
  const sameAsNodes = node[schema.sameAs] as MaybeNodes;
  const sameAs: string[] = [];
  if (sameAsNodes) {
    const sameAsArray = Array.isArray(sameAsNodes)
      ? sameAsNodes
      : [sameAsNodes];
    for (let i = 0, length = sameAsArray.length; i < length; i++) {
      sameAs.push(sameAsNodes[0]["@id"] as string);
    }
    normalized.sameAs = sameAs;
  }
};
