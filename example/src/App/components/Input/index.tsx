import clsx from "clsx";
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";

export interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, type = "text", ...props }: Props, ref) => (
    <input
      {...props}
      ref={ref}
      type={type}
      className={clsx("rounded", "border-gray-400", "shadow", className)}
    />
  )
);
