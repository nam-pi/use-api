import { useAuthors } from "nampi-use-api/bundle";
import React, { useState } from "react";
import { ItemListPage } from "../ItemListPage";

export const Authors = () => {
  const [text, setText] = useState<string>("");
  const itemData = useAuthors({
    query: { orderBy: "label", text },
  });
  return (
    <ItemListPage
      itemData={itemData}
      onTextChange={setText}
      title="Authors"
      urlPart="author"
    />
  );
};
