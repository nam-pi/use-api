import { useCallback, useEffect, useState } from "react";
import { buildPath } from "utils/buildPath";
import { expandContainer } from "utils/expandContainer";
import { getLocalId } from "utils/getLocalId";
import { jsonPath } from "utils/jsonPath";
import { FetchResult, Profile } from "../types";
import { useNampiContext } from "./useNampiContext";

export const useProfile = (): FetchResult<Profile> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<undefined | Profile>();
  const { initialized, apiUrl, hydra, namespaces } = useNampiContext();
  const fetch = useCallback(async () => {
    setLoading(true);
    await hydra
      .getResource(buildPath(apiUrl, "user"))
      .then(async (data) => {
        const json = await expandContainer(data);
        const path = <T>(path: string) => jsonPath<T>(json, path);
        const email = path<string>(
          `$[0].['${namespaces.schema.email}'][0].value`
        );
        const familyName = path<undefined | string>(
          `$[0].['${namespaces.schema.familyName}'][0].value`
        );
        const givenName = path<undefined | string>(
          `$[0].['${namespaces.schema.givenName}'][0].value`
        );
        const idLocal = path<string>(
          `$[0].['${namespaces.schema.identifier}'][0].value`
        );
        const username = path<string>(
          `$[0].['${namespaces.schema.name}'][0].value`
        );
        const idAuthor = path<undefined | string>(
          `$[0].['${namespaces.schema.sameAs}'][0].id`
        );
        const idAuthorLocal = getLocalId(idAuthor);
        setProfile({
          email,
          familyName,
          givenName,
          idLocal,
          username,
          idAuthor,
          idAuthorLocal,
        });
      })
      .catch((e) => {
        if (e.message === "Remote server responded with a status of 401") {
          console.log("User not logged in");
        } else {
          console.log(e);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiUrl, hydra, namespaces]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  return { initialized, loading, data: profile };
};
