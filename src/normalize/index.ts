import { NodeObject } from "jsonld";
import { JsonLdArray } from "jsonld/jsonld-spec";
import { namespaces } from "namespaces";
import { normalizeEvent } from "normalize/normalizers/normalizeEvent";
import { normalizeUser } from "normalize/normalizers/normalizeUser";
import {
  Blanks,
  Cache,
  Literal,
  LiteralString,
  Normalized,
  Normalizer,
  NormalizeResult,
  PropertyMap,
} from "types";
import { v4 as uuidv4 } from "uuid";
import { getIdLocal } from "./helpers/getIdLocal";
import { isBlank } from "./helpers/isBlank";
import { addLinks } from "./helpers/transforms";
import { normalizeCollection } from "./normalizers/normalizeCollection";

const { api, core, hydra, xsd } = namespaces;

const findNormalizer = (type: undefined | string): Normalizer => {
  switch (type) {
    case hydra.Collection.iri:
      return normalizeCollection;
    case core.event.iri:
      return normalizeEvent;
    case api.user.iri:
      return normalizeUser;
    default:
      // Do nothing
      return () => undefined;
  }
};

const initNormalized = (
  node: NodeObject,
  cache: Cache,
  blanks: Blanks,
  propertyMap: PropertyMap
): Normalized => {
  const normalized = { links: {} } as Normalized;
  const resourceIris = Object.keys(node);
  for (let i = 0, length = resourceIris.length; i < length; i++) {
    const iri = resourceIris[i];
    if (node[iri] === null || node[iri] === undefined) {
      continue;
    }
    // Add types
    if (iri === "@type") {
      const resource = node[iri] as string | string[];
      normalized.types = (Array.isArray(resource)
        ? resource
        : [resource]) as string[];
    }
    // Add id
    else if (iri === "@id") {
      const id = node["@id"] || "";
      if (isBlank(id)) {
        const idLocal = blanks[id] ? blanks[id] : uuidv4();
        normalized.idLocal = idLocal;
        blanks[id] = idLocal;
      } else {
        normalized.id = id;
        normalized.idLocal = getIdLocal(id);
      }
    }
    // Add all other nodes
    else {
      const resource = (Array.isArray(node[iri])
        ? node[iri]
        : [node[iri]]) as NodeObject[];
      const propertyKey = mapKey(propertyMap, normalized.types, iri);
      const properties: Normalized[] = [];
      const literals: Literal[] = [];
      for (let i = 0, length = resource.length; i < length; i++) {
        const property = normalizeNode(resource[i], cache, blanks, propertyMap);
        if (!property) {
          continue;
        } else if (property.value) {
          literals.push(property as Literal);
        } else {
          properties.push(property as Normalized);
        }
      }
      if (literals.length > 0) {
        normalized[propertyKey] = literals;
      } else if (properties.length > 0) {
        const localIds = properties.map((property) => property.idLocal);
        addLinks(normalized, propertyKey, localIds, blanks);
      }
    }
  }
  return normalized;
};

const joinCache = (normalized: Normalized, cache: Cache): NormalizeResult => {
  const result: NormalizeResult = { ...normalized };
  delete result.links;
  const linkProperties = Object.keys(normalized.links);
  for (let i = 0, iLength = linkProperties.length; i < iLength; i++) {
    const property = linkProperties[i];
    const links = normalized.links[property];
    if (typeof links === "string") {
      result[property] = joinCache(cache[links], cache);
    } else {
      const results = [];
      for (let j = 0, jLength = links.length; j < jLength; j++) {
        results.push(joinCache(cache[links[j]], cache));
      }
      result[property] = results;
    }
  }
  return result;
};

const mapKey = (
  map: PropertyMap,
  types: undefined | string[],
  property: string
): string => {
  const itemType = (types || []).find((t) => map[t]);
  const mapped = !itemType ? undefined : map[itemType]?.[property];
  return mapped || property;
};

const normalizeNode = (
  node: NodeObject | null,
  cache: Cache,
  blanks: Blanks,
  propertyMap: PropertyMap
): undefined | Normalized | Literal => {
  if (!node || typeof node !== "object") {
    return;
  }
  if (node["@value"]) {
    const value = node["@value"] as string;
    const types = node["@type"];
    if (types?.includes(xsd.dateTime.iri)) {
      return { value: new Date(value) };
    } else if (types?.includes(xsd.integer.iri)) {
      return { value: parseInt(value) };
    } else {
      const literal: LiteralString = { value };
      if (node["@language"]) {
        literal.language = node["@language"] as string;
      }
      return literal;
    }
  } else if (node["@id"]) {
    const normalized = initNormalized(node, cache, blanks, propertyMap);
    for (let i = 0, length = normalized.types?.length || 0; i < length; i++) {
      const normalizer = findNormalizer(normalized.types?.[i]);
      normalizer(node, normalized, cache, blanks, propertyMap);
    }
    const original = (cache[normalized.idLocal] || {}) as Normalized;
    cache[normalized.idLocal] = { ...original, ...normalized };
    return normalized;
  }
};

export const normalize = (
  jsonArray: JsonLdArray,
  propertyMap: PropertyMap
): undefined | NormalizeResult => {
  const blanks: Blanks = {};
  const cache: Cache = {};
  const root = jsonArray?.[0] || {};
  if (!root || Object.keys(root).length === 0) {
    return;
  }
  const { idLocal } = normalizeNode(
    root,
    cache,
    blanks,
    propertyMap
  ) as Normalized;
  return joinCache(cache[idLocal], cache);
};
