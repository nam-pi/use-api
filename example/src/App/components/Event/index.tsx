import { useEvent, useEventDelete } from "nampi-use-api/index";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Button } from "../Button";
import { ItemPage } from "../ItemPage";
import { Paragraph } from "../Paragraph";

interface Params {
  idLocal: string;
}

export const Event = () => {
  const history = useHistory();
  const { idLocal } = useParams<Params>();
  const { data } = useEvent({ idLocal });
  const [doDelete, state] = useEventDelete(idLocal);
  useEffect(() => {
    if (state.data) {
      history.push("/");
    }
  }, [data, state.data, state.error, history]);
  return (
    <>
      <Button onClick={() => doDelete()} disabled={state.loading}>
        Delete
      </Button>
      {state.error && (
        <Paragraph>
          Error: <span>{JSON.stringify(state.error.description)}</span>
        </Paragraph>
      )}
      <ItemPage data={data} title="Event" />
    </>
  );
};
