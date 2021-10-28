import Keycloak from "keycloak-js";
import { ReactNode, useEffect, useMemo, useState } from "react";
import {
    DEFAULT_CONTEXT_STATE,
    DEFAULT_LIMIT,
    DEFAULT_PROPERTY_MAP,
    DEFAULT_SEARCH_TIMEOUT,
    MIN_TOKEN_VALIDITY
} from "../constants";
import {
    ContextState,
    InversePropertyMap,
    PropertyMap,
    ProviderConfig
} from "../types";
import { deepMerge } from "../utils/deepMerge";
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
  const fullPropertyMap = useMemo(
    () => deepMerge(propertyMap || {}, DEFAULT_PROPERTY_MAP),
    [propertyMap]
  );
  const [state, setState] = useState<ContextState>({
    ...DEFAULT_CONTEXT_STATE,
    apiUrl: api,
    defaultLimit,
    searchTimeout,
    propertyMap: fullPropertyMap,
    inversePropertyMap: invertPropertyMap(fullPropertyMap),
  });
  useEffect(() => {
    if (!state.initialized) {
      if (auth && realm && client) {
        const keycloak = Keycloak({
          url: auth,
          realm: realm,
          clientId: client,
        });
        keycloak.onTokenExpired = () => {
          keycloak.updateToken(MIN_TOKEN_VALIDITY).catch(console.log);
        };
        keycloak
          .init({
            checkLoginIframe: true,
            enableLogging,
            onLoad: sso ? "check-sso" : undefined,
            silentCheckSsoRedirectUri: silentSsoUri || undefined,
          })
          .then((authenticated) => {
            setState((old) => ({
              ...old,
              authenticated,
              initialized: true,
              keycloak,
            }));
          })
          .catch(console.log);
      } else {
        setState((old) => ({ ...old, initialized: true }));
      }
    }
  }, [
    auth,
    client,
    enableLogging,
    realm,
    silentSsoUri,
    sso,
    state.initialized,
  ]);
  return (
    <NampiContext.Provider value={state}>{children}</NampiContext.Provider>
  );
};
