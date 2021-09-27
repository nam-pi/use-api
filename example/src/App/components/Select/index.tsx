import clsx from "clsx";
import { DetailedHTMLProps, forwardRef, SelectHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {}

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ className, ...props }, ref) => (
    <select {...props} className={clsx(className, "rounded")} ref={ref} />
  )
);
