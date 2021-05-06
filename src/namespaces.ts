const apiBase = "https://purl.org/nampi/owl/api#";
const coreBase = "https://purl.org/nampi/owl/core#";
const hydra = "http://www.w3.org/ns/hydra/core#";
const rdfs = "http://www.w3.org/2000/01/rdf-schema#";
const schemaOrgBase = "https://schema.org/";

export const namespaces = {
  api: {
    eventOrderByVariable: `${apiBase}eventOrderByVariable`,
    eventParticipantVariable: `${apiBase}eventParticipantVariable`,
    personOrderByVariable: `${apiBase}personOrderByVariable`,
    textVariable: `${apiBase}textVariable`,
  },

  core: {
    diesIn: `${coreBase}dies_in`,
    hasParticipant: `${coreBase}has_participant`,
    isBornIn: `${coreBase}is_born_in`,
    takesPlaceNotLaterThan: `${coreBase}takes_place_not_later_than`,
    takesPlaceNotEarlierThan: `${coreBase}takes_place_not_earlier_than`,
    takesPlaceOn: `${coreBase}takes_place_on`,
    hasSortingDate: `${coreBase}has_sorting_date`,
    hasXsdDateTime: `${coreBase}has_xsd_date_time`,
  },

  hydra: {
    member: `${hydra}member`,
    view: `${hydra}view`,
    first: `${hydra}first`,
    previous: `${hydra}previous`,
    next: `${hydra}next`,
    last: `${hydra}last`,
    totalItems: `${hydra}totalItems`,
  },

  rdfs: {
    label: `${rdfs}label`,
  },

  schema: {
    email: `${schemaOrgBase}email`,
    name: `${schemaOrgBase}name`,
    givenName: `${schemaOrgBase}givenName`,
    familyName: `${schemaOrgBase}familyName`,
    identifier: `${schemaOrgBase}identifier`,
    sameAs: `${schemaOrgBase}sameAs`,
  },
};
