interface iconProps {
  size: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  sm: "size-2",
  md: "size-4",
  lg: "size-6",
};

const PlusIcon = (props: iconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`${sizeClasses[props.size]} ${props.className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
};
export default PlusIcon;
