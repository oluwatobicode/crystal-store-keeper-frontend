import { useState } from "react";
import AllUsers from "./AllUsers";
import RolesPermission from "./RolesPermission";

const userSection = [
  { tab: "User Management" },
  { tab: "Roles & Permission" },
] as const;

type userTabType = (typeof userSection)[number]["tab"];

const UserRolesTabs = () => {
  const [currentTab, setCurrentTab] = useState<userTabType>("User Management");

  return (
    <div className="flex flex-col  gap-[24px]">
      <div className="w-full px-2 bg-[#EDEDE4]/20 bg-opacity-20 rounded-[12px] h-[41px] flex items-center gap-[25px]">
        {userSection.map((ele, index) => (
          <button
            onClick={() => setCurrentTab(ele.tab)}
            className={`flex-1 cursor-pointer transition-all duration-200 font-medium text-[12px] py-[4px] px-[3px] rounded-[8px] ${
              currentTab === ele.tab
                ? "bg-white text-[#1d1d1d]"
                : "text-[#71711a] hover:bg-white/50"
            }`}
            key={index}
          >
            {ele.tab}
          </button>
        ))}
      </div>

      {currentTab === "User Management" && <AllUsers />}
      {currentTab === "Roles & Permission" && <RolesPermission />}
    </div>
  );
};
export default UserRolesTabs;
