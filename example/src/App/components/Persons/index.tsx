import { usePersons } from "nampi-use-api/bundle";
import { Link } from "react-router-dom";
import { serializeEventDates } from "../../utils/serializeEventDates";
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
            const label = serializeLabels(m);
            const born = serializeEventDates(m.bornIn, "Y");
            return (
              <li key={m.idLocal}>
                <Link to={"person/" + m.idLocal} className="text-gray-800">
                  {label + (born ? ` (${born})` : "")}
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
