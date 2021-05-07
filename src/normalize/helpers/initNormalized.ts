import { NodeObject } from "jsonld";
import { namespaces } from "namespaces";
import { Blanks, MultilangText, Normalized } from "types";
import { v4 as uuidv4 } from "uuid";
import { getId } from "./getId";
import { getIdLocal } from "./getIdLocal";
import { isBlank } from "./isBlank";

const { rdfs } = namespaces;

export const initNormalized = (
  node: NodeObject,
  blanks: Blanks
): undefined | Normalized => {
  const normalized = { links: {} } as Normalized;
  const typesCandidate = node?.["@type"];
  if (typesCandidate) {
    normalized.types = Array.isArray(typesCandidate)
      ? typesCandidate
      : [typesCandidate];
  }
  const id = getId(node);
  if (isBlank(id)) {
    const idLocal = blanks[id] ? blanks[id] : uuidv4();
    normalized.idLocal = idLocal;
    blanks[id] = idLocal;
  } else {
    normalized.id = id;
    normalized.idLocal = getIdLocal(id);
  }
  const labels = node[rdfs.label];
  if (Array.isArray(labels)) {
    normalized.labels = (labels as Record<
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
  return normalized;
};
