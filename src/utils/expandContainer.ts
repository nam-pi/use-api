import { IHypermediaContainer } from "@hydra-cg/heracles.ts";
import { expand } from "jsonld";
import { JSONPathJson } from "types";

const REPLACE_REGEX = /@(id|type|language|value)/g;

export const expandContainer = async (
  container: IHypermediaContainer
): Promise<JSONPathJson> => {
  const json = (await expand(await container.json())) as unknown;
  return JSON.parse(JSON.stringify(json).replace(REPLACE_REGEX, "$1"));
};
