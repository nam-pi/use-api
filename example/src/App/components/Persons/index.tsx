import { usePersons } from "nampi-use-api/bundle";
import React from "react";
import { Link } from "react-router-dom";
import { serializeEventDates } from "../../utils/serializeEventDates";
import { serializeLabels } from "../../utils/serializeLabels";
import { Heading } from "../Heading";
import { ItemNav } from "../ItemNav";
import { LoadingPlaceholder } from "../LoadingPlaceholder";

export const Persons = () => {
  const { initialized, loading, data, nav, total } = usePersons();
  return initialized ? (
    <div>
      <Heading>Persons{total !== undefined ? ` (${total})` : ""}</Heading>
      <ItemNav className="my-4" disabled={!initialized || loading} nav={nav} />
      {!data ? (
        <LoadingPlaceholder />
      ) : (
        <ul>
          {data.map((person) => {
            const label = serializeLabels(person);
            const born = serializeEventDates(person.bornIn, "Y");
            return (
              <li key={person.idLocal}>
                <Link to={"person/" + person.idLocal} className="text-gray-800">
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
