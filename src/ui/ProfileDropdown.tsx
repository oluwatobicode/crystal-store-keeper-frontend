import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Settings,
  LogOut,
  ShieldCheck,
  User,
  ClipboardList,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../contexts/AuthProvider";
import { useProfile } from "../hooks/useProfile";
import { getInitials } from "../utils/getInitials";
import type { ProfileDropdownProps } from "../types/Profile";

const menuItems = [
  {
    icon: Settings,
    label: "Settings",
    description: "App preferences & config",
    path: "/settings",
  },
  {
    icon: ShieldCheck,
    label: "User Roles",
    description: "Manage team permissions",
    path: "/UserRoles",
  },
  {
    icon: ClipboardList,
    label: "Activity Logs",
    description: "View recent activity",
    path: "/logs",
  },
];

const ProfileDropdown = ({ isOpen, onClose }: ProfileDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { state, logout } = useAuth();
  const { getProfile } = useProfile();
  const user = state.userData;
  const profile = getProfile.data?.data?.data;

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-[calc(100%+12px)] z-50 w-[280px] rounded-[14px] bg-white shadow-2xl border border-[#E4E4E7] flex flex-col overflow-hidden"
    >
      {/* Profile header */}
      <div className="px-5 py-4 bg-linear-to-br from-[#1A47FE]/5 to-[#1A47FE]/10 border-b border-[#E4E4E7]">
        <div className="flex items-center gap-3">
          {/* Avatar with photo or initials fallback */}
          <div className="relative shrink-0">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-[#1A47FE] flex items-center justify-center text-white text-[14px] font-bold select-none">
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.fullName} className="w-full h-full object-cover" />
              ) : user?.fullName ? (
                getInitials(user.fullName)
              ) : (
                <User size={18} />
              )}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold text-[#1D1D1D] truncate">
              {user?.fullName || "—"}
            </p>
            <p className="text-[11px] text-[#71717A] truncate">
              {user?.email || "—"}
            </p>
          </div>
        </div>

        {/* Role badge */}
        {user?.roleName && (
          <div className="mt-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-[#1A47FE]/10 text-[#1A47FE] px-2.5 py-1 rounded-full">
              <ShieldCheck size={10} />
              {user.roleName}
            </span>
          </div>
        )}
      </div>

      {/* Menu items */}
      <div className="py-1.5">
        {menuItems.map(({ icon: Icon, label, description, path }) => (
          <button
            key={path}
            onClick={() => handleNavigate(path)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-[8px] bg-gray-100 group-hover:bg-[#1A47FE]/10 flex items-center justify-center transition-colors shrink-0">
              <Icon
                size={15}
                className="text-[#71717A] group-hover:text-[#1A47FE] transition-colors"
              />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-[13px] font-medium text-[#1D1D1D] leading-none">
                {label}
              </p>
              <p className="text-[11px] text-[#71717A] mt-0.5">{description}</p>
            </div>
            <ChevronRight
              size={14}
              className="text-[#D4D4D8] group-hover:text-[#1A47FE] transition-colors shrink-0"
            />
          </button>
        ))}
      </div>

      {/* Divider + Logout */}
      <div className="border-t border-[#E4E4E7] p-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-[#FE1A1A] hover:bg-red-50 transition-colors cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-[8px] bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors shrink-0">
            <LogOut size={15} className="text-[#FE1A1A]" />
          </div>
          <span className="text-[13px] font-semibold">Sign out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
