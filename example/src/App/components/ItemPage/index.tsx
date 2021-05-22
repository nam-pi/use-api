import { Item } from "nampi-use-api/bundle";
import React from "react";
import { serializeLabels } from "../../utils/serializeLabels";
import { Heading } from "../Heading";
import { Pre } from "../Pre";

interface Props {
  title: string;
  data: undefined | Item;
}

export const ItemPage = ({ data, title }: Props) =>
  data ? (
    <div>
      <Heading>{serializeLabels(data)}</Heading>
      <Heading className="mt-4 mb-2" level={2}>
        {title} data
      </Heading>
      <Pre>{data}</Pre>
    </div>
  ) : (
    <></>
  );
