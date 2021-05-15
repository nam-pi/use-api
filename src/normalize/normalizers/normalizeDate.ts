import { namespaces } from "namespaces";
import { MaybeNodes, Normalizer } from "types";

const { core } = namespaces;

export const normalizeDate: Normalizer = (node, normalized) => {
  normalized.value = (node[core.hasDateTime] as MaybeNodes)?.[0]?.["@value"];
};
