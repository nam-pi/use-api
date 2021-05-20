import { NodeObject } from "jsonld";
import { namespaces } from "namespaces";
import { Blanks, Cache, MultilangText, Normalized } from "types";
import { v4 as uuidv4 } from "uuid";
import { addLink } from "./addLink";
import { addLinks } from "./addLinks";
import { getId } from "./getId";
import { getIdLocal } from "./getIdLocal";
import { isBlank } from "./isBlank";
import { normalizeNode } from "./normalizeNode";

const { rdfs } = namespaces;

export const initNormalized = (
  node: NodeObject,
  cache: Cache,
  blanks: Blanks
): Normalized => {
  const normalized = { links: {} } as Normalized;
  const keys = Object.keys(node);
  for (let i = 0, length = keys.length; i < length; i++) {
    const key = keys[i];
    const value = node[key];
    if (value === null || value === undefined) {
      continue;
    }
    // Add types
    if (key === "@type") {
      normalized.types = (Array.isArray(value) ? value : [value]) as string[];
    }
    // Add id
    else if (key === "@id") {
      const id = getId(node);
      if (isBlank(id)) {
        const idLocal = blanks[id] ? blanks[id] : uuidv4();
        normalized.idLocal = idLocal;
        blanks[id] = idLocal;
      } else {
        normalized.id = id;
        normalized.idLocal = getIdLocal(id);
      }
    }
    // Add labels
    else if (rdfs.label.equals(key)) {
      if (Array.isArray(value)) {
        normalized.labels = (value as Record<
          string,
          unknown
        >[]).map<MultilangText>((l) => {
          const label: MultilangText = {
            value: l["@value"] as string,
          };
          const language = l["@language"] as undefined | string;
          if (language) {
            label.language = language;
          }
          return label;
        });
      }
    }
    // Add all properties by their iri
    else {
      if (Array.isArray(value)) {
        const links: string[] = [];
        for (let i = 0, length = value.length; i < length; i++) {
          const item = normalizeNode(value[i] as NodeObject, cache, blanks);
          if (item) {
            links.push(item.idLocal);
          }
        }
        addLinks(normalized, key, links, blanks);
      } else {
        const item = normalizeNode(value as NodeObject, cache, blanks);
        if (item) {
          addLink(normalized, key, item.idLocal, blanks);
        }
      }
    }
  }
  return normalized;
};
