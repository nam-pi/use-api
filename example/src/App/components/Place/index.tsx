import { usePlace } from "nampi-use-api/index";
import { useParams } from "react-router";
import { ItemPage } from "../ItemPage";

interface Params {
  idLocal: string;
}

export const Place = () => {
  const { idLocal } = useParams<Params>();
  const { data } = usePlace({ idLocal });
  return <ItemPage data={data} title="Place" />;
};
