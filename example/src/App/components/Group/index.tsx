import { useGroup } from "nampi-use-api/bundle";
import { useParams } from "react-router";
import { ItemPage } from "../ItemPage";

interface Params {
  idLocal: string;
}

export const Group = () => {
  const { idLocal } = useParams<Params>();
  const { data } = useGroup({ idLocal });
  return <ItemPage data={data} title="Group" />;
};
