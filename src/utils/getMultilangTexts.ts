import { JSONPathJson, MultilangText } from "types";
import { jsonPath } from "./jsonPath";

export const getMultilangTexts = (json: JSONPathJson): MultilangText[] => {
  const results: MultilangText[] = [];
  const data = Array.isArray(json) ? json : [json];
  for (let i = 0, length = data.length; i < length; i++) {
    const value = jsonPath<undefined | string>(data[i], "$.value");
    const language = jsonPath<undefined | string>(data[i], "$.language");
    if (value !== undefined) {
      results.push({ value, language });
    }
  }
  return results;
};
