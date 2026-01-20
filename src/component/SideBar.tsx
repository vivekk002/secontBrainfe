import YoutubeIcon from "../icons/YoutubeIcon";
import DocumentIcon from "../icons/DocumentIcon";
import PhotoIcon from "../icons/PhotoIcon";

import ArticleIcon from "../icons/ArticleIcon";
import SideBarItems from "./SideBarItems";
import UserProfileDropdown from "./UserProfileDropdown";

interface SidebarProps {
  setFilter: (value: string) => void;
}

const Sidebar = ({ setFilter }: SidebarProps) => {
  return (
    <div className="hidden md:flex md:flex-col md:w-[18%] border-r bg-gradient-to-b from-purple-50 via-white to-blue-50 border-slate-200 overflow-hidden">
      <div className="flex-1 flex flex-col justify-start items-start gap-1 pt-4 overflow-y-auto">
        <SideBarItems
          icon={<YoutubeIcon size="lg" />}
          text={"Youtube"}
          className="hover:bg-purple-50 ml-4 mr-4 w-60 text-slate-700 transition-colors duration-150"
          setFilter={setFilter}
          value="youtube"
        />

        <SideBarItems
          icon={<ArticleIcon size="md" />}
          text={"Articles"}
          className="hover:bg-purple-50 ml-4 mr-4 w-60 text-slate-700 transition-colors duration-150"
          setFilter={setFilter}
          value="article"
        />
        <SideBarItems
          icon={<DocumentIcon size="lg" />}
          text={"PDFs"}
          className="hover:bg-purple-50 ml-4 mr-4 w-60 text-slate-700 transition-colors duration-150"
          setFilter={setFilter}
          value="pdf"
        />
        <SideBarItems
          icon={<PhotoIcon size="md" />}
          text={"Images"}
          className="hover:bg-purple-50 ml-4 mr-4 w-60 text-slate-700 transition-colors duration-150"
          setFilter={setFilter}
          value="image"
        />

        <SideBarItems
          icon={<DocumentIcon size="lg" />}
          text={"Docs"}
          className="hover:bg-purple-50 ml-4 mr-4 w-60 text-slate-700 transition-colors duration-150"
          setFilter={setFilter}
          value="doc"
        />
      </div>

      <div className="flex items-center justify-start px-4 py-5 bg-slate-50 border-t border-slate-200">
        <UserProfileDropdown />
      </div>
    </div>
  );
};

export default Sidebar;
