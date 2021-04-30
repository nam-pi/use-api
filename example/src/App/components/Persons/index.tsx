import { usePersons } from "nampi-use-api/bundle";
import { Link } from "react-router-dom";
import { serializeLabels } from "../../utils/serializeLabels";
import { Heading } from "../Heading";
import { LoadingPlaceholder } from "../LoadingPlaceholder";

export const Persons = () => {
  const { initialized, loading, data } = usePersons();
  return initialized ? (
    <div>
      <Heading>Persons{!loading && data ? ` (${data.total})` : ""}</Heading>
      {loading || !data ? (
        <LoadingPlaceholder />
      ) : (
        <ul className="my-4">
          {data.members.map((m) => {
            const dateLabel = (m.bornIn || [])
              .map(({ date: d }) => {
                const dString = d.exact
                  ? d.exact.getFullYear()
                  : d.earliest && d.latest
                  ? `${d.earliest.getFullYear()} - ${d.latest.getFullYear()}`
                  : d.earliest
                  ? d.earliest.getFullYear()
                  : d.latest
                  ? d.latest.getFullYear()
                  : "";
                return dString ? ` (${dString})` : "";
              })
              .join(",");
            return (
              <li>
                <Link to={"person/" + m.idLocal} className="text-gray-800">
                  {serializeLabels(m) + dateLabel}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  ) : (
    <LoadingPlaceholder />
  );
};
