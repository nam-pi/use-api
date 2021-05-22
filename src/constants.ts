import { namespaces } from "namespaces";
import { PropertyMap } from "types";

const { api, core, hydra, rdfs, schema } = namespaces;

export const DEFAULT_PROPERTY_MAP: PropertyMap = {
  [api.user.iri]: {
    [core.sameAs.iri]: "author",
    [schema.email.iri]: "email",
    [schema.familyName.iri]: "familyName",
    [schema.givenName.iri]: "givenName",
    [schema.identifier.iri]: "identifier",
    [schema.name.iri]: "username",
    [rdfs.label.iri]: "labels",
  },
  [core.aspect.iri]: {
    [core.hasText.iri]: "text",
    [core.sameAs.iri]: "sameAs",
    [rdfs.label.iri]: "labels",
  },
  [core.event.iri]: {
    [core.hasMainParticipant.iri]: "mainParticipant",
    [core.hasParticipant.iri]: "participants",
    [core.hasSortingDate.iri]: "sort",
    [core.takesPlaceAt.iri]: "place",
    [core.takesPlaceNotEarlierThan.iri]: "earliest",
    [core.takesPlaceNotLaterThan.iri]: "latest",
    [core.takesPlaceOn.iri]: "exact",
    [core.usesAspect.iri]: "aspects",
    [rdfs.label.iri]: "labels",
  },
  [core.place.iri]: {
    [core.sameAs.iri]: "sameAs",
    [rdfs.label.iri]: "labels",
  },
  [core.person.iri]: {
    [core.diesIn.iri]: "diesIn",
    [core.isBornIn.iri]: "bornIn",
    [core.sameAs.iri]: "sameAs",
    [rdfs.label.iri]: "labels",
  },
  [hydra.Collection.iri]: {
    [hydra.member.iri]: "members",
    [hydra.totalItems.iri]: "total",
  },
};

export const DEFAULT_SEARCH_TIMEOUT = 200;
