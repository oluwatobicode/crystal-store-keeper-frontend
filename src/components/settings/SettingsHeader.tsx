import React from "react";

const SettingsHeader: React.FC = () => {
  return (
    <div className="flex flex-col gap-[12px]">
      <h1 className="text-[26px] font-bold leading-[31.2px] tracking-normal">
        Settings & Backup
      </h1>
      <p className="font-normal text-[14px] leading-[23.4px] tracking-normal text-[#71717A]">
        Manage your account preferences, security, and system data backups
      </p>
    </div>
  );
};

export default SettingsHeader;
