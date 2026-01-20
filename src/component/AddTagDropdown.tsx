import { useRef, useState, useEffect } from "react";

type Tag = {
  _id: string;
  name: string;
  contentId: string[];
};

interface AddTagDropdownProps {
  className?: string;
  placeholder?: string;
  onSelect: (selectedTags: { value: string; label: string }[]) => void;
  tags: Tag[];
}

const AddTagDropdown = ({
  className,
  placeholder,
  onSelect,
  tags,
}: AddTagDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const List = tags.map((tag) => ({ label: tag.name, value: tag.name }));

  const [options, setOptions] = useState(List);
  const [inputValue, setInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState<
    { label: string; value: string }[]
  >([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on input value and exclude already selected tags
  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedTags.some((selected) => selected.value === option.value),
  );

  // Handler when user selects an existing option
  const handleOptionClick = (option: { value: string; label: string }) => {
    const newSelectedTags = [...selectedTags, option];
    setSelectedTags(newSelectedTags);
    onSelect(newSelectedTags);
    setInputValue("");
    setIsOpen(false);
  };

  // Handler to add a new option and select it
  const handleAddNewTag = () => {
    const newTag = inputValue.trim();
    if (!newTag) return;

    // Check if tag already exists (case-insensitive)
    if (
      selectedTags.some(
        (tag) => tag.label.toLowerCase() === newTag.toLowerCase(),
      ) ||
      options.some(
        (option) => option.label.toLowerCase() === newTag.toLowerCase(),
      )
    ) {
      setInputValue("");
      return;
    }

    const newOption = {
      label: newTag,
      value: newTag.toLowerCase().replace(/\s+/g, "-"),
    };

    setOptions((prev) => [...prev, newOption]);
    const newSelectedTags = [...selectedTags, newOption];
    setSelectedTags(newSelectedTags);
    onSelect(newSelectedTags);
    setInputValue("");
    setIsOpen(false);
  };

  // Remove a selected tag
  const handleRemoveTag = (tagToRemove: { value: string; label: string }) => {
    const newSelectedTags = selectedTags.filter(
      (tag) => tag.value !== tagToRemove.value,
    );
    setSelectedTags(newSelectedTags);
    onSelect(newSelectedTags);
  };

  // Open dropdown on input focus
  const handleInputFocus = () => setIsOpen(true);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Selected tags display */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTags.map((tag) => (
            <span
              key={tag.value}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {tag.label}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:bg-blue-200 rounded-full w-4 h-4 flex items-center justify-center text-blue-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input box for search */}
      <div
        className="flex border-2 w-full rounded pr-4 items-center justify-between cursor-text"
        onClick={() => setIsOpen(true)}
      >
        <input
          className="h-9 p-4 w-full focus:outline-none"
          type="text"
          placeholder={placeholder || "Select or add tags"}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={handleInputFocus}
        />
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100  focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 first:rounded-t-md last:rounded-b-md"
              >
                {option.label}
              </button>
            ))
          ) : inputValue.trim() === "" ? (
            <div className="px-4 py-2 text-gray-700">
              Start typing to search or add tags
            </div>
          ) : (
            <div className="px-4 py-2 text-gray-700">No matches found.</div>
          )}

          {/* Show add new option only when input doesn't match any existing option */}
          {inputValue.trim() !== "" &&
            !options.some(
              (option) =>
                option.label.toLowerCase() === inputValue.trim().toLowerCase(),
            ) &&
            !selectedTags.some(
              (tag) =>
                tag.label.toLowerCase() === inputValue.trim().toLowerCase(),
            ) && (
              <button
                onClick={handleAddNewTag}
                className="w-full px-4 py-2 text-left text-blue-600 font-semibold hover:bg-blue-100 focus:outline-none focus:bg-blue-100"
              >
                Add "{inputValue.trim()}"
              </button>
            )}
        </div>
      )}
    </div>
  );
};

export default AddTagDropdown;
