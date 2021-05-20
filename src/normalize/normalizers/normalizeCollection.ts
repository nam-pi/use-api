import { NodeObject } from "jsonld";
import { namespaces } from "namespaces";
import { MaybeNodes, Normalizer } from "types";
import { addLinks } from "../helpers/addLinks";
import { normalizeNode } from "../helpers/normalizeNode";

const { hydra } = namespaces;

export const normalizeCollection: Normalizer = (
  node,
  normalized,
  cache,
  blanks
) => {
  const members = node[hydra.member.iri] || [];
  const membersArray = Array.isArray(members) ? members : [members];
  for (let i = 0, length = membersArray.length; i < length; i++) {
    const memberNode = membersArray[i] as NodeObject;
    const member = normalizeNode(memberNode as NodeObject, cache, blanks);
    addLinks(normalized, "members", member?.idLocal, blanks);
  }
  const view = node[hydra.view.iri] as MaybeNodes;
  if (view) {
    const first = view[0][hydra.first.iri] as MaybeNodes;
    if (first) {
      normalized.first = first[0]?.["@id"];
    }
    const previous = view[0][hydra.previous.iri] as MaybeNodes;
    if (previous) {
      normalized.previous = previous[0]?.["@id"];
    }
    const next = view[0][hydra.next.iri] as MaybeNodes;
    if (next) {
      normalized.next = next[0]?.["@id"];
    }
    const last = view[0][hydra.last.iri] as MaybeNodes;
    if (last) {
      normalized.last = last[0]?.["@id"];
    }
  }
  const total = node[hydra.totalItems.iri] as MaybeNodes;
  normalized.total = total ? total[0]?.["@value"] : 0;
};
