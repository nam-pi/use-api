import { rdfs } from "@hydra-cg/heracles.ts";
import { JSONPathJson, Namespaces, User } from "types";
import { jsonPath } from "../utils/jsonPath";
import { idLocal as mapIdLocal } from "./idLocal";
import { multilangTexts } from "./multilangTexts";

export const user = (json: JSONPathJson, namespaces: Namespaces): User => {
  const labels = multilangTexts(jsonPath(json, `$['${rdfs.label}'][0]`));
  const types = jsonPath<string[]>(json, "$.type");
  const email = jsonPath<string>(
    json,
    `$['${namespaces.schema.email}'][0].value`
  );
  const familyName = jsonPath<undefined | string>(
    json,
    `$['${namespaces.schema.familyName}'][0].value`
  );
  const givenName = jsonPath<undefined | string>(
    json,
    `$['${namespaces.schema.givenName}'][0].value`
  );
  const idLocal = jsonPath<string>(
    json,
    `$['${namespaces.schema.identifier}'][0].value`
  );
  const username = jsonPath<string>(
    json,
    `$['${namespaces.schema.name}'][0].value`
  );
  const idAuthor = jsonPath<undefined | string>(
    json,
    `$['${namespaces.schema.sameAs}'][0].id`
  );
  const idAuthorLocal = idAuthor ? mapIdLocal(idAuthor) : undefined;
  return {
    email,
    familyName,
    givenName,
    idAuthor,
    idAuthorLocal,
    idLocal,
    labels,
    types,
    username,
  };
};
