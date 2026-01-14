import { forwardRef } from "react";

interface InputBoxProps {
  placeholder: string;
  type: "text" | "password";
  required: boolean;
}

const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(
  ({ placeholder, type, required }, ref) => {
    return (
      <div className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-md">
        <input
          required={required}
          ref={ref}
          type={type}
          placeholder={placeholder}
          className="flex-1 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
    );
  }
);

InputBox.displayName = "InputBox";

export default InputBox;
