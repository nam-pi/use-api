const LOCAL_ID_REGEX = /^.+\/(?<id>.+)$/;

export const idLocal = (iri = ""): undefined | string => {
  const match = iri.match(LOCAL_ID_REGEX);
  return match?.groups?.id;
};
