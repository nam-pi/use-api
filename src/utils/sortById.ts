import { Item, SortFunction } from "types";

export const sortById: SortFunction<Item> = (a, b) => {
  const idA = a.id;
  const idB = b.id;
  return idA < idB ? -1 : idA > idB ? 1 : 0;
};
