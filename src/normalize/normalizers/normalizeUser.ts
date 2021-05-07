import { namespaces } from "namespaces";
import { MaybeNodes, Normalizer } from "types";
import { addValue } from "../helpers/addValue";
import { getIdLocal } from "../helpers/getIdLocal";

const { schema } = namespaces;

export const normalizeUser: Normalizer = (node, normalized) => {
  addValue(node, normalized, schema.email, "email");
  addValue(node, normalized, schema.familyName, "familyName");
  addValue(node, normalized, schema.givenName, "givenName");
  addValue(node, normalized, schema.identifier, "identifier");
  addValue(node, normalized, schema.name, "username");
  const authorNode = node[schema.sameAs] as MaybeNodes;
  if (authorNode) {
    const idAuthor = authorNode[0]["@id"] as string;
    normalized.idAuthor = idAuthor;
    normalized.idAuthorLocal = getIdLocal(idAuthor);
  }
};
