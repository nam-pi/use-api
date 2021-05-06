import { useEvents, usePerson } from "nampi-use-api/bundle";
import { useParams } from "react-router";
import { serializeLabels } from "../../utils/serializeLabels";
import { Heading } from "../Heading";
import { Pre } from "../Pre";

interface Params {
  idLocal: string;
}

export const Person = () => {
  const { idLocal } = useParams<Params>();
  const { data } = usePerson({ idLocal });
  const events = useEvents({
    paused: !data,
    query: { orderBy: "date", participant: data?.id },
  });
  return data ? (
    <div>
      <Heading>{serializeLabels(data)}</Heading>
      <Heading className="mt-4 mb-2" level={2}>
        Person data
      </Heading>
      <Pre>{data}</Pre>
      <Heading className="mt-4 mb-2" level={2}>
        Events data
      </Heading>
      <Pre>{events.data}</Pre>
    </div>
  ) : (
    <></>
  );
};
