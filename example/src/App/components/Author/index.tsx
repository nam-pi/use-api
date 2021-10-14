import { useAuthor } from "nampi-use-api/index";
import { useParams } from "react-router";
import { ItemPage } from "../ItemPage";

interface Params {
  idLocal: string;
}

export const Author = () => {
  const { idLocal } = useParams<Params>();
  const { data } = useAuthor({ idLocal });
  return <ItemPage data={data} title="Author" />;
};
