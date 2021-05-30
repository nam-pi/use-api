import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Hierarchy } from "nampi-use-api/bundle";
import { serializeLabels } from "../../utils/serializeLabels";
import { Icon } from "../Icon";

export const InheritancePath = ({
  path,
  allItems,
}: {
  path: string[];
  allItems: Hierarchy["items"];
}) => (
  <>
    {path.map((item, idx) => (
      <div key={item} className="inline-block align-middle text-sm">
        <span>{serializeLabels(allItems[item])}</span>
        {idx < path.length - 1 ? (
          <Icon className="text-xs mx-2 text-gray-500" icon={faCaretRight} />
        ) : (
          ""
        )}
      </div>
    ))}
  </>
);
