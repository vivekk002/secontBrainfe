import type { ReactElement } from "react";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  className?: string;
}

interface variantProps {
  primary?: string;
  secondary?: string;
}

const variantClasses: variantProps = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-blue-100 text-blue-300",
};

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const defaultStyle = "flex items-center rounded-lg";

const Button = (props: ButtonProps) => {
  return (
    <div>
      <button
        onClick={props.onClick}
        disabled={props.disabled}
        className={`${variantClasses[props.variant]} ${
          sizeClasses[props.size]
        } ${defaultStyle} ${
          props.disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${props.className || ""}`}
      >
        {props.startIcon && (
          <span className="flex items-center mr-2">{props.startIcon}</span>
        )}
        {props.label}
        {props.endIcon && <div className="">{props.endIcon}</div>}
      </button>
    </div>
  );
};

export default Button;
