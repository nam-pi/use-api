import { Blanks, Normalized } from "types";
import { isBlank } from "./isBlank";

export const addLinks = (
  normalized: Normalized,
  property: string,
  links: undefined | string | string[] = [],
  blanks: Blanks
): void => {
  if (typeof links === "string") {
    links = [links];
  }
  const all = (normalized.links[property] as string[]) || [];
  for (let i = 0, length = links.length; i < length; i++) {
    const link = isBlank(links[i]) ? blanks[links[i]] : links[i];
    if (!all.includes(link)) {
      all.push(link);
    }
  }
  normalized.links[property] = all;
};
