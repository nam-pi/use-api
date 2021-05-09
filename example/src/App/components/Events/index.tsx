import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEvents } from "nampi-use-api/bundle";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { serializeEventDates } from "../../utils/serializeEventDates";
import { serializeLabels } from "../../utils/serializeLabels";
import { AspectParentSelect } from "../AspectParentSelect";
import { Heading } from "../Heading";
import { Icon } from "../Icon";
import { Input } from "../Input";
import { ItemNav } from "../ItemNav";
import { LoadingPlaceholder } from "../LoadingPlaceholder";

export const Events = () => {
  const [aspectType, setAspectType] = useState<string>("");
  const [text, setText] = useState<string>("");
  const { initialized, loading, data, nav, page, total } = useEvents({
    query: { orderBy: "date", text, aspectType },
  });
  return (
    <div>
      <Heading>Events{total !== undefined ? ` (${total})` : ""}</Heading>
      <div className="w-1/3 flex flex-col">
        <div className="mt-4 flex w-full">
          <div className="mr-2 w-32">Aspect type:</div>
          <AspectParentSelect onChange={setAspectType} />
        </div>
        <div className="my-4 w-full flex flex-row items-center">
          <Icon icon={faSearch} />
          <Input
            className="ml-2 w-full"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          ></Input>
        </div>
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
