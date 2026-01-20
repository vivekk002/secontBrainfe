import type { ReactElement } from "react";

interface SideBarItemsProps {
  icon: ReactElement;
  text: string;
  value: string;
  className: string;
  setFilter: (value: string) => void;
  setHmOpen?: (value: boolean) => void;
}

const SideBarItems = (props: SideBarItemsProps) => {
  const handleFilter = () => {
    props.setFilter(props.value);
    props.setHmOpen?.(false);
  };

  return (
    <div
      className={`flex items-center gap-4 p-3 mt-2 cursor-pointer text-slate-700 text-xl
     rounded-lg transition-colors duration-150 ${props.className} `}
      onClick={handleFilter}
    >
      <div>{props.icon}</div>
      <div>{props.text}</div>
    </div>
  );
};
export default SideBarItems;
