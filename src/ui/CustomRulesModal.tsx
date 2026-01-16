import { X, Loader2, Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// --- 1. Data Structure for Permissions ---
const permissionsSections = [
  {
    title: "Dashboard",
    key: "dashboard",
    items: [
      {
        id: "dash.view",
        label: "View Dashboard",
        desc: "Access dashboard overview",
      },
    ],
  },
  {
    title: "Point of Sale",
    key: "pos",
    items: [
      {
        id: "pos.operate",
        label: "Operate POS",
        desc: "Create and process sales transactions",
      },
      {
        id: "pos.discount.small",
        label: "Small Discounts",
        desc: "Apply discounts up to threshold",
      },
      {
        id: "pos.discount.large",
        label: "Large Discounts",
        desc: "Apply discounts above threshold",
      },
      {
        id: "pos.refund",
        label: "Process Refunds",
        desc: "Issue refunds and returns",
      },
    ],
  },
  {
    title: "Customers",
    key: "customers",
    items: [
      {
        id: "cust.view",
        label: "View Customers",
        desc: "Search and view customer information",
      },
      {
        id: "cust.manage",
        label: "Manage Customers",
        desc: "Add, edit, and delete customers",
      },
      {
        id: "cust.history",
        label: "Customer History",
        desc: "View complete purchase history",
      },
    ],
  },
  {
    title: "Inventory",
    key: "inventory",
    items: [
      {
        id: "inv.view",
        label: "View Inventory",
        desc: "View product catalog and stock levels",
      },
      {
        id: "inv.manage",
        label: "Manage Products",
        desc: "Add, edit, and delete products",
      },
      {
        id: "inv.receive",
        label: "Receive Stock",
        desc: "Process incoming stock deliveries",
      },
      {
        id: "inv.adjust",
        label: "Stock Adjustments",
        desc: "Make stock corrections and adjustments",
      },
    ],
  },
  {
    title: "Transactions & Payments",
    key: "transactions",
    items: [
      {
        id: "trans.view_all",
        label: "View All Transactions",
        desc: "Access complete transaction history",
      },
      {
        id: "trans.view_own",
        label: "View Own Transactions",
        desc: "View only personal transactions",
      },
      {
        id: "trans.reconcile",
        label: "Reconcile Payments",
        desc: "Mark payments as confirmed",
      },
      {
        id: "trans.manage",
        label: "Manage Payments",
        desc: "Edit payment status and details",
      },
    ],
  },
  {
    title: "Reports & Analytics",
    key: "reports",
    items: [
      {
        id: "rep.view",
        label: "View Dashboard",
        desc: "Access financial and operational reports",
      },
      {
        id: "rep.export",
        label: "Export Reports",
        desc: "Export data to CSV/Excel",
      },
      {
        id: "rep.profit",
        label: "Profit Reports",
        desc: "View profit margins and cost analysis",
      },
    ],
  },
  {
    title: "User Management",
    key: "users",
    items: [
      {
        id: "user.manage",
        label: "Manage Users",
        desc: "Create, edit, and deactivate user accounts",
      },
      {
        id: "role.manage",
        label: "Manage Roles",
        desc: "Create and modify user roles and permissions",
      },
      {
        id: "user.audit",
        label: "User Activity",
        desc: "View user activity and audit logs",
      },
    ],
  },
  {
    title: "System Settings",
    key: "settings",
    items: [
      {
        id: "sys.config",
        label: "System Settings",
        desc: "Configure system and business settings",
      },
      {
        id: "sys.backup",
        label: "Backup & Restore",
        desc: "Create backups and restore data",
      },
      {
        id: "sys.logs",
        label: "Audit Logs",
        desc: "View and export system audit logs",
      },
    ],
  },
];

const roleSchema = z.object({
  roleName: z.string().min(3, "Role Name is required"),
  description: z.string().optional(),
});

type RoleFormData = z.infer<typeof roleSchema>;

interface CustomRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomRulesModal = ({ isOpen, onClose }: CustomRulesModalProps) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
  });

  const togglePermission = (id: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // --- Select All in Section ---
  const toggleSection = (sectionItems: { id: string }[]) => {
    const allIds = sectionItems.map((item) => item.id);
    const allSelected = allIds.every((id) => selectedPermissions.includes(id));

    if (allSelected) {
      // Deselect all
      setSelectedPermissions((prev) =>
        prev.filter((id) => !allIds.includes(id))
      );
    } else {
      // Select all (merge unique)
      setSelectedPermissions((prev) =>
        Array.from(new Set([...prev, ...allIds]))
      );
    }
  };

  const onSubmit = async (data: RoleFormData) => {
    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Role Data:", data);
    console.log("Selected Permissions:", selectedPermissions);

    // Close & Reset
    reset();
    setSelectedPermissions([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-[12px] shadow-xl w-full max-w-[1100px] h-[90vh] flex flex-col overflow-hidden">
        <div className="p-[24px]  flex justify-between items-start bg-white shrink-0">
          <div className="flex flex-col gap-1">
            <h1 className="text-[18px] font-bold uppercase tracking-[0.9px] text-[#1D1D1D]">
              Create Custom Role
            </h1>
            <p className="text-[13px] text-[#71717A] font-medium">
              Define a new role with specific permissions and access levels
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#71717A] hover:text-black transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-[24px]">
          <form
            id="role-form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[32px]"
          >
            <div className="grid grid-cols-2 gap-[24px]">
              <div className="flex flex-col gap-[8px]">
                <label className="text-[13px] font-bold text-[#1D1D1D]">
                  Role Name
                </label>
                <input
                  {...register("roleName")}
                  placeholder="e.g. Senior Manager, Sales Lead"
                  className="w-full h-[48px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-4 text-[13px] outline-none transition-colors"
                />
                {errors.roleName && (
                  <span className="text-red-500 text-[11px]">
                    {errors.roleName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-[8px]">
                <label className="text-[13px] font-bold text-[#1D1D1D]">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  placeholder="Describe what this role can do..."
                  className="w-full h-[80px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-4 py-2 text-[13px] outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[16px]">
              <h3 className="text-[14px] font-bold text-[#1D1D1D]">
                Permissions
              </h3>

              <div className="grid grid-cols-2 gap-[24px]">
                {permissionsSections.map((section) => (
                  <div
                    key={section.key}
                    className="bg-white border border-[#E2E4E9] rounded-[12px] p-[24px] flex flex-col gap-[16px]"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-[#F4F4F5]">
                      <h4 className="text-[15px] font-bold text-[#1D1D1D]">
                        {section.title}
                      </h4>
                      <button
                        type="button"
                        onClick={() => toggleSection(section.items)}
                        className="text-[12px] font-medium text-[#1D1D1D] bg-[#FAFAFB] border border-[#E2E4E9] px-3 py-1.5 rounded-[6px] hover:bg-gray-100 transition-colors"
                      >
                        Select all
                      </button>
                    </div>

                    <div className="flex flex-col gap-[16px]">
                      {section.items.map((item) => {
                        const isSelected = selectedPermissions.includes(
                          item.id
                        );
                        return (
                          <div
                            key={item.id}
                            onClick={() => togglePermission(item.id)}
                            className="flex items-start gap-3 cursor-pointer group"
                          >
                            <div
                              className={`mt-0.5 w-[18px] h-[18px] rounded-full border   flex items-center justify-center transition-colors shrink-0 ${
                                isSelected
                                  ? "bg-[#1A47FE] border-[#1A47FE]"
                                  : "bg-white border-[#1A47FE]"
                              }`}
                            >
                              {isSelected && (
                                <Check
                                  size={12}
                                  className="text-white"
                                  strokeWidth={3}
                                />
                              )}
                            </div>

                            <div className="flex flex-col">
                              <span
                                className={`text-[13px] font-bold transition-colors ${
                                  isSelected
                                    ? "text-[#1A47FE]"
                                    : "text-[#1D1D1D]"
                                }`}
                              >
                                {item.label}
                              </span>
                              <span className="text-[12px] text-[#71717A] font-medium">
                                {item.desc}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* --- FOOTER --- */}
        <div className="p-[24px] border-t border-[#E4E4E7] bg-white flex justify-end gap-[12px] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="h-[44px] px-8 rounded-[8px] border border-[#E2E4E9] text-[13px] font-bold text-[#1D1D1D] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="role-form" // Connects to the form ID above
            disabled={isSubmitting}
            className="h-[44px] px-8 rounded-[8px] bg-[#1A47FE] text-[13px] font-bold text-white hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : null}
            Create Roles
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomRulesModal;
