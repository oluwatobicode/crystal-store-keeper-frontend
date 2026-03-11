import { X, Loader2, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { permissionsSections } from "../utils/Permissions";
import { useRoles } from "../hooks/useRoles";
import { toggleSection } from "../utils/toggleSection";
import { togglePermission } from "../utils/togglePermission";
import toast from "react-hot-toast";
import {
  roleSchema,
  type CustomRulesModalProps,
  type RoleFormData,
} from "../types/Roles";

const CustomRulesModal = ({
  isOpen,
  onClose,
  roleToEdit,
}: CustomRulesModalProps) => {
  const isEditMode = !!roleToEdit;
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    roleToEdit?.permissions || [],
  );

  const { createRole, editRoles } = useRoles();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
  });

  useEffect(() => {
    if (roleToEdit) {
      setValue("roleName", roleToEdit.roleName);
      setValue("description", roleToEdit.description || "");
    }
  }, [roleToEdit, setValue]);

  const onSubmit = async (data: RoleFormData) => {
    const formattedData = {
      roleName: data.roleName,
      description: data.description,
      permissions: selectedPermissions,
    };

    try {
      if (isEditMode) {
        await editRoles.mutateAsync({
          id: roleToEdit._id,
          data: formattedData,
        });
        toast.success("Role updated successfully");
      } else {
        await createRole.mutateAsync(formattedData);
        toast.success("Role created successfully");
      }
      reset();
      setSelectedPermissions([]);
      onClose();
    } catch {
      toast.error(
        isEditMode ? "Failed to update role" : "Failed to create role",
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-[12px] shadow-xl w-full max-w-[1100px] h-[90vh] flex flex-col overflow-hidden">
        <div className="p-[24px]  flex justify-between items-start bg-white shrink-0">
          <div className="flex flex-col gap-1">
            <h1 className="text-[18px] font-bold uppercase tracking-[0.9px] text-[#1D1D1D]">
              {isEditMode ? "Edit Role" : "Create Custom Role"}
            </h1>
            <p className="text-[13px] text-[#71717A] font-medium">
              {isEditMode
                ? "Update role details and permissions"
                : "Define a new role with specific permissions and access levels"}
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
                        onClick={() =>
                          toggleSection(
                            section.items,
                            selectedPermissions,
                            setSelectedPermissions,
                          )
                        }
                        className="text-[12px] font-medium text-[#1D1D1D] bg-[#FAFAFB] border border-[#E2E4E9] px-3 py-1.5 rounded-[6px] hover:bg-gray-100 transition-colors"
                      >
                        Select all
                      </button>
                    </div>

                    <div className="flex flex-col gap-[16px]">
                      {section.items.map((item) => {
                        const isSelected = selectedPermissions.includes(
                          item.id,
                        );
                        return (
                          <div
                            key={item.id}
                            onClick={() =>
                              togglePermission(item.id, setSelectedPermissions)
                            }
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
            form="role-form"
            disabled={isSubmitting}
            className="h-[44px] px-8 rounded-[8px] bg-[#1A47FE] text-[13px] font-bold text-white hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : null}
            {isEditMode ? "Update Role" : "Create Role"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomRulesModal;
