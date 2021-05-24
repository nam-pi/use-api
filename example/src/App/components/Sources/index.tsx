import { useSources } from "nampi-use-api/bundle";
import React, { useState } from "react";
import { ItemListPage } from "../ItemListPage";

export const Sources = () => {
  const [text, setText] = useState<string>("");
  const itemData = useSources({
    query: { orderBy: "label", text },
  });
  return (
    <ItemListPage
      itemData={itemData}
      onTextChange={setText}
      title="Sources"
      urlPart="source"
    />
  );
};
