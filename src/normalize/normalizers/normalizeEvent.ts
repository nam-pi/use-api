import { namespaces } from "namespaces";
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
};
