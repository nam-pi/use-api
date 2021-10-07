import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  id: string;
  label: string;
}

export const Label = ({ children, id, label }: Props) => {
  return (
    <div className="mb-2 flex flex-col">
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
};
