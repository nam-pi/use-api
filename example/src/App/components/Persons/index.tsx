import { usePersons } from "nampi-use-api/index";
import { useState } from "react";
import { ItemListPage } from "../ItemListPage";

export const Persons = () => {
  const [text, setText] = useState<string>("");
  const itemData = usePersons({
    query: { orderBy: "label", text },
  });
  return (
    <ItemListPage
      itemData={itemData}
      title="Persons"
      onTextChange={setText}
      urlPart="persons"
    />
  );
};
