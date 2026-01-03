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
      icon: <LayoutDashboard />,
      href: "/dashboard",
    },
    {
      label: "Sales / New Transaction",
      icon: <BsBucketFill />,
      href: "/sales",
    },
    { label: "Customers", icon: <Users />, href: "/customers" },
    { label: "Products & Stock", icon: <Package />, href: "/products" },
    {
      label: "Payments & Transactions",
      icon: <CreditCard />,
      href: "/transactions",
    },
    { label: "Reports", icon: <FileText />, href: "/reports" },
    { label: "Users & Roles", icon: <UserCog />, href: "/UserRoles" },
    { label: "Settings & Backup", icon: <Settings />, href: "/settings" },
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
                <span className="text-[14px]  text-[#000000] leading-[19.8px] tracking-normal font-medium">
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
