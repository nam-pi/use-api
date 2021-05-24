import { useAspect } from "nampi-use-api/bundle";
import { useParams } from "react-router";
import { ItemPage } from "../ItemPage";

interface Params {
  idLocal: string;
}

export const Aspect = () => {
  const { idLocal } = useParams<Params>();
  const { data } = useAspect({ idLocal });
  return <ItemPage data={data} title="Aspect" />;
};
