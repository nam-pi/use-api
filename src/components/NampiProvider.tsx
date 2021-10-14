import Keycloak, { KeycloakInitOptions, KeycloakInstance } from "keycloak-js";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
    ContextState,
    InversePropertyMap,
    PropertyMap,
    ProviderConfig
} from "types";
import { deepMerge } from "utils/deepMerge";
import {
    DEFAULT_LIMIT,
    DEFAULT_PROPERTY_MAP,
    DEFAULT_SEARCH_TIMEOUT
} from "../constants";
import { NampiContext } from "./NampiContext";

const invertPropertyMap = (propertyMap: PropertyMap): InversePropertyMap => {
  const inverse: InversePropertyMap = {};
  for (const itemIri in propertyMap) {
    const properties = propertyMap[itemIri];
    const itemData: { [shortKey: string]: string } = {};
    for (const propertyIri in properties) {
      const shortKey = properties[propertyIri];
      itemData[shortKey] = propertyIri;
    }
    inverse[itemIri] = itemData;
  }
  return inverse;
};

export const NampiProvider = ({
  children,
  api,
  auth,
  authLogging: enableLogging = false,
  client,
  defaultLimit = DEFAULT_LIMIT,
  propertyMap,
  searchTimeout = DEFAULT_SEARCH_TIMEOUT,
  realm,
  silentSsoUri,
  sso,
}: { children: ReactNode } & ProviderConfig): JSX.Element => {
  const keycloak = useRef<KeycloakInstance>(
    Keycloak({
      url: auth,
      realm: realm || "",
      clientId: client || "",
    })
  );
  const fullPropertyMap = useMemo(
    () => deepMerge(propertyMap || {}, DEFAULT_PROPERTY_MAP),
    [propertyMap]
  );
  const [state, setState] = useState<ContextState>({
    apiUrl: api,
    defaultLimit,
    initialized: false,
    inversePropertyMap: invertPropertyMap(fullPropertyMap),
    authenticated: false,
    login: () => {
      throw new Error("No Keycloak realm and client provided.");
    },
    logout: () => {
      throw new Error("No Keycloak realm and client provided.");
    },
    propertyMap: fullPropertyMap,
    searchTimeout,
    token: undefined,
    updateToken: () => {
      throw new Error("No Keycloak realm and client provided.");
    },
  });
  useEffect(() => {
    if (auth && realm && client) {
      keycloak.current = Keycloak({
        url: auth,
        realm: realm,
        clientId: client,
      });
      const config: KeycloakInitOptions = {
        checkLoginIframe: true,
        enableLogging,
        onLoad: sso ? "check-sso" : undefined,
        silentCheckSsoRedirectUri: silentSsoUri || undefined,
      };
      keycloak.current
        .init(config)
        .then((authenticated) => {
          setState((old) => ({
            ...old,
            login: keycloak.current.login,
            logout: keycloak.current.logout,
            authenticated,
            initialized: true,
            updateToken: keycloak.current.updateToken,
            token: keycloak.current.token,
          }));
        })
        .catch(console.log);
    } else {
      setState((old) => ({ ...old, initialized: true }));
    }
  }, [auth, client, enableLogging, realm, silentSsoUri, sso]);
  return (
    <NampiContext.Provider value={state}>{children}</NampiContext.Provider>
  );
};
