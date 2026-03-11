import { X, Loader2, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoles } from "../hooks/useRoles";
import { useUsers } from "../hooks/useUsers";
import type { Roles } from "../types/Roles";
import toast from "react-hot-toast";

import {
  userSchema,
  type UserFormData,
  type UserModalProps,
} from "../types/User";
import { generatePassword } from "../utils/generatePassword";

const UserModal = ({ isOpen, onClose, userToEdit }: UserModalProps) => {
  const isEditMode = !!userToEdit;
  const { allRoles } = useRoles();
  const { createUser, updateUser } = useUsers();

  const rolesData = allRoles?.data?.data?.data ?? [];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: "",
    },
  });

  useEffect(() => {
    if (userToEdit) {
      setValue("fullname", userToEdit.fullname);
      setValue("email", userToEdit.email);
      setValue("username", userToEdit.username);
      setValue("role", userToEdit.role?._id || "");
      setValue("contactNumber", userToEdit.contactNumber || "");
      setValue("status", userToEdit.status || "active");
    } else {
      reset();
    }
  }, [userToEdit, setValue, reset]);

  const onSubmit = async (data: UserFormData) => {
    if (isEditMode) {
      try {
        await updateUser.mutateAsync({
          id: userToEdit._id,
          data: {
            fullname: data.fullname,
            email: data.email,
            username: data.username,
            role: data.role,
            contactNumber: data.contactNumber,
            status: data.status,
          },
        } as never);
        toast.success("User updated successfully");
        reset();
        onClose();
      } catch {
        toast.error("Failed to update user");
      }
    } else {
      const payload = {
        fullname: data.fullname,
        email: data.email,
        username: data.username,
        password: data.password,
        role: data.role,
        contactNumber: data.contactNumber,
      };
      try {
        await createUser.mutateAsync(payload as never);
        toast.success("User created successfully");
        reset();
        onClose();
      } catch {
        toast.error("Failed to create user");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[500px] bg-white rounded-[12px] shadow-xl border border-gray-100 flex flex-col max-h-[90vh] overflow-y-auto">
        <div className="p-[24px] border-b border-[#F4F4F5] flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h1 className="text-[16px] font-bold uppercase tracking-[0.9px] text-[#1D1D1D]">
              {isEditMode ? "Edit User" : "Add New User"}
            </h1>
            <p className="text-[13px] text-[#71717A] font-medium">
              {isEditMode
                ? "Update user account details"
                : "Create a new user account with role-based access"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#71717A] cursor-pointer hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-[24px] flex flex-col gap-[20px]"
        >
          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-bold text-[#1D1D1D]">
              Full Name
            </label>
            <input
              {...register("fullname")}
              placeholder="e.g. John Doe"
              className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none focus:border-[#1A47FE] transition-colors"
            />
            {errors.fullname && (
              <span className="text-red-500 text-[11px]">
                {errors.fullname.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-bold text-[#1D1D1D]">
              Email
            </label>
            <input
              {...register("email")}
              placeholder="user@email.com"
              className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none focus:border-[#1A47FE] transition-colors"
            />
            {errors.email && (
              <span className="text-red-500 text-[11px]">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-bold text-[#1D1D1D]">
              Username
            </label>
            <input
              {...register("username")}
              placeholder="e.g. johndoe"
              className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none focus:border-[#1A47FE] transition-colors"
            />
            {errors.username && (
              <span className="text-red-500 text-[11px]">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-bold text-[#1D1D1D]">
              Select a Role
            </label>
            <select
              {...register("role")}
              className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none focus:border-[#1A47FE] cursor-pointer"
            >
              <option value="">Select role...</option>
              {rolesData.map((role: Roles) => (
                <option key={role._id} value={role._id}>
                  {role.roleName}
                </option>
              ))}
            </select>
            {errors.role && (
              <span className="text-red-500 text-[11px]">
                {errors.role.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-bold text-[#1D1D1D]">
              Contact Number (Optional)
            </label>
            <input
              {...register("contactNumber")}
              placeholder="+234 801 234 5678"
              className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none focus:border-[#1A47FE] transition-colors"
            />
          </div>

          {isEditMode && (
            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-bold text-[#1D1D1D]">
                Status
              </label>
              <select
                {...register("status")}
                className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none focus:border-[#1A47FE] cursor-pointer"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          )}

          {!isEditMode && (
            <>
              <div className="flex flex-col gap-[8px]">
                <div className="flex justify-between items-center">
                  <label className="text-[13px] font-bold text-[#1D1D1D]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const pass = generatePassword();
                      setValue("password", pass);
                      setValue("confirmPassword", pass);
                    }}
                    className="text-[11px] cursor-pointer font-bold text-[#1D1D1D] bg-white border border-[#E2E4E9] px-2 py-1 rounded-[4px] hover:bg-gray-50 flex items-center gap-1"
                  >
                    <RefreshCw size={10} /> Generate
                  </button>
                </div>
                <input
                  type="text"
                  {...register("password")}
                  placeholder="Enter password"
                  className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none focus:border-[#1A47FE] transition-colors"
                />
                {errors.password && (
                  <span className="text-red-500 text-[11px]">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-[8px]">
                <label className="text-[13px] font-bold text-[#1D1D1D]">
                  Confirm Password
                </label>
                <input
                  type="text"
                  {...register("confirmPassword")}
                  placeholder="Confirm password"
                  className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none focus:border-[#1A47FE] transition-colors"
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-[11px]">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </>
          )}

          <div className="flex justify-end gap-[12px] mt-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="h-[40px] cursor-pointer px-6 rounded-[8px] border border-[#E2E4E9] text-[13px] font-medium text-[#1D1D1D] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-[40px] cursor-pointer px-6 rounded-[8px] bg-[#1A47FE] text-[13px] font-medium text-white hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={16} />
              ) : null}
              {isEditMode ? "Update User" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
