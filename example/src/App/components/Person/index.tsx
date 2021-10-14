import { usePerson } from "nampi-use-api/index";
import { useParams } from "react-router";
import { ItemPage } from "../ItemPage";

interface Params {
  idLocal: string;
}

export const Person = () => {
  const { idLocal } = useParams<Params>();
  const { data } = usePerson({ idLocal });
  return <ItemPage data={data} title="Person" />;
};
