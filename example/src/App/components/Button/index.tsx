import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ className = "", disabled, ...props }: Props) => {
  let defaultClasses =
    "rounded border border-gray-400 border-1 shadow disabled:opacity-50";
  if (!className.includes("p-") && !className.includes("px-")) {
    defaultClasses += " px-2";
  }
  if (!className.includes("p-") && !className.includes("py-")) {
    defaultClasses += " py-1";
  }
  if (disabled) {
    defaultClasses += " cursor-default";
  }

  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(defaultClasses, className)}
    />
  );
};
