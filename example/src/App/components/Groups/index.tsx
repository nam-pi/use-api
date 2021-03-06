import { useGroups } from "nampi-use-api/index";
import { useState } from "react";
import { ItemListPage } from "../ItemListPage";

export const Groups = () => {
  const [text, setText] = useState<string>("");
  const [type, setType] = useState<string>("");
  const itemData = useGroups({
    query: { orderBy: "label", text, type },
  });
  return (
    <ItemListPage
      baseType="http://purl.org/nampi/owl/core#group"
      itemData={itemData}
      title="Groups"
      onClassChange={setType}
      onTextChange={setText}
      urlPart="groups"
    />
  );
};
