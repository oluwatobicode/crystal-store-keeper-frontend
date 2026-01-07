import React from "react";

const UserRolesHeader: React.FC = () => {
  return (
    <div className="flex flex-col gap-[12px]">
      <h1 className="text-[26px] font-bold leading-[31.2px] tracking-normal">
        Users & Roles
      </h1>
      <p className="font-normal text-[14px] leading-[23.4px] tracking-normal text-[#71717A]">
        Manage user accounts, roles and permissions
      </p>
    </div>
  );
};

export default UserRolesHeader;
