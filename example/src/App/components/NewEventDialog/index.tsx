import { Dialog } from "@headlessui/react";
import { EventMutationPayload, useEventMutations } from "nampi-use-api/bundle";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../Button";
import { Heading } from "../Heading";
import { Input } from "../Input";
import { InputRepeater } from "../InputRepeater";
import { Label } from "../Label";
import { Paragraph } from "../Paragraph";

interface Props {
  visible: boolean;
  onClose: VoidFunction;
}

const defaultState: EventMutationPayload = {
  aspects: [],
  authors: [],
  comments: [],
  date: "",
  labels: [],
  mainParticipant: "",
  otherParticipants: [],
  place: "",
  source: "",
  sourceLocation: "",
  texts: [],
  type: "",
};

export const NewEventDialog = ({ visible, onClose }: Props) => {
  const [state, setState] = useState<EventMutationPayload>(defaultState);
  const formHandler = useCallback(
    (property: keyof typeof state) => (value: typeof state[typeof property]) =>
      setState((old) => ({ ...old, [property]: value })),
    []
  );
  const handleAspects = useMemo(() => formHandler("aspects"), [formHandler]);
  const handleAuthors = useMemo(() => formHandler("authors"), [formHandler]);
  const handleComments = useMemo(() => formHandler("comments"), [formHandler]);
  const handleDate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      formHandler("date")(e.target.value),
    [formHandler]
  );
  const handleLabels = useMemo(() => formHandler("labels"), [formHandler]);
  const handleMainParticipant = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      formHandler("mainParticipant")(e.target.value),
    [formHandler]
  );
  const handleOtherParticipants = useMemo(
    () => formHandler("otherParticipants"),
    [formHandler]
  );
  const handlePlace = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      formHandler("place")(e.target.value),
    [formHandler]
  );
  const handleSource = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      formHandler("source")(e.target.value),
    [formHandler]
  );
  const handleSourceLocation = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      formHandler("sourceLocation")(e.target.value),
    [formHandler]
  );
  const handleTexts = useMemo(() => formHandler("texts"), [formHandler]);
  const handleType = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      formHandler("type")(e.target.value),
    [formHandler]
  );
  const isValid = useMemo(() => {
    return (
      state.type.length > 0 &&
      state.labels.length > 0 &&
      state.source.length !== 0 &&
      state.sourceLocation.length !== 0 &&
      state.mainParticipant.length !== 0 &&
      state.authors.length > 0
    );
  }, [
    state.authors.length,
    state.labels.length,
    state.mainParticipant.length,
    state.source.length,
    state.sourceLocation.length,
    state.type.length,
  ]);
  const { mutate, data, error, loading } = useEventMutations({
    action: "create",
  });
  const handleSubmit = useCallback(() => {
    mutate({ ...state });
  }, [mutate, state]);
  const history = useHistory();
  useEffect(() => {
    if (data && typeof data !== "boolean") {
      history.push("events/" + data.idLocal);
    }
  }, [data, history]);
  return (
    <Dialog
      open={visible}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white rounded-lg mx-auto px-4 py-2">
          <Dialog.Title className="text-xl">Add new event</Dialog.Title>
          <Dialog.Description className="italic">
            Insert data to create a new event in the NAMPI database.
          </Dialog.Description>
          <form>
            <div className="mt-4 flex flex-row flex-wrap">
              <div className="mr-8">
                <Label id="type" label="Type">
                  <Input id="type" onChange={handleType} />
                </Label>
                <InputRepeater label="Labels" onChange={handleLabels} />
                <InputRepeater label="Texts" onChange={handleTexts} />
                <InputRepeater label="Authors" onChange={handleAuthors} />
                <Label id="date" label="Date">
                  <Input id="date" onChange={handleDate} />
                </Label>
                <Label id="source" label="Source">
                  <Input id="source" onChange={handleSource} />
                </Label>
              </div>
              <div>
                <Label id="mainParticipant" label="Main participant">
                  <Input
                    id="mainParticipant"
                    onChange={handleMainParticipant}
                  />
                </Label>
                <InputRepeater
                  label="Other participants"
                  onChange={handleOtherParticipants}
                />
                <InputRepeater label="Aspects" onChange={handleAspects} />
                <Label id="place" label="Place">
                  <Input id="place" onChange={handlePlace} />
                </Label>
                <InputRepeater label="Comments" onChange={handleComments} />
                <Label id="sourceLocation" label="Source location">
                  <Input id="sourceLocation" onChange={handleSourceLocation} />
                </Label>
              </div>
            </div>
            <Button
              type="button"
              className="mt-8"
              disabled={!isValid || loading}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
          {error && (
            <>
              <Heading>Error</Heading>
              <Paragraph>{JSON.stringify(error.description)}</Paragraph>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
};
