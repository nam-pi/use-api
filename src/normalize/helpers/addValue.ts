import { NodeObject } from "jsonld";
import { MaybeNodes, Normalized } from "types";

export const addValue = (
  node: NodeObject,
  normalized: Normalized,
  property: string,
  name: string
): void => {
  const valueNode = node[property] as MaybeNodes;
  if (valueNode) {
    normalized[name] = valueNode[0]?.["@value"];
  }
};
