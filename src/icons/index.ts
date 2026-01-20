import type { MouseEventHandler } from "react";

export const iconSizeVariants = {
  sm: "size-4",
  md: "size-6",
  lg: "size-10",
};

export interface IconProps {
  size: "sm" | "md" | "lg";
  className?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
}
