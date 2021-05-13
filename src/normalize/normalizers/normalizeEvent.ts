import { namespaces } from "namespaces";
import { addLinks } from "normalize/helpers/addLinks";
import { MaybeNodes, Normalizer } from "types";
import { addLink } from "../helpers/addLink";
import { normalizeNode } from "../helpers/normalizeNode";

const { core } = namespaces;

export const normalizeEvent: Normalizer = (node, normalized, cache, blanks) => {
  const exactNode = (node[core.takesPlaceOn] as MaybeNodes)?.[0];
  let exact;
  if (exactNode) {
    exact = normalizeNode(exactNode, cache, blanks);
    addLink(normalized, "exact", exact?.idLocal, blanks);
  }
  const earliestNode = (node[core.takesPlaceNotEarlierThan] as MaybeNodes)?.[0];
  let earliest;
  if (earliestNode) {
    earliest = normalizeNode(earliestNode, cache, blanks);
    addLink(normalized, "earliest", earliest?.idLocal, blanks);
  }
  let latest;
  const latestNode = (node[core.takesPlaceNotLaterThan] as MaybeNodes)?.[0];
  if (latestNode) {
    latest = normalizeNode(latestNode, cache, blanks);
    addLink(normalized, "latest", latest?.idLocal, blanks);
  }
  const sortNode = (node[core.hasSortingDate] as MaybeNodes)?.[0];
  if (sortNode) {
    const sort = normalizeNode(sortNode, cache, blanks);
    addLink(normalized, "sort", sort?.idLocal, blanks);
  } else if (exact || latest || earliest) {
    addLink(normalized, "sort", (exact || latest || earliest)?.idLocal, blanks);
  }
  const participantsNode = node[core.hasParticipant] as MaybeNodes;
  if (Array.isArray(participantsNode)) {
    const participants: string[] = [];
    for (let i = 0, length = participantsNode.length; i < length; i++) {
      const participant = normalizeNode(participantsNode[i], cache, blanks);
      if (participant) {
        participants.push(participant.idLocal);
      }
    }
    addLinks(normalized, "participants", participants, blanks);
  }
  const aspectsNode = node[core.usesAspect] as MaybeNodes;
  if (Array.isArray(aspectsNode)) {
    const aspects: string[] = [];
    for (let i = 0, length = aspectsNode.length; i < length; i++) {
      const aspect = normalizeNode(aspectsNode[i], cache, blanks);
      if (aspect) {
        aspects.push(aspect.idLocal);
      }
    }
    addLinks(normalized, "aspects", aspects, blanks);
  }
};
