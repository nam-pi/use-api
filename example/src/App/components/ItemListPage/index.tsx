import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FetchCollectionResult } from "nampi-use-api/bundle";
import { useState } from "react";
import { Link } from "react-router-dom";
import { serializeLabels } from "../../utils/serializeLabels";
import { Heading } from "../Heading";
import { Icon } from "../Icon";
import { Input } from "../Input";
import { ItemNav } from "../ItemNav";
import {
    ItemTypeSelect,
    Props as ItemTypeSelectProps
} from "../ItemTypeSelect";
import { LoadingPlaceholder } from "../LoadingPlaceholder";

interface Props {
  baseType?: string;
  itemData: FetchCollectionResult;
  onClassChange?: ItemTypeSelectProps["onChange"];
  onTextChange?: (text: string) => void;
  title: string;
  urlPart: string;
}

export const ItemListPage = ({
  baseType,
  itemData,
  onClassChange = () => undefined,
  onTextChange = () => undefined,
  title,
  urlPart,
}: Props) => {
  const { initialized, loading, data, nav, page, total } = itemData;
  const [text, setText] = useState<string>("");
  return (
    <div>
      <Heading>{total !== undefined ? `${title} (${total})` : title}</Heading>
      <div className="w-1/3 flex flex-col">
        {baseType ? (
          <div className="mt-4 flex w-full">
            <div className="mr-2 w-32">Aspect type:</div>
            <ItemTypeSelect baseType={baseType} onChange={onClassChange} />
          </div>
        ) : (
          <></>
        )}
        <div className="my-4 w-full flex flex-row items-center">
          <Icon icon={faSearch} />
          <Input
            className="ml-2 w-full"
            value={text}
            onChange={(e) => {
              setText(e.currentTarget.value);
              onTextChange(e.currentTarget.value);
            }}
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
            return (
              <li key={event.idLocal}>
                <Link
                  to={urlPart + "/" + event.idLocal}
                  className="text-gray-800"
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        "No items found"
      )}
    </div>
  );
};
