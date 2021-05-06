import { FetchMapper, MultilangText } from "types";
import { jsonPath } from "../utils/jsonPath";

export const multilangTexts: FetchMapper<MultilangText[]> = (json) => {
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
