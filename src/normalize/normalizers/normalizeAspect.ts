import { namespaces } from "namespaces";
import { MaybeNodes, Normalizer } from "types";

const { core } = namespaces;

export const normalizeAspect: Normalizer = (node, normalized) => {
  const value = (node[core.hasText] as MaybeNodes)?.[0]?.["@value"];
  if (value) {
    const language = (node[core.hasText] as MaybeNodes)?.[0]?.["@language"];
    normalized.text = {
      value,
      language,
    };
  }
  const sameAsNodes = node[core.sameAs] as MaybeNodes;
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
