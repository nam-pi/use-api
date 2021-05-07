import { NodeObject } from "jsonld";
import { namespaces } from "namespaces";
import { MaybeNodes } from "types";

const { hydra } = namespaces;

export const getId = (node: NodeObject): string => {
  const types = node["@type"];
  return types && types.includes(hydra.Collection)
    ? (node[hydra.view] as MaybeNodes)?.[0]?.["@id"] || ""
    : node?.["@id"] || "";
};
