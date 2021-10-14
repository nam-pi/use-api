import { Item, useHierarchy } from "nampi-use-api/index";
import { serializeLabels } from "../../utils/serializeLabels";
import { Heading } from "../Heading";
import { InheritancePath } from "../InheritancePath";
import { Pre } from "../Pre";

interface Props {
  title: string;
  data: undefined | Item;
}

export const ItemPage = ({ data, title }: Props) => {
  const hierarchy = useHierarchy({
    paused: !data,
    query: { iri: data?.id || "" },
  });
  return data ? (
    <div>
      <Heading>{serializeLabels(data)}</Heading>
      <Heading level={2} className="mt-4 mb-2">
        Type relationships
      </Heading>
      {hierarchy.data ? (
        hierarchy.data.paths.map((path) => (
          <div key={JSON.stringify(path)}>
            <InheritancePath
              path={path}
              allItems={hierarchy.data?.items || {}}
            />
            <br />
          </div>
        ))
      ) : (
        <></>
      )}
      <Heading level={2} className="mt-4 mb-2">
        {title} data
      </Heading>
      <Pre>{data}</Pre>
    </div>
  ) : (
    <></>
  );
};
