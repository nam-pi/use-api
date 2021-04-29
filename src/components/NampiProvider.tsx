import HydraClientFactory from "@hydra-cg/heracles.ts";
import Keycloak from "keycloak-js";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Config } from "types/types";
import { callFacility } from "utils/callFacility";
import { NampiContext } from "./NampiContext";

export const NampiProvider = ({
  children,
  api,
  auth,
  client,
  realm,
}: { children: ReactNode } & Config): JSX.Element => {
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
      await keycloak.init({ checkLoginIframe: false });
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
        hydra,
        initialized,
        keycloak,
      }}
    >
      {children}
    </NampiContext.Provider>
  );
};
