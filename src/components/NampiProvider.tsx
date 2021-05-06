import Keycloak, { KeycloakInitOptions } from "keycloak-js";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { NampiConfig } from "types";
import { DEFAULT_SEARCH_TIMEOUT } from "../constants";
import { NampiContext } from "./NampiContext";

export const NampiProvider = ({
  children,
  api,
  auth,
  client,
  searchTimeout = DEFAULT_SEARCH_TIMEOUT,
  realm,
  silentSsoUri,
  sso,
}: { children: ReactNode } & NampiConfig): JSX.Element => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const keycloak = useMemo(
    () => Keycloak({ url: auth, realm: realm || "", clientId: client || "" }),
    [auth, client, realm]
  );
  useEffect(() => {
    const initialize = async () => {
      if (auth && realm && client) {
        const config: KeycloakInitOptions = { checkLoginIframe: true };
        if (sso) {
          config.onLoad = "check-sso";
        }
        if (silentSsoUri) {
          config.silentCheckSsoRedirectUri = silentSsoUri;
        }
        await keycloak.init(config);
      } else {
        // Define fallback values in case the keycloak data is not provided in the props
        keycloak.authenticated = false;
        keycloak.login = (async () => {
          throw new Error("No Keycloak realm and client provided.");
        }) as never;
        keycloak.logout = (async () => {
          throw new Error("No Keycloak realm and client provided.");
        }) as never;
      }
      setInitialized(true);
    };
    initialize();
  }, [auth, client, keycloak, realm, silentSsoUri, sso]);
  return (
    <NampiContext.Provider
      value={{
        apiUrl: api,
        searchTimeout,
        initialized,
        keycloak,
      }}
    >
      {children}
    </NampiContext.Provider>
  );
};
