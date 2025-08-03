import type { ReactElement } from "react";

interface SideBarItemsProps {
  icon: ReactElement;
  text: string;
}

const SideBarItems = (props: SideBarItemsProps) => {
  return (
    <div
      className="flex items-center gap-4 p-4 ml-4 mr-4 cursor-pointer  text-gray-700 text-xl
    hover:bg-gray-100 rounded-lg transition-colors duration-150"
    >
      {props.icon}
      {props.text}
    </div>
  );
};
export default SideBarItems;
