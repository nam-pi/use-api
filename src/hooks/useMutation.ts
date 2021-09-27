import { expand } from "jsonld";
import { JsonLdArray } from "jsonld/jsonld-spec";
import { normalize } from "normalize";
import { useCallback, useMemo, useState } from "react";
import {
    MutationConfig,
    MutationHook,
    MutationPayload,
    NampiError
} from "types";
import { buildPath } from "utils/buildPath";
import { namespaces } from "../namespaces";
import { useNampiContext } from "./useNampiContext";

export const useMutation = <PayloadType extends MutationPayload, ResponseType>(
  config: MutationConfig
): ReturnType<MutationHook<PayloadType, ResponseType>> => {
  const [state, setState] = useState<
    Omit<ReturnType<MutationHook<PayloadType, ResponseType>>, "mutate">
  >({ loading: false });
  const { apiUrl, keycloak, propertyMap } = useNampiContext();
  const defaultConfig = useMemo<RequestInit>(
    () => ({
      headers: {
        Accept: "application/ld+json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${keycloak.token}`,
      },
    }),
    [keycloak.token]
  );
  const url =
    config.action === "create"
      ? buildPath(apiUrl, "events")
      : buildPath(apiUrl, "events", config.idLocal);
  const mapResult = useCallback(
    async (expanded: JsonLdArray) => {
      return (await normalize(expanded, propertyMap)) as unknown as
        | ResponseType
        | NampiError;
    },
    [propertyMap]
  );
  const toFormData = useCallback(
    (data: Record<string, string | string[]>): string => {
      const formData: string[] = [];
      Object.entries(data).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        if (Array.isArray(value)) {
          value.forEach((v) => {
            if (v) {
              formData.push(`${key}%5B%5D=${encodeURIComponent(v)}`);
            }
          });
        } else {
          formData.push(`${key}=${encodeURIComponent(value)}`);
        }
      });
      return formData.join("&");
    },
    []
  );
  const doFetch = useCallback(
    (url, method: "POST" | "PUT" | "DELETE", payload?: PayloadType) =>
      keycloak
        .updateToken(30)
        .then(() => setState((old) => ({ ...old, loading: true })))
        .then(() =>
          fetch(url, {
            ...defaultConfig,
            method,
            body: payload && toFormData(payload),
          })
        )
        .then((response) => response.json())
        .then(expand)
        .then(mapResult)
        .then((result) => {
          if (
            (result as unknown as NampiError).types.includes(
              namespaces.hydra.Status.iri
            )
          ) {
            const error = result as unknown as NampiError;
            delete (error as unknown as { idLocal?: string }).idLocal;
            setState({ loading: false, error });
            return { error };
          } else {
            const data = result as ResponseType;
            setState({ loading: false, data });
            return { data };
          }
        })
        .catch((e) => {
          console.log(e);
          setState({ loading: false });
          return {};
        }),
    [defaultConfig, keycloak, mapResult, toFormData]
  );
  const handleCreate = useCallback(
    (payload: PayloadType) => doFetch(url, "POST", payload),
    [doFetch, url]
  );
  const handleUpdate = useCallback(
    (payload: PayloadType) => doFetch(url, "PUT", payload),
    [doFetch, url]
  );
  const handleDelete = useCallback(
    () => doFetch(url, "DELETE"),
    [doFetch, url]
  );
  const mutate =
    config.action === "create"
      ? handleCreate
      : config.action == "update"
      ? handleUpdate
      : handleDelete;
  return { mutate, ...state };
};
