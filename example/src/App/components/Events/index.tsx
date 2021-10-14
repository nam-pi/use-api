import { useAuth, useEvents } from "nampi-use-api/index";
import { useState } from "react";
import { Button } from "../Button";
import { ItemListPage } from "../ItemListPage";
import { NewEventDialog } from "../NewEventDialog";

export const Events = () => {
  const { authenticated } = useAuth();
  const [text, setText] = useState<string>("");
  const itemData = useEvents({
    query: { orderBy: "date", text },
  });
  const [addIsVisible, setAddIsVisible] = useState(false);
  return (
    <>
      {authenticated && (
        <Button onClick={() => setAddIsVisible(true)} disabled={addIsVisible}>
          Add Event
        </Button>
      )}
      {addIsVisible && (
        <NewEventDialog
          visible={addIsVisible}
          onClose={() => setAddIsVisible(false)}
        />
      )}
      <ItemListPage
        itemData={itemData}
        title="Events"
        onTextChange={setText}
        urlPart="events"
      />
    </>
  );
};
