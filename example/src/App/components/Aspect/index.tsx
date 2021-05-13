import { useAspect } from "nampi-use-api/bundle";
import { useParams } from "react-router";
import { serializeLabels } from "../../utils/serializeLabels";
import { Heading } from "../Heading";
import { Pre } from "../Pre";

interface Params {
  idLocal: string;
}

export const Aspect = () => {
  const { idLocal } = useParams<Params>();
  const { data } = useAspect({ idLocal });
  return data ? (
    <div>
      <Heading>{serializeLabels(data)}</Heading>
      <Heading className="mt-4 mb-2" level={2}>
        Aspect data
      </Heading>
      <Pre>{data}</Pre>
    </div>
  ) : (
    <></>
  );
};
