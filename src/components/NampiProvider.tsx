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
    () =>
      Keycloak({
        url: auth,
        realm: realm,
        clientId: client,
      }),
    [auth, client, realm]
  );
  useEffect(() => {
    const config: KeycloakInitOptions = { checkLoginIframe: true };
    if (sso) {
      config.onLoad = "check-sso";
    }
    if (silentSsoUri) {
      config.silentCheckSsoRedirectUri = silentSsoUri;
    }
    const initialize = async () => {
      await keycloak.init(config);
      setInitialized(true);
    };
    initialize();
  }, [keycloak, silentSsoUri, sso]);
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
