import { FetchMapper } from "types";

const LOCAL_ID_REGEX = /^.+\/(?<id>.+)$/;

export const idLocal: FetchMapper<undefined | string> = (iri) => {
  const match = (typeof iri === "string" ? iri : "").match(LOCAL_ID_REGEX);
  return match?.groups?.id;
};
