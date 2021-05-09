import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEvents } from "nampi-use-api/bundle";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { serializeEventDates } from "../../utils/serializeEventDates";
import { serializeLabels } from "../../utils/serializeLabels";
import { Heading } from "../Heading";
import { Icon } from "../Icon";
import { Input } from "../Input";
import { ItemNav } from "../ItemNav";
import { LoadingPlaceholder } from "../LoadingPlaceholder";

export const Events = () => {
  const [text, setText] = useState<string>("");
  const { initialized, loading, data, nav, page, total } = useEvents({
    query: { orderBy: "date", text },
  });
  return (
    <div>
      <Heading>Events{total !== undefined ? ` (${total})` : ""}</Heading>
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
          {data.map((event) => {
            const label = serializeLabels(event);
            const date = serializeEventDates(event);
            return (
              <li key={event.idLocal}>
                <Link to={"event/" + event.idLocal} className="text-gray-800">
                  {label + (date ? ` (${date})` : "")}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        "No events found"
      )}
    </div>
  );
};
