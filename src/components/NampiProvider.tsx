import HydraClientFactory from "@hydra-cg/heracles.ts";
import Keycloak from "keycloak-js";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { NampiConfig } from "types";
import { callFacility } from "utils/callFacility";
import { namespaces } from "./namespaces";
import { NampiContext } from "./NampiContext";

export const NampiProvider = ({
  children,
  api,
  auth,
  client,
  realm,
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
    const initialize = async () => {
      await keycloak.init({
        checkLoginIframe: false,
        onLoad: "login-required",
      });
      setInitialized(true);
    };
    initialize();
  }, [keycloak]);
  const hydra = useMemo(
    () =>
      HydraClientFactory.configure()
        .withDefaults()
        .with(callFacility(keycloak))
        .andCreate(),
    [keycloak]
  );
  return (
    <NampiContext.Provider
      value={{
        apiUrl: api,
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
