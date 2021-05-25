import { Namespace, RDFResource } from "types";

export const API_IRI = "https://purl.org/nampi/owl/api#";
export const CORE_IRI = "https://purl.org/nampi/owl/core#";
export const HYDRA_IRI = "http://www.w3.org/ns/hydra/core#";
export const RDFS_IRI = "http://www.w3.org/2000/01/rdf-schema#";
export const SCHEMA_IRI = "https://schema.org/";
export const XSD_IRI = "http://www.w3.org/2001/XMLSchema#";

const resource = (namespace: string, localName: string): RDFResource => {
  const iri = namespace + localName;
  return {
    equals: (value) => value === iri,
    iri,
    localName,
  };
};

const api: Namespace = {
  iri: API_IRI,
  resource: (localName) => resource(API_IRI, localName),
};

const core: Namespace = {
  iri: CORE_IRI,
  resource: (localName) => resource(CORE_IRI, localName),
};

const hydra: Namespace = {
  iri: HYDRA_IRI,
  resource: (localName) => resource(HYDRA_IRI, localName),
};

const rdfs: Namespace = {
  iri: RDFS_IRI,
  resource: (localName) => resource(RDFS_IRI, localName),
};

const schema: Namespace = {
  iri: SCHEMA_IRI,
  resource: (localName) => resource(SCHEMA_IRI, localName),
};

const xsd: Namespace = {
  iri: XSD_IRI,
  resource: (localName) => resource(XSD_IRI, localName),
};

export const namespaces = {
  api: {
    eventOrderByVariable: api.resource("eventOrderByVariable"),
    eventParticipantVariable: api.resource("eventParticipantVariable"),
    personOrderByVariable: api.resource("personOrderByVariable"),
    textVariable: api.resource("textVariable"),
    user: api.resource("user"),
  },

  core: {
    act: core.resource("act"),
    aspect: core.resource("aspect"),
    author: core.resource("author"),
    date: core.resource("date"),
    diesIn: core.resource("dies_in"),
    event: core.resource("event"),
    group: core.resource("group"),
    hasDateTime: core.resource("has_date_time"),
    hasInterpretation: core.resource("has_interpretation"),
    hasMainParticipant: core.resource("has_main_participant"),
    hasParticipant: core.resource("has_participant"),
    hasSortingDate: core.resource("has_sorting_date"),
    hasSource: core.resource("has_source"),
    hasSourceLocation: core.resource("has_source_location"),
    hasText: core.resource("has_text"),
    isAuthoredBy: core.resource("is_authored_by"),
    isAuthoredOn: core.resource("is_authored_on"),
    isBornIn: core.resource("is_born_in"),
    isInterpretationOf: core.resource("is_interpretation_of"),
    person: core.resource("person"),
    place: core.resource("place"),
    sameAs: core.resource("same_as"),
    source: core.resource("source"),
    sourceLocation: core.resource("source_location"),
    takesPlaceAt: core.resource("takes_place_at"),
    takesPlaceNotEarlierThan: core.resource("takes_place_not_earlier_than"),
    takesPlaceNotLaterThan: core.resource("takes_place_not_later_than"),
    takesPlaceOn: core.resource("takes_place_on"),
    usesAspect: core.resource("uses_aspect"),
  },

  hydra: {
    Collection: hydra.resource("Collection"),
    member: hydra.resource("member"),
    view: hydra.resource("view"),
    first: hydra.resource("first"),
    previous: hydra.resource("previous"),
    next: hydra.resource("next"),
    last: hydra.resource("last"),
    totalItems: hydra.resource("totalItems"),
  },

  rdfs: {
    Class: rdfs.resource("Class"),
    comment: rdfs.resource("comment"),
    label: rdfs.resource("label"),
  },

  schema: {
    email: schema.resource("email"),
    name: schema.resource("name"),
    givenName: schema.resource("givenName"),
    familyName: schema.resource("familyName"),
    identifier: schema.resource("identifier"),
  },
  xsd: {
    dateTime: xsd.resource("dateTime"),
    integer: xsd.resource("integer"),
    string: xsd.resource("string"),
  },
};
