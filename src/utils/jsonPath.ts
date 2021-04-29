import { JSONPath } from "jsonpath-plus";
import { JSONPathJson } from "types";

export const jsonPath = <T extends unknown>(
  json: JSONPathJson,
  path: string
): T => JSONPath({ path, json, wrap: false });
