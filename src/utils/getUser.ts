import { JSONPathJson, Namespaces, User } from "types";
import { getLocalId } from "./getLocalId";
import { jsonPath } from "./jsonPath";

export const getUser = (json: JSONPathJson, namespaces: Namespaces): User => {
  const email = jsonPath<string>(
    json,
    `$[0]['${namespaces.schema.email}'][0].value`
  );
  const familyName = jsonPath<undefined | string>(
    json,
    `$[0]['${namespaces.schema.familyName}'][0].value`
  );
  const givenName = jsonPath<undefined | string>(
    json,
    `$[0]['${namespaces.schema.givenName}'][0].value`
  );
  const idLocal = jsonPath<string>(
    json,
    `$[0]['${namespaces.schema.identifier}'][0].value`
  );
  const username = jsonPath<string>(
    json,
    `$[0]['${namespaces.schema.name}'][0].value`
  );
  const idAuthor = jsonPath<undefined | string>(
    json,
    `$[0]['${namespaces.schema.sameAs}'][0].id`
  );
  const idAuthorLocal = idAuthor ? getLocalId(idAuthor) : undefined;
  return {
    email,
    familyName,
    givenName,
    idAuthor,
    idAuthorLocal,
    idLocal,
    username,
  };
};
