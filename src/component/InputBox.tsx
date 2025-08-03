interface InputBoxProps {
  placeholder: string;
  ref?: any;
  type: "text" | "password";
  required: boolean; // Optional prop to specify the input type
}

const InputBox = ({ placeholder, ref, type, required }: InputBoxProps) => {
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
};

export default InputBox;
