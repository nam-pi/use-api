import { useAspects } from "nampi-use-api/index";
import { useState } from "react";
import { ItemListPage } from "../ItemListPage";

export const Aspects = () => {
  const [text, setText] = useState<string>("");
  const [type, setType] = useState<string>("");
  const itemData = useAspects({
    query: { orderBy: "label", text, type },
  });
  return (
    <ItemListPage
      baseType="https://purl.org/nampi/owl/core#aspect"
      itemData={itemData}
      onClassChange={setType}
      onTextChange={setText}
      title="Aspects"
      urlPart="aspects"
    />
  );
};
