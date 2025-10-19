import Spotify from "../icons/Spotify";
import Pinterest from "../icons/Pinterest";
import Reddit from "../icons/Reddit";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SideBarItems from "./SideBarItems";
import UserProfileDropdown from "./UserProfileDropdown";

interface SidebarProps {
  setFilter: (value: string) => void;
}

const Sidebar = ({ setFilter }: SidebarProps) => {
  return (
    // 🔧 NEW LAYOUT: Sidebar without header section, hidden on mobile
    <div className="hidden md:flex md:flex-col md:w-[18%] border-r bg-white border-gray-300 overflow-hidden">
      {/* 🔧 REMOVED: Brain Icon and Second Brain title (now in main header) */}

      {/* 🆕 Navigation items - takes most space */}
      <div className="flex-1 flex flex-col justify-start items-start gap-1 pt-4">
        <SideBarItems
          icon={<YoutubeIcon size="lg" />}
          text={"Youtube"}
          className="hover:bg-gray-100 ml-4 mr-4 w-60"
          setFilter={setFilter}
          value="youtube"
        />
        <SideBarItems
          icon={<TwitterIcon size="lg" />}
          text={"Tweets"}
          className="hover:bg-gray-100 ml-4 mr-4 w-60"
          setFilter={setFilter}
          value="twitter"
        />
        <SideBarItems
          icon={<Reddit size="lg" />}
          text={"Reddit"}
          className="hover:bg-gray-100 ml-4 mr-4 w-60"
          setFilter={setFilter}
          value="reddit"
        />
        <SideBarItems
          icon={<Pinterest size="lg" />}
          text={"Pinterest"}
          className="hover:bg-gray-100 ml-4 mr-4 w-60"
          setFilter={setFilter}
          value="pinterest"
        />
        <SideBarItems
          icon={<Spotify size="lg" />}
          text={"Spotify"}
          className="hover:bg-gray-100 ml-4 mr-4 w-60"
          setFilter={setFilter}
          value="spotify"
        />
      </div>

      {/* 🆕 User profile at bottom */}
      <div className="flex items-center justify-start px-4 py-5 bg-gray-50 border-t border-gray-200">
        <UserProfileDropdown />
      </div>
    </div>
  );
};

export default Sidebar;
