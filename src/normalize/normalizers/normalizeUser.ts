import { namespaces } from "namespaces";
import { MaybeNodes, Normalizer } from "types";
import { addValue } from "../helpers/addValue";
import { getIdLocal } from "../helpers/getIdLocal";

const { core, schema } = namespaces;

export const normalizeUser: Normalizer = (node, normalized) => {
  addValue(node, normalized, schema.email.iri, "email");
  addValue(node, normalized, schema.familyName.iri, "familyName");
  addValue(node, normalized, schema.givenName.iri, "givenName");
  addValue(node, normalized, schema.identifier.iri, "identifier");
  addValue(node, normalized, schema.name.iri, "username");
  const authorNode = node[core.sameAs.iri] as MaybeNodes;
  if (authorNode) {
    const idAuthor = authorNode[0]["@id"] as string;
    normalized.idAuthor = idAuthor;
    normalized.idAuthorLocal = getIdLocal(idAuthor);
  }
};
