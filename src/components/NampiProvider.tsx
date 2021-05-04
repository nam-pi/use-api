import HydraClientFactory from "@hydra-cg/heracles.ts";
import Keycloak, { KeycloakInitOptions } from "keycloak-js";
import { namespaces } from "namespaces";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { NampiConfig } from "types";
import { callFacility } from "utils/callFacility";
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
  const hydra = useMemo(
    () =>
      HydraClientFactory.configure()
        .withDefaults()
        .with(callFacility(keycloak))
        .andCreate(),
    [keycloak]
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
        hydra,
        initialized,
        keycloak,
        namespaces: namespaces(api),
      }}
    >
      {children}
    </NampiContext.Provider>
  );
};
