import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { IconButton } from "../IconButton";
import { Input, Props as InputProps } from "../Input";
import { Label } from "../Label";

interface Props extends Omit<InputProps, "id" | "onChange"> {
  label: string;
  onChange?: (values: string[]) => void;
}

export const InputRepeater = ({
  label,
  className,
  onChange = () => undefined,
  ...inputProps
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = String(Math.floor(Math.random() * 100000000));
  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");
  const hasValue = useMemo(() => value.replace(/\s/g, "").length > 0, [value]);
  useEffect(() => {
    onChange(values);
  }, [onChange, values]);
  return (
    <Label id={id} label={label}>
      <div className="flex flex-row">
        <Input
          {...inputProps}
          ref={inputRef}
          id={id}
          className={clsx("w-full", className)}
          onChange={(e) => setValue(e.currentTarget.value)}
          value={value}
        />
        <IconButton
          type="button"
          className="ml-2"
          icon={faPlus}
          disabled={!hasValue}
          onClick={() => {
            if (hasValue) {
              setValue("");
              setValues((old) => [value, ...old]);
              inputRef.current?.focus();
            }
          }}
        />
      </div>
      {values.length > 0 && (
        <ul className="w-full">
          {values.map((value, idx) => (
            <li
              key={idx}
              className="flex flex-row justify-end items-center mt-2"
            >
              <span>{value}</span>
              <IconButton
                type="button"
                icon={faMinus}
                className="ml-3"
                onClick={() => {
                  setValue("");
                  setValues((old) => old.filter((_, i) => idx !== i));
                  inputRef.current?.focus();
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </Label>
  );
};
