import { buildPath } from "utils/buildPath";

export const namespaces = (apiUrl: string) => {
  const coreBase = "https://purl.org/nampi/owl/core#";
  const docBase = buildPath(apiUrl, "doc") + "#";
  const schemaOrgBase = "https://schema.org/";

  const core = {
    diesIn: `${coreBase}dies_in`,
    isBornIn: `${coreBase}is_born_in`,
    takesPlaceNotLaterThan: `${coreBase}takes_place_not_later_than`,
    takesPlaceNotEarlierThan: `${coreBase}takes_place_not_earlier_than`,
    takesPlaceOn: `${coreBase}takes_place_on`,
    hasSortingDate: `${coreBase}has_sorting_date`,
    hasXsdDateTime: `${coreBase}has_xsd_date_time`,
  };

  const doc = {
    personOrderByVariable: `${docBase}personOrderByVariable`,
    textVariable: `${docBase}textVariable`,
  };

  const schema = {
    email: `${schemaOrgBase}email`,
    name: `${schemaOrgBase}name`,
    givenName: `${schemaOrgBase}givenName`,
    familyName: `${schemaOrgBase}familyName`,
    identifier: `${schemaOrgBase}identifier`,
    sameAs: `${schemaOrgBase}sameAs`,
  };
  return {
    core,
    doc,
    schema,
  };
};
