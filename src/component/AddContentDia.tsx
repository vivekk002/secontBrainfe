import { useEffect, useRef, useState } from "react";
import CrossIcon from "../icons/CrossIcon";
import Button from "./Button";
import Dropdown from "./Dropdown";
import InputBox from "./InputBox";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Toast from "../component/Toast";
import { useToast } from "../hooks/useToast";
import AddTagDropdown from "./AddTagDropdown";

type Tag = {
  _id: string;
  name: string;
  contentId: string[];
};

type PropsType = {
  addContentOpen: boolean;
  setAddContentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onContentAdded?: () => void;
  tags: Tag[];
};

interface OptionsType {
  value: string;
  label: string;
}

const dropdownOptions = [
  { label: "YouTube", value: "youtube" },
  { label: "Article", value: "article" },
  { label: "PDF", value: "pdf" },
  { label: "Document", value: "doc" },
  { label: "Image", value: "image" },
];

const AddContentDia = ({
  addContentOpen,
  setAddContentOpen,
  onContentAdded,
  tags,
}: PropsType) => {
  const [Loading, setLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const [optionType, setOptionType] = useState<OptionsType | null>(null);
  const [selectedTags, setSelectedTags] = useState<
    { value: string; label: string }[]
  >([]);
  const [file, setFile] = useState<File | null>(null);
  const titleref = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);

  const handleSelect = (option: OptionsType) => {
    setOptionType(option);
  };

  const handleTagSelect = (tags: { value: string; label: string }[]) => {
    setSelectedTags(tags);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const title = titleref.current?.value;
    const link = linkref.current?.value;
    const contentType = optionType?.value;
    const tags = selectedTags.map((tag) => tag.value);

    if (!title || !contentType) {
      showToast("Title and Content Type are required", "warning");
      return;
    }

    const isFileRequired = ["pdf", "doc", "image"].includes(contentType);
    if (isFileRequired && !file) {
      showToast("Please upload a file", "warning");
      return;
    }
    if (
      !isFileRequired &&
      !link &&
      contentType !== "twitter" &&
      contentType !== "reddit"
    ) {
      if (contentType === "youtube" || contentType === "article") {
        showToast("Please enter a link", "warning");
        return;
      }
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("contentType", contentType);

      tags.forEach((tag) => formData.append("tags", tag));

      if (isFileRequired && file) {
        formData.append("file", file);
      } else if (link) {
        formData.append("link", link);
      }

      const response = await axios.post(`${BACKEND_URL}/content`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.warning) {
        showToast(response.data.warning, "warning");
        setTimeout(() => {
          showToast("Content added successfully", "success");
        }, 6000);
      } else {
        showToast("Content added successfully", "success");
      }

      setLoading(false);
      setAddContentOpen(false);
      if (onContentAdded) {
        onContentAdded();
      }
    } catch (error: any) {
      console.log("error1", error);
      const msg =
        error.response?.data?.error ||
        error.response?.data?.details ||
        "Failed to add content";
      showToast(typeof msg === "string" ? msg : JSON.stringify(msg), "error");
      setLoading(false);
    }
  };

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setAddContentOpen(false);
      }
    };

    if (addContentOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addContentOpen, setAddContentOpen]);

  const isFileInput =
    optionType && ["pdf", "doc", "image"].includes(optionType.value);

  return (
    <div>
      {addContentOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm w-full h-full z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full md:w-1/3 p-6 max-h-[90%] overflow-y-auto opacity-100 transform transition-all duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold mb-4">Add New Content</h2>
              <CrossIcon
                size="lg"
                onClick={() => setAddContentOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-5 mt-5">
              <InputBox
                type="text"
                placeholder="Enter Title"
                ref={titleref}
                required={true}
              />
              <Dropdown
                options={dropdownOptions}
                onSelect={handleSelect}
                placeholder="Select content type"
              />

              {isFileInput ? (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Upload File
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                  />
                </div>
              ) : (
                <InputBox
                  type="text"
                  placeholder="Enter Link (Youtube/Article)"
                  ref={linkref}
                  required={!isFileInput}
                />
              )}

              <AddTagDropdown
                onSelect={handleTagSelect}
                placeholder="Select Tag"
                tags={tags}
              />
            </div>
            <div className="mt-4 justify-center p-4">
              {Loading ? (
                <Button
                  size={"lg"}
                  variant="primary"
                  label="Adding..."
                  className="w-full justify-center cursor-not-allowed opacity-70"
                />
              ) : (
                <Button
                  size={"lg"}
                  variant="primary"
                  label="Add Content"
                  className="w-full justify-center cursor-pointer"
                  onClick={handleSubmit}
                />
              )}
            </div>
            <Toast
              message={toast.message}
              type={toast.type}
              isVisible={toast.isVisible}
              onClose={hideToast}
              position="bottom-right"
              duration={4000}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddContentDia;
