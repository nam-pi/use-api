import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import { useClasses } from "nampi-use-api/bundle";
import { useCallback, useEffect, useMemo, useState } from "react";
import { serializeLabels } from "../../utils/serializeLabels";
import { Icon } from "../Icon";

interface Props {
  onChange?: (id: string, value: string) => void;
}

interface Type {
  id: string;
  value: string;
}

export const AspectParentSelect = ({ onChange = () => {} }: Props) => {
  const { data, initialized, loading } = useClasses({
    query: {
      limit: 1000,
      orderBy: "label",
      ancestor: "https://purl.org/nampi/owl/core#aspect",
    },
  });

  const aspectTypes = useMemo(() => {
    const results: Type[] = [{ id: "", value: "No value selected" }];
    if (!data) {
      return results;
    }
    for (let i = 0, length = data.length; i < length; i++) {
      results.push({ id: data[i].id, value: serializeLabels(data[i]) });
    }
    return results;
  }, [data]);

  const [selectedType, setSelectedType] = useState(aspectTypes[0]);

  const handleChange = useCallback(
    (type: Type) => {
      setSelectedType(type);
      onChange(type.id, type.value);
    },
    [onChange]
  );

  useEffect(() => {
    if (initialized && !loading && aspectTypes.length > 0) {
      setSelectedType(aspectTypes[0]);
    }
  }, [aspectTypes, initialized, loading]);

  return (
    <Listbox value={selectedType} onChange={handleChange}>
      <div className="relative w-full">
        <Listbox.Button className="relative rounded border border-gray-400 border-1 shadow disabled:opacity-50 px-2 py-1 w-full flex flex-row justify-between items-center">
          <span>{selectedType.value}</span>
          <Icon className="ml-2" icon={faCaretDown} />
        </Listbox.Button>
        <Listbox.Options className="h-64 overflow-y-scroll shadow bg-white border-1 border-gray-400 rounded py-1 absolute z-10 mt-2">
          {aspectTypes.map((type) => (
            <Listbox.Option key={type.id} value={type}>
              {({ active, selected }) => (
                <li
                  className={clsx(
                    "px-2",
                    "py-1",
                    "text-black",
                    "min-w-min",
                    active
                      ? "bg-gray-200 cursor-pointer"
                      : selected
                      ? "bg-gray-100"
                      : "bg-white "
                  )}
                >
                  {type.value}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};
