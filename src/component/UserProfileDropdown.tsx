import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../icons/ProfileIcon";
import LogoutIcon from "../icons/LogoutIcon";
import SettingsIcon from "../icons/SettingsIcon";
import { useAuth } from "../hooks/useAuth";

const UserProfileDropdown = () => {
  const [name, setName] = useState(localStorage.getItem("user"));
  const [profilePicture, setProfilePicture] = useState(
    localStorage.getItem("profilePicture"),
  );

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const updateProfile = () => {
      setName(localStorage.getItem("user"));
      setProfilePicture(localStorage.getItem("profilePicture"));
    };

    window.addEventListener("profileUpdated", updateProfile);
    window.addEventListener("storage", updateProfile);

    return () => {
      window.removeEventListener("profileUpdated", updateProfile);
      window.removeEventListener("storage", updateProfile);
    };
  }, []);

  useEffect(() => {
    const fetchLatestProfile = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/me`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        if (res.data.user) {
          const u = res.data.user;
          if (u.name) localStorage.setItem("user", u.name);
          if (u.profilePicture)
            localStorage.setItem("profilePicture", u.profilePicture);
          window.dispatchEvent(new Event("profileUpdated"));
        }
      } catch (e) {
        console.error("Background profile fetch failed", e);
      }
    };
    fetchLatestProfile();
  }, []);

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
      <div
        className="flex items-center gap-4 p-4 ml-4 mr-4 cursor-pointer text-slate-700 text-xl hover:bg-slate-100 rounded-lg transition-colors duration-150"
        onClick={handleProfileClick}
      >
        {profilePicture ? (
          <img
            src={profilePicture}
            alt={name || "Profile"}
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />
        ) : (
          <ProfileIcon size="lg" />
        )}
        <span>Profile</span>
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

      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 min-w-[200px]">
          <div className="p-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt={name || "Profile"}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {name && name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {name && name.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          <div className="py-1">
            <div
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-100 transition-colors"
              onClick={() => {
                navigate("/settings");
                setIsOpen(false);
              }}
            >
              <SettingsIcon size="md" />
              <span className="text-slate-700">Settings</span>
            </div>
            <div
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-100 transition-colors"
              onClick={handleLogout}
            >
              <LogoutIcon size="md" />
              <span className="text-slate-700">Logout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
