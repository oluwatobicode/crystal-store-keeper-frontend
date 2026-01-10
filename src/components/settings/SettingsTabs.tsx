import { useState } from "react";
import BusinessSettings from "./BusinessSettings";

const settingsTabs = [
  { tab: "Business" },
  { tab: "Invoice" },
  { tab: "System" },
  { tab: "Backup" },
  { tab: "Audit Logs" },
] as const;

type SettingsTabType = (typeof settingsTabs)[number]["tab"];

const SettingsTabs = () => {
  const [currentTab, setCurrentTab] = useState<SettingsTabType>("Business");

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="w-full px-2 bg-[#EDEDED]/50  rounded-[12px] h-[41px] flex items-center gap-[25px]">
        {settingsTabs.map((ele, index) => (
          <button
            onClick={() => setCurrentTab(ele.tab)}
            key={index}
            className={`flex-1 cursor-pointer transition-all duration-200 font-medium text-[12px] py-[4px] px-[3px] rounded-[8px] ${
              currentTab === ele.tab
                ? "bg-white text-[#1D1D1D]"
                : "text-[#71717A] hover:bg-white/50"
            }`}
          >
            {ele.tab}
          </button>
        ))}
      </div>

      {currentTab === "Business" && <BusinessSettings />}
    </div>
  );
};

export default SettingsTabs;
