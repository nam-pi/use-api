const LOCAL_ID_REGEX = /^.+\/(?<id>.+)$/;

export const getLocalId = (iri = ""): undefined | string => {
  const match = iri.match(LOCAL_ID_REGEX);
  return match?.groups?.id;
};
