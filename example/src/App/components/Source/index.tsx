import { useSource } from "nampi-use-api/index";
import { useParams } from "react-router";
import { ItemPage } from "../ItemPage";

interface Params {
  idLocal: string;
}

export const Source = () => {
  const { idLocal } = useParams<Params>();
  const { data } = useSource({ idLocal });
  return <ItemPage data={data} title="Source" />;
};
