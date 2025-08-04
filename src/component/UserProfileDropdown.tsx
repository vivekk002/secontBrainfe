import { useState, useRef, useEffect } from "react";
import ProfileIcon from "../icons/ProfileIcon";
import LogoutIcon from "../icons/LogoutIcon";
import SettingsIcon from "../icons/SettingsIcon";
import { useAuth } from "../hooks/useAuth";

const UserProfileDropdown = () => {
  const name = localStorage.getItem("name");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <div
        className="flex items-center gap-4 p-4 ml-4 mr-4 cursor-pointer text-gray-700 text-xl hover:bg-gray-100 rounded-lg transition-colors duration-150"
        onClick={handleProfileClick}
      >
        <ProfileIcon size="lg" />
        <span>Profile</span>
        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 ml-auto transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
          {/* User Info Section */}
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {name && name.toUpperCase()}
                </p>
                <p className="text-xs text-gray-500">user@example.com</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <div
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => {
                // TODO: Implement settings functionality
                console.log("Settings clicked");
                setIsOpen(false);
              }}
            >
              <SettingsIcon size="md" />
              <span className="text-gray-700">Settings</span>
            </div>
            <div
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={handleLogout}
            >
              <LogoutIcon size="md" />
              <span className="text-gray-700">Logout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
