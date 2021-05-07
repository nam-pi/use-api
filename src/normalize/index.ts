import { JsonLdArray } from "jsonld/jsonld-spec";
import { Blanks, Cache, Normalized, NormalizeResult } from "types";
import { getId } from "./helpers/getId";
import { getIdLocal } from "./helpers/getIdLocal";
import { normalizeNode } from "./helpers/normalizeNode";

export const simplify = (result: NormalizeResult): NormalizeResult | string => {
  if (!result.id && result.value) {
    return result.value as string;
  } else {
    return result;
  }
};

const join = (normalized: Normalized, cache: Cache): NormalizeResult => {
  const result: NormalizeResult = { ...normalized };
  delete result.links;
  const linkProperties = Object.keys(normalized.links);
  for (let i = 0, iLength = linkProperties.length; i < iLength; i++) {
    const property = linkProperties[i];
    const links = normalized.links[property];
    if (typeof links === "string") {
      result[property] = simplify(join(cache[links], cache));
    } else {
      const results = [];
      for (let j = 0, jLength = links.length; j < jLength; j++) {
        results.push(simplify(join(cache[links[j]], cache)));
      }
      result[property] = results;
    }
  }
  return result;
};

export const normalize = (
  jsonArray: JsonLdArray
): undefined | NormalizeResult => {
  const blanks: Blanks = {};
  const cache: Cache = {};
  const root = jsonArray?.[0] || {};
  if (!root || Object.keys(root).length === 0) {
    return;
  }
  normalizeNode(root, cache, blanks);
  const rootId = getIdLocal(getId(root));
  const joined = join(cache[rootId], cache);
  return joined;
};
