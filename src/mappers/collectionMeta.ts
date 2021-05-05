import { hydra } from "@hydra-cg/heracles.ts";
import { CollectionMeta, FetchMapper } from "types";
import { jsonPath } from "utils/jsonPath";

export const collectionMeta: FetchMapper<CollectionMeta> = (json) => {
  return {
    members: jsonPath<undefined | Record<string, unknown>[]>(
      json,
      `$[0]['${hydra.member}']`
    ),
    viewIri: jsonPath<string>(json, `$[0]['${hydra.view}'][0].id`),
    first: jsonPath<undefined | string>(
      json,
      `$[0]['${hydra.view}'][0]['${hydra.first}'][0].value`
    ),
    previous: jsonPath<undefined | string>(
      json,
      `$[0]['${hydra.view}'][0]['${hydra.previous}'][0].value`
    ),
    next: jsonPath<undefined | string>(
      json,
      `$[0]['${hydra.view}'][0]['${hydra.next}'][0].value`
    ),
    last: jsonPath<undefined | string>(
      json,
      `$[0]['${hydra.view}'][0]['${hydra.last}'][0].value`
    ),
    total: jsonPath<number>(json, `$[0]['${hydra.totalItems}'][0].value`),
  };
};
