import { useEvents } from "nampi-use-api/bundle";
import { useState } from "react";
import { ItemListPage } from "../ItemListPage";

export const Events = () => {
  const [text, setText] = useState<string>("");
  const itemData = useEvents({
    query: { orderBy: "date", text },
  });
  return (
    <ItemListPage
      itemData={itemData}
      title="Events"
      onTextChange={setText}
      urlPart="events"
    />
  );
};
