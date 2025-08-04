import { useRef, useState } from "react";
import CrossIcon from "../icons/CrossIcon";
import Button from "./Button";
import Dropdown from "./Dropdown";
import InputBox from "./InputBox";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Toast from "../component/Toast";
import { useToast } from "../hooks/useToast";

type PropsType = {
  // or your appropriate type
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onContentAdded?: () => void;
};

interface OptionsType {
  value: string;
  label: string;
}

const dropdownOptions = [
  { label: "YouTube", value: "youtube" },
  { label: "Threads", value: "threads" },
  { label: "Reddit", value: "reddit" },

  { label: "Pinterest", value: "pinterest" },
  { label: "Spotify", value: "spotify" },
];

const AddContentDia = ({ open, setOpen, onContentAdded }: PropsType) => {
  const [Loading, setLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const [optionType, setOptionType] = useState<OptionsType | null>(null);
  const titleref = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);
  const handleSelect = (option: OptionsType) => {
    setOptionType(option);
  };

  const handleSubmit = async () => {
    const title = titleref.current?.value;
    const link = linkref.current?.value;
    const contentType = optionType?.value;

    if (!title || !link || !contentType) {
      showToast("Please fill in all fields", "warning");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/content`, {
        title,
        link,
        contentType,
      });
      showToast("Content added successfully", "success");
      setOpen(false);
      // Trigger content refresh
      if (onContentAdded) {
        onContentAdded();
      }
    } catch (e) {
      console.log("error", e);
      setLoading(false);
    }
  };

  return (
    <div>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/40  w-full h-full">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6 h-[90%] opacity-100 ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold mb-4 h-[30%]">
                Add New Content
              </h2>
              <CrossIcon
                size="lg"
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-5 mt-5 h-[60%] ">
              <InputBox
                type="text"
                placeholder="Enter Title"
                ref={titleref}
                required={true}
              />
              <InputBox
                type="text"
                placeholder="Enter Link"
                ref={linkref}
                required={true}
              />
              <Dropdown options={dropdownOptions} onSelect={handleSelect} />
            </div>
            <div className="mt-4 justify-center p-4 h-[10%]">
              {Loading ? (
                <Button
                  size={"lg"}
                  variant="primary"
                  label="Add Content"
                  className="w-full justify-center cursor-not-allowed"
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
