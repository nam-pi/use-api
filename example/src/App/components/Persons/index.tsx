import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { usePersons } from "nampi-use-api/bundle";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { serializeEventDates } from "../../utils/serializeEventDates";
import { serializeLabels } from "../../utils/serializeLabels";
import { Heading } from "../Heading";
import { Icon } from "../Icon";
import { Input } from "../Input";
import { ItemNav } from "../ItemNav";
import { LoadingPlaceholder } from "../LoadingPlaceholder";

export const Persons = () => {
  const [text, setText] = useState<string>("");
  const { initialized, loading, data, nav, page, total } = usePersons({
    query: { orderBy: "label", text },
  });
  return (
    <div>
      <Heading>Persons{total !== undefined ? ` (${total})` : ""}</Heading>
      <div className="my-4">
        <Icon icon={faSearch} />
        <Input
          className="ml-2"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        ></Input>
      </div>
      <ItemNav
        className="my-4"
        disabled={!initialized || loading}
        nav={nav}
        page={page}
      />
      {!initialized || loading ? (
        <LoadingPlaceholder />
      ) : data ? (
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
      ) : (
        "No persons found"
      )}
    </div>
  );
};
