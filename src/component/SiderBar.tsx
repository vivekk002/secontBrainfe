import BrainiIcon from "../icons/BrainIcon";

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
    <div className="w-16 md:w-[18%] md:border-r bg-gray-50 border-gray-300 md:bg-white overflow-hidden transition-all duration-300 ease-in-out">
      <div className="h-[85%] flex flex-col">
        <div className="flex items-center md:px-4 md:py-6 gap-3 align-middle md:justify-start justify-center">
          <div className="flex-shrink-0 transition-all duration-200">
            <BrainiIcon size="md" />
          </div>
          <h3 className="font-bold text-center text-2xl hidden md:block transition-opacity duration-300">
            Second Brain
          </h3>
        </div>
        <div className="hidden md:flex flex-col justify-between  items-start gap-1  ">
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
      </div>
      <div className="h-[15%] hidden md:flex items-center md:justify-start justify-center px-4 py-5 bg-gray-50">
        <UserProfileDropdown />
      </div>
    </div>
  );
};

export default Sidebar;
