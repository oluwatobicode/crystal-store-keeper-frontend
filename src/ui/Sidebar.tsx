import React from "react";
import {
  CreditCard,
  LayoutDashboard,
  Package,
  Settings,
  UserCog,
  Users,
  FileText,
  LogOut, // Added Logout icon
} from "lucide-react";
import { BsBucketFill } from "react-icons/bs";
import { NavLink } from "react-router";

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const Sidebar: React.FC = () => {
  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={19} />,
      href: "/dashboard",
    },
    {
      label: "Sales / New Transaction",
      icon: <BsBucketFill size={19} />,
      href: "/sales",
    },
    { label: "Customers", icon: <Users size={19} />, href: "/customers" },
    {
      label: "Products & Stock",
      icon: <Package size={19} />,
      href: "/products",
    },
    {
      label: "Payments & Transactions",
      icon: <CreditCard size={19} />,
      href: "/transactions",
    },
    { label: "Reports", icon: <FileText size={19} />, href: "/reports" },
    { label: "Users & Roles", icon: <UserCog size={19} />, href: "/UserRoles" },
    {
      label: "Settings & Backup",
      icon: <Settings size={19} />,
      href: "/settings",
    },
  ];

  return (
    <div className="bg-white h-screen w-full px-4 border-r border-gray-100 flex flex-col justify-between py-5">
      <div className="flex flex-col items-center">
        <div className="mb-[50px]">
          <img
            src="Logo.svg"
            className="w-[141px] h-[17px]"
            alt="crystal-store-keeper"
          />
        </div>

        <ul className="flex flex-col items-start gap-[10px] w-full">
          {menuItems.map((item, index) => (
            <li key={index} className="w-full">
              <NavLink
                to={item.href}
                className={({ isActive }: { isActive: boolean }) =>
                  `flex items-center gap-[9px] px-3 py-2 transition-all duration-200 ${
                    isActive
                      ? "bg-[#EDEDFB] rounded-[9px] text-[#1A47FE]"
                      : "text-[#000000] hover:bg-gray-50 rounded-[9px]"
                  }`
                }
              >
                <span className="shrink-0 flex items-center justify-center">
                  {item.icon}
                </span>
                <span className="text-[12px] leading-[19.8px] tracking-normal font-medium">
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <button className="w-full border-t border-gray-50 pt-5">
        <NavLink
          to="/login"
          className="flex items-center gap-[9px] px-3 py-2 text-[#000000] hover:bg-red-50 hover:text-red-600 transition-all duration-200 rounded-[9px]"
        >
          <span className="shrink-0 flex items-center justify-center">
            <LogOut size={19} />
          </span>
          <span className="text-[12px] cursor-pointer leading-[19.8px] font-medium">
            Logout
          </span>
        </NavLink>
      </button>
    </div>
  );
};

export default Sidebar;
