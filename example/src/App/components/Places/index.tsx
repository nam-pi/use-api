import { usePlaces } from "nampi-use-api/bundle";
import { useState } from "react";
import { ItemListPage } from "../ItemListPage";

export const Places = () => {
  const [text, setText] = useState<string>("");
  const itemData = usePlaces({
    query: { orderBy: "label", text },
  });
  return (
    <ItemListPage
      itemData={itemData}
      title="Places"
      onTextChange={setText}
      urlPart="places"
    />
  );
};
