const coreBase = "https://purl.org/nampi/owl/core#";
const apiBase = "https://purl.org/nampi/owl/api#";
const schemaOrgBase = "https://schema.org/";

export const namespaces = {
  core: {
    diesIn: `${coreBase}dies_in`,
    isBornIn: `${coreBase}is_born_in`,
    takesPlaceNotLaterThan: `${coreBase}takes_place_not_later_than`,
    takesPlaceNotEarlierThan: `${coreBase}takes_place_not_earlier_than`,
    takesPlaceOn: `${coreBase}takes_place_on`,
    hasSortingDate: `${coreBase}has_sorting_date`,
    hasXsdDateTime: `${coreBase}has_xsd_date_time`,
  },

  doc: {
    personOrderByVariable: `${apiBase}personOrderByVariable`,
    textVariable: `${apiBase}textVariable`,
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
