import { namespaces } from "namespaces";
import { makeSingle } from "normalize/helpers/transforms";
import { MaybeNodes, Normalizer, RDFResource } from "types";

const { schema } = namespaces;

export const normalizeUser: Normalizer = async (node, normalized) => {
  const addValue = (property: RDFResource, name: string): void => {
    const value = (node[property.iri] as MaybeNodes)?.[0]?.["@value"];
    if (value) {
      normalized[name] = value;
    }
  };
  addValue(schema.email, "email");
  addValue(schema.familyName, "familyName");
  addValue(schema.givenName, "givenName");
  addValue(schema.identifier, "identifier");
  addValue(schema.name, "username");
  makeSingle(normalized, "author");
};
