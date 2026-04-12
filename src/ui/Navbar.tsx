import { useState } from "react";
import { Bell, Menu, PanelLeftOpen, Search, User } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import { useNotifications } from "../hooks/useNotification";
import { useAuth } from "../contexts/AuthProvider";
import { useProfile } from "../hooks/useProfile";
import { getInitials } from "../utils/getInitials";

interface NavbarProps {
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, sidebarCollapsed }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { notificationCount } = useNotifications();
  const { state } = useAuth();
  const { getProfile } = useProfile();

  const unreadCount: number = notificationCount?.data?.data?.data?.count ?? 0;
  const user = state.userData;
  const avatarUrl: string | undefined = getProfile.data?.data?.data?.avatarUrl;

  return (
    <div className="flex w-full items-center justify-between bg-white border-b-2 border-[#E4E4E7] px-5 py-5">
      <div className="flex items-center gap-3 w-full max-w-[800px]">
        {/* Sidebar toggle button */}
        <button
          onClick={onToggleSidebar}
          className="shrink-0 flex items-center justify-center h-[40px] w-[40px] rounded-[10px] hover:bg-[#EDEDFB] transition-all duration-200 cursor-pointer group"
          aria-label="Toggle sidebar"
          id="sidebar-toggle-btn"
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen size={20} className="text-gray-600 group-hover:text-[#1A47FE] transition-colors" />
          ) : (
            <Menu size={20} className="text-gray-600 group-hover:text-[#1A47FE] transition-colors" />
          )}
        </button>

        <div className="relative w-full max-w-[763.5px]">
          <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 pointer-events-none" />

          <input
            type="text"
            placeholder="Type to search"
            className="h-[45.24px] w-full rounded-[11.31px] border border-[#E4E4E7] pl-10 pr-4 outline-none transition-colors focus:border-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-[17px]">
        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotifOpen((prev) => !prev);
              setIsProfileOpen(false);
            }}
            className="relative cursor-pointer focus:outline-none"
            aria-label="Open notifications"
          >
            <Bell
              color={isNotifOpen ? "#1A47FE" : "#1D1D1D"}
              size={25}
              className="transition-colors"
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#1A47FE] text-white text-[9px] font-bold leading-none">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          <NotificationDropdown
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
          />
        </div>

        {/* Profile avatar */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileOpen((prev) => !prev);
              setIsNotifOpen(false);
            }}
            className={`h-[35px] w-[35px] cursor-pointer rounded-full overflow-hidden flex items-center justify-center focus:outline-none ring-2 transition-all ${
              isProfileOpen
                ? "ring-[#1A47FE]"
                : "ring-transparent hover:ring-gray-300"
            }`}
            aria-label="Open profile menu"
          >
            {/* Real avatar, initials, or generic user icon */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : user?.fullName ? (
              <div className="w-full h-full bg-[#1A47FE] flex items-center justify-center text-white text-[12px] font-bold select-none">
                {getInitials(user.fullName)}
              </div>
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <User size={18} className="text-gray-500" />
              </div>
            )}
          </button>

          <ProfileDropdown
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

