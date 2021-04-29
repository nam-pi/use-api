import { useCallback } from "react";
import { buildPath } from "utils/buildPath";
import { getLocalId } from "utils/getLocalId";
import { FetchFunction, FetchResult, Profile } from "../types";
import { useFetch } from "./useFetch";
import { useNampiContext } from "./useNampiContext";

export const useProfile = (): FetchResult<Profile> => {
  const { apiUrl, namespaces } = useNampiContext();
  const fetch = useCallback<FetchFunction<Profile>>(
    async (path) => {
      const email = path<string>(`$[0]['${namespaces.schema.email}'][0].value`);
      const familyName = path<undefined | string>(
        `$[0]['${namespaces.schema.familyName}'][0].value`
      );
      const givenName = path<undefined | string>(
        `$[0]['${namespaces.schema.givenName}'][0].value`
      );
      const idLocal = path<string>(
        `$[0]['${namespaces.schema.identifier}'][0].value`
      );
      const username = path<string>(
        `$[0]['${namespaces.schema.name}'][0].value`
      );
      const idAuthor = path<undefined | string>(
        `$[0]['${namespaces.schema.sameAs}'][0].id`
      );
      const idAuthorLocal = getLocalId(idAuthor);
      return {
        email,
        familyName,
        givenName,
        idLocal,
        username,
        idAuthor,
        idAuthorLocal,
      };
    },
    [namespaces]
  );
  return useFetch<Profile>(buildPath(apiUrl, "user"), fetch);
};
