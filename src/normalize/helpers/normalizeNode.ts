import { NodeObject } from "jsonld";
import { namespaces } from "namespaces";
import { normalizeAspect } from "normalize/normalizers/normalizeAspect";
import { normalizeCollection } from "normalize/normalizers/normalizeCollection";
import { normalizeDate } from "normalize/normalizers/normalizeDate";
import { normalizeEvent } from "normalize/normalizers/normalizeEvent";
import { normalizePerson } from "normalize/normalizers/normalizePerson";
import { normalizePlace } from "normalize/normalizers/normalizePlace";
import { normalizeUser } from "normalize/normalizers/normalizeUser";
import { Blanks, Cache, Normalized, Normalizer } from "types";
import { initNormalized } from "./initNormalized";

const { api, core, hydra } = namespaces;

const mapNormalizer = (type: undefined | string): Normalizer => {
  switch (type) {
    case core.aspect.iri:
      return normalizeAspect;
    case hydra.Collection.iri:
      return normalizeCollection;
    case core.person.iri:
      return normalizePerson;
    case core.event.iri:
      return normalizeEvent;
    case core.date.iri:
      return normalizeDate;
    case core.place.iri:
      return normalizePlace;
    case api.user.iri:
      return normalizeUser;
    default:
      console.info(`Normalizer for type '${type}' not implemented.`);
      return () => undefined;
  }
};

export const normalizeNode = (
  node: NodeObject | null,
  cache: Cache,
  blanks: Blanks
): undefined | Normalized => {
  if (!node || typeof node !== "object" || !node["@id"]) {
    return;
  }
  const normalized = initNormalized(node, cache, blanks);
  for (let i = 0, length = normalized.types?.length || 0; i < length; i++) {
    const normalizer = mapNormalizer(normalized.types?.[i]);
    normalizer(node, normalized, cache, blanks);
  }
  const original = (cache[normalized.idLocal] || {}) as Normalized;
  cache[normalized.idLocal] = { ...original, ...normalized };
  return normalized;
};
