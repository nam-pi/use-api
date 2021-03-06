import { useActs } from "nampi-use-api/index";
import { useState } from "react";
import { ItemListPage } from "../ItemListPage";

export const Acts = () => {
  const [text, setText] = useState<string>("");
  const itemData = useActs({
    query: { orderBy: "label", text },
  });
  return (
    <ItemListPage
      itemData={itemData}
      onTextChange={setText}
      title="Acts"
      urlPart="acts"
    />
  );
};
