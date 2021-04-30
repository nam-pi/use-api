const LOCAL_ID_REGEX = /^.+\/(?<id>.+)$/;

export const getLocalId = (iri: string): string => {
  const match = iri.match(LOCAL_ID_REGEX);
  const idLocal = match?.groups?.id;
  if (!idLocal) {
    throw new Error(`Could not extract idLocal from iri '${iri}'`);
  }
  return idLocal;
};
