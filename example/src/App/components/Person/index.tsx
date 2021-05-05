import { useEvents, usePerson } from "nampi-use-api/bundle";
import { useParams } from "react-router";
import { serializeEventDates } from "../../utils/serializeEventDates";
import { serializeLabels } from "../../utils/serializeLabels";
import { Heading } from "../Heading";

interface Params {
  localId: string;
}

export const Person = () => {
  const { localId } = useParams<Params>();
  const { data } = usePerson(localId);
  const events = useEvents({ orderBy: "date", participant: data?.id });
  return data ? (
    <div>
      <Heading>{serializeLabels(data)}</Heading>
      <div>
        {events.data?.map((e) => {
          const dateText = serializeEventDates([e]);
          const labelsText = serializeLabels(e);
          return (
            <div key={e.idLocal}>
              {dateText ? `${dateText}: ` : ""}
              {labelsText}
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <></>
  );
};
