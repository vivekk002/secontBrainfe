import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import ShareIcon from "../icons/ShareIcon";
import SideBarItems from "./SideBarItems";
import YoutubeIcon from "../icons/YoutubeIcon";
import TwitterIcon from "../icons/TwitterIcon";
import Reddit from "../icons/Reddit";
import Pinterest from "../icons/Pinterest";
import Spotify from "../icons/Spotify";
import PlusIcon from "../icons/PlusIcon";
import UserProfileDropdown from "./UserProfileDropdown";

type Tag = {
  _id: string;
  name: string;
  contentId: string[];
};

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
        className="flex flex-col justify-center items-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
          absolute top-12 right-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200 
          transform transition-all duration-200 origin-top-right z-50
          ${
            hmOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
        `}
      >
        <div className="py-2">
          <div className="px-2 pb-2">
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
              className="hover:bg-blue-200"
              setFilter={setFilter}
              value="youtube"
            />
            <SideBarItems
              icon={<TwitterIcon size="lg" />}
              text={"Tweets"}
              className="hover:bg-blue-200"
              setFilter={setFilter}
              value="twitter"
            />
            <SideBarItems
              icon={<Reddit size="lg" />}
              text={"Reddit"}
              className="hover:bg-blue-200"
              setFilter={setFilter}
              value="reddit"
            />
            <SideBarItems
              icon={<Pinterest size="lg" />}
              text={"Pinterest"}
              className="hover:bg-blue-200"
              setFilter={setFilter}
              value="pinterest"
            />
            <SideBarItems
              icon={<Spotify size="lg" />}
              text={"Spotify"}
              className="hover:bg-blue-200"
              setFilter={setFilter}
              value="spotify"
            />
            <UserProfileDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
