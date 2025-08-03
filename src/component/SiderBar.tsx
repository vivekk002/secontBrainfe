import BrainiIcon from "../icons/BrainIcon";
import DocumentIcon from "../icons/DocumentIcon";
import HashIcon from "../icons/HashIcon";
import LinkIcon from "../icons/LinkIcon";
import ProfileIcon from "../icons/ProfileIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SideBarItems from "./SideBarItems";

const Sidebar = () => {
  return (
    <div className="w-[22%] border-r border-gray-300 bg-white">
      <div className="h-[85%]">
        <div className="flex items-center p-6 gap-3 align-middle">
          <BrainiIcon size="lg" />
          <h3 className="font-bold text-center text-3xl ">Second Brain</h3>
        </div>
        <div className="flex flex-col justify-between">
          <SideBarItems icon={<YoutubeIcon size="lg" />} text={"Youtube"} />
          <SideBarItems icon={<TwitterIcon size="md" />} text={"Tweets"} />
          <SideBarItems icon={<DocumentIcon size="lg" />} text={"Documents"} />
          <SideBarItems icon={<LinkIcon size="lg" />} text={"Links"} />
          <SideBarItems icon={<HashIcon size="lg" />} text={"Hashtags"} />
        </div>
      </div>
      <div className="h-[15%] items-center p-5 bg-gray-50">
        <SideBarItems icon={<ProfileIcon size="lg" />} text={"User Profile"} />
      </div>
    </div>
  );
};

export default Sidebar;
