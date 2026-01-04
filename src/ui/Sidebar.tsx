import {
  CreditCard,
  LayoutDashboard,
  Package,
  Settings,
  UserCog,
  Users,
  FileText,
} from "lucide-react";
import { BsBucketFill } from "react-icons/bs";
import { Link } from "react-router";

const Sidebar = () => {
  const menuItems = [
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
    <div className="bg-white h-screen w-full px-4 border-r border-gray-100">
      <div className="h-full py-5 flex flex-col items-center">
        {/* Logo Section */}
        <div className="mb-[50px]">
          <img
            src="Logo.svg"
            className="w-[141px] h-[17px]"
            alt="crystal-store-keeper"
          />
        </div>

        <ul className="flex flex-col items-start justify-center gap-[29px] w-full">
          {menuItems.map((item, index) => (
            <li key={index} className="w-full">
              <Link
                to={item.href}
                className="flex items-center gap-[9px]  text-[#000000] hover:text-blue-600 transition-colors"
              >
                {item.icon}
                <span className="text-[12px]  text-[#000000] leading-[19.8px] tracking-normal font-medium">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
