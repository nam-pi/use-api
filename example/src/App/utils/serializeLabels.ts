import { MultilangText } from "nampi-use-api/bundle";

export const serializeLabels = <
  T extends { labels?: undefined | MultilangText[] } = {
    labels?: undefined | MultilangText[];
  }
>(
  data: undefined | T
): string => (data?.labels ? data.labels.map((l) => l.value).join(", ") : "");
