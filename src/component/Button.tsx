interface ButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  startIcon?: ReactElement;

  className?: string;
}

interface variantProps {
  primary?: string;
  secondary?: string;
}

const variantClasses: variantProps = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-blue-100 text-blue-300 hover:bg-blue-200 ",
};

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const defaultStyle =
  "flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out";

const Button = (props: ButtonProps) => {
  return (
    <div>
      <button
        onClick={props.onClick}
        disabled={props.disabled}
        className={`
          ${variantClasses[props.variant]} 
          ${sizeClasses[props.size]}
          ${defaultStyle} 
          ${props.disabled ? "opacity-50 cursor-not-allowed" : ""} 
          ${props.className || ""}
          
        `}
      >
        {props.startIcon && (
          <span className={`flex items-center `}>{props.startIcon}</span>
        )}
        <span className="whitespace-nowrap">{props.label}</span>
      </button>
    </div>
  );
};

export default Button;
