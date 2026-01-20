import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import ShareIcon from "../icons/ShareIcon";
import SideBarItems from "./SideBarItems";
import YoutubeIcon from "../icons/YoutubeIcon";
import DocumentIcon from "../icons/DocumentIcon";
import ArticleIcon from "../icons/ArticleIcon";
import PhotoIcon from "../icons/PhotoIcon";
import TableIcon from "../icons/TableIcon";
import PlusIcon from "../icons/PlusIcon";
import UserProfileDropdown from "./UserProfileDropdown";

interface HamburgerMenuProps {
  setShareModalOpen: (open: boolean) => void;
  setAddContentOpen: (open: boolean) => void;
  setFilter: (value: string) => void;
}

const HamburgerMenu = ({
  setShareModalOpen,
  setAddContentOpen,
  setFilter,
}: HamburgerMenuProps) => {
  const [hmOpen, setHmOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setHmOpen(!hmOpen);
  };

  const handleItemClick = (callback: () => void) => {
    callback();
    setHmOpen(false); // Close menu after action
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setHmOpen(false);
      }
    };

    if (hmOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hmOpen]);

  return (
    <div className="relative" ref={menuRef}>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Toggle menu"
        aria-expanded={hmOpen}
      >
        <span
          className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
            hmOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${
            hmOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${
            hmOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* Mobile Dropdown Menu */}
      <div
        className={`
          absolute top-12 right-0 w-56 bg-white rounded-lg shadow-lg border border-slate-200 
          transform transition-all duration-200 origin-top-right z-50
          ${
            hmOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
        `}
      >
        <div className="py-2">
          <div className="px-2 pb-2 pt-2">
            <Button
              className="w-full mb-2"
              size="lg"
              variant="primary"
              label="Add Content"
              startIcon={<PlusIcon size="md" />}
              onClick={() => handleItemClick(() => setAddContentOpen(true))}
            />
            <Button
              className="w-full"
              size="lg"
              variant="secondary"
              label="Share Brain"
              startIcon={<ShareIcon size="md" />}
              onClick={() => handleItemClick(() => setShareModalOpen(true))}
            />

            <SideBarItems
              icon={<YoutubeIcon size="lg" />}
              text={"Youtube"}
              className="hover:bg-slate-100"
              setFilter={setFilter}
              value="youtube"
              setHmOpen={setHmOpen}
            />

            <SideBarItems
              icon={<ArticleIcon size="md" />}
              text={"Articles"}
              className="hover:bg-slate-100"
              setFilter={setFilter}
              value="article"
              setHmOpen={setHmOpen}
            />
            <SideBarItems
              icon={<DocumentIcon size="lg" />}
              text={"PDFs"}
              className="hover:bg-slate-100"
              setFilter={setFilter}
              value="pdf"
              setHmOpen={setHmOpen}
            />
            <SideBarItems
              icon={<PhotoIcon size="md" />}
              text={"Images"}
              className="hover:bg-slate-100"
              setFilter={setFilter}
              value="image"
              setHmOpen={setHmOpen}
            />
            <SideBarItems
              icon={<TableIcon size="md" />}
              text={"Spreadsheets"}
              className="hover:bg-slate-100"
              setFilter={setFilter}
              value="spreadsheets"
              setHmOpen={setHmOpen}
            />

            <UserProfileDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
