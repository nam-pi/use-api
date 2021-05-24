import { namespaces } from "namespaces";
import { makeSingle } from "normalize/helpers/transforms";
import { MaybeNodes, Normalized, Normalizer } from "types";

const { core } = namespaces;

export const normalizeActs: Normalizer = (node, normalized, cache) => {
  makeSingle(normalized, "interpretation");
  makeSingle(normalized, "sourceLocation");
  const date = cache[normalized.links.date[0]] as undefined | Normalized;
  const value = (date?.[core.hasDateTime.iri] as MaybeNodes)?.[0]?.value;
  if (value) {
    normalized.date = value;
    delete normalized.links.date;
  }
};
