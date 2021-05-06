import { JSONPath } from "jsonpath-plus";
import { JSONPathJson } from "types";

export const jsonPath = <T extends undefined | JSONPathJson = JSONPathJson>(
  json: JSONPathJson,
  path: string
): T => JSONPath<T>({ path, json, wrap: false });
