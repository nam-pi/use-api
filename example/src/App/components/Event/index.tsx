import { useEvent } from "nampi-use-api/bundle";
import { useParams } from "react-router";
import { ItemPage } from "../ItemPage";

interface Params {
  idLocal: string;
}

export const Event = () => {
  const { idLocal } = useParams<Params>();
  const { data } = useEvent({ idLocal });
  return <ItemPage data={data} title="Event" />;
};
