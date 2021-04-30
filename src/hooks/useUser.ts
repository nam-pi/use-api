import { useCallback } from "react";
import { buildPath } from "utils/buildPath";
import { getLocalId } from "utils/getLocalId";
import { jsonPath } from "utils/jsonPath";
import { FetchFunction, FetchResult, User } from "../types";
import { useFetch } from "./useFetch";
import { useNampiContext } from "./useNampiContext";

export const useUser = (): FetchResult<User> => {
  const { apiUrl, namespaces } = useNampiContext();
  const fetch = useCallback<FetchFunction<User>>(
    async (json) => {
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
    },
    [namespaces]
  );
  return useFetch<User>(buildPath(apiUrl, "user"), fetch);
};
