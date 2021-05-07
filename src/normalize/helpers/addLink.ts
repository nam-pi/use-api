import { Blanks, Normalized } from "types";
import { isBlank } from "./isBlank";

export const addLink = (
  normalized: Normalized,
  property: string,
  link: undefined | string,
  blanks: Blanks
): void => {
  if (link) {
    normalized.links[property] = isBlank(link) ? blanks[link] : link;
  }
};
