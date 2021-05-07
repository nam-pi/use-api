import { NodeObject } from "jsonld";
import { namespaces } from "namespaces";
import { normalizeCollection } from "normalize/normalizers/normalizeCollection";
import { normalizeDate } from "normalize/normalizers/normalizeDate";
import { normalizeEvent } from "normalize/normalizers/normalizeEvent";
import { normalizePerson } from "normalize/normalizers/normalizePerson";
import { normalizeUser } from "normalize/normalizers/normalizeUser";
import { Blanks, Cache, Normalized, Normalizer } from "types";
import { initNormalized } from "./initNormalized";

const { api, core, hydra } = namespaces;

const mapNormalizer = (type: undefined | string): Normalizer => {
  switch (type) {
    case hydra.Collection:
      return normalizeCollection;
    case core.person:
      return normalizePerson;
    case core.event:
      return normalizeEvent;
    case core.date:
      return normalizeDate;
    case api.user:
      return normalizeUser;
    default:
      console.info(`Normalizer for type '${type}' not implemented.`);
      return () => undefined;
  }
};

export const normalizeNode = (
  node: NodeObject,
  cache: Cache,
  blanks: Blanks
): undefined | Normalized => {
  const normalized = initNormalized(node, blanks);
  if (!normalized) {
    return;
  }
  for (let i = 0, length = normalized?.types?.length || 0; i < length; i++) {
    const normalizer = mapNormalizer(normalized.types?.[i]);
    normalizer(node, normalized, cache, blanks);
  }
  const original = (cache[normalized.idLocal] || {}) as Normalized;
  cache[normalized.idLocal] = { ...original, ...normalized };
  return normalized;
};
