import { usePerson } from "nampi-use-api/bundle";
import { useParams } from "react-router";
import { serializeLabels } from "../../utils/serializeLabels";
import { Heading } from "../Heading";

interface Params {
  localId: string;
}

export const Person = () => {
  const { localId } = useParams<Params>();
  const { data } = usePerson(localId);
  return data ? (
    <div>
      <Heading>{serializeLabels(data)}</Heading>
      <p>{JSON.stringify(data)}</p>
    </div>
  ) : (
    <></>
  );
};
