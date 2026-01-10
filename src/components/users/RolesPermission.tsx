import { Shield, SquarePen } from "lucide-react"; // Imported SquarePen for the edit icon

const rolesData = [
  {
    role: "Admin",
    description: "Full system access and user management",
    permissions: ["all"],
  },
  {
    role: "Manager",
    description: "Sales, reports, and inventory management",
    permissions: [
      "pos.operate",
      "reports.view",
      "inventory.manage",
      "cust.manage",
      "trans.view",
    ],
  },
  {
    role: "Attendant",
    description: "Point of sale and basic customer operations",
    permissions: ["pos.operate", "customers.lookup", "transactions.own"],
  },
  {
    role: "Inventory Clerk",
    description: "Stock management and product catalog",
    permissions: ["inventory.manage", "inventory.view"],
  },
  {
    role: "Accountant",
    description: "Financial reports and transaction reconciliation",
    permissions: [
      "reports.view",
      "transactions.view",
      "transactions.reconcile",
    ],
  },
];

const RolesPermission = () => {
  return (
    <div className="flex flex-col w-full gap-[24px] px-[24px] h-auto py-[24px] bg-white ">
      <div className="flex flex-row w-full justify-between items-center py-[16px]">
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-medium uppercase text-black text-[20px] tracking-[0.9px] leading-tight">
            Roles & Permissions
          </h1>
          <p className="font-medium text-[#71717A] tracking-[0.9px] leading-tight text-[14px]">
            Configure role-based access control
          </p>
        </div>

        <button className="px-[16px] py-[9px] cursor-pointer bg-[#2474F5] hover:bg-blue-600 transition-colors text-white tracking-[0.9px] rounded-[8px] text-[14px] font-medium flex items-center gap-2">
          <Shield size={16} />
          Create Custom Role
        </button>
      </div>

      <div className="grid grid-cols-2 gap-[24px]">
        {rolesData.map((role, index) => (
          <div
            key={index}
            className="w-full border border-[#E4E4E7] rounded-[12px] p-[24px] flex flex-col gap-[16px]"
          >
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-col gap-[8px]">
                <h2 className="text-[16px] font-medium text-[#1D1D1D]">
                  {role.role}
                </h2>
                <p className="text-[12px] text-[#71717A] font-medium tracking-wide">
                  {role.description}
                </p>
              </div>
              <SquarePen
                size={18}
                className="text-[#71717A] cursor-pointer hover:text-black transition-colors"
              />
            </div>

            <div className="flex flex-col gap-[12px] mt-2">
              <h3 className="text-[12px] font-semibold text-[#1D1D1D]">
                Permissions:
              </h3>
              <div className="flex flex-wrap gap-[8px]">
                {role.permissions.map((perm, idx) => (
                  <span
                    key={idx}
                    className="px-[12px] py-[4px] rounded-full border border-[#E4E4E7] text-[11px] font-medium text-black bg-white"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RolesPermission;
