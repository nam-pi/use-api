import { useAct } from "nampi-use-api/index";
import { useParams } from "react-router";
import { ItemPage } from "../ItemPage";

interface Params {
  idLocal: string;
}

export const Act = () => {
  const { idLocal } = useParams<Params>();
  const { data } = useAct({ idLocal });
  return <ItemPage data={data} title="Act" />;
};
