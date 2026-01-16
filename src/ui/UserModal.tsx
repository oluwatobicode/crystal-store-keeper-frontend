import { X, Loader2, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const userSchema = z
  .object({
    fullName: z.string().min(3, "Full Name is required"),
    username: z.string().email("Username must be a valid email"),
    role: z.string().min(1, "Please select a role"),
    contactNumber: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    isActive: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UserFormData = z.infer<typeof userSchema>;

interface UserModalProps {
  onClose: () => void;
  onSave?: (data: UserFormData) => void;
}

const UserModal = ({ onClose, onSave }: UserModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      isActive: true,
      role: "",
    },
  });

  const isActive = watch("isActive");

  // --- 2. Generate Password Logic ---
  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    let pass = "";
    for (let i = 0; i < 10; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setValue("password", pass);
    setValue("confirmPassword", pass);
  };

  const onSubmit = async (data: UserFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Creating User:", data);
    if (onSave) onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[500px] bg-white rounded-[12px] shadow-xl border border-gray-100 flex flex-col max-h-[90vh] overflow-y-auto">
        <div className="p-[24px] border-b border-[#F4F4F5] flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h1 className="text-[16px] font-bold uppercase tracking-[0.9px] text-[#1D1D1D]">
              Add New User
            </h1>
            <p className="text-[13px] text-[#71717A] font-medium">
              Create a new user account with role-based access
            </p>
          </div>
          <button onClick={onClose} className="text-[#71717A] hover:text-black">
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
              {...register("fullName")}
              placeholder="e.g. John Doe"
              className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none focus:border-[#1A47FE] transition-colors"
            />
            {errors.fullName && (
              <span className="text-red-500 text-[11px]">
                {errors.fullName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-bold text-[#1D1D1D]">
              Username
            </label>
            <input
              {...register("username")}
              placeholder="customer@email.com"
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
              Select a role
            </label>
            <select
              {...register("role")}
              className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none focus:border-[#1A47FE] cursor-pointer"
            >
              <option value="">Select role...</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales Rep</option>
              <option value="Inventory">Inventory Clerk</option>
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

          <div className="flex flex-col gap-[8px]">
            <div className="flex justify-between items-center">
              <label className="text-[13px] font-bold text-[#1D1D1D]">
                Password
              </label>
              <button
                type="button"
                onClick={generatePassword}
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

          <div className="flex items-center justify-between pt-2">
            <span className="text-[13px] font-bold text-[#1D1D1D]">
              Account Status
            </span>
            <div className="flex items-center gap-3">
              <span
                className={`text-[12px] font-medium ${
                  !isActive ? "text-[#1D1D1D]" : "text-[#71717A]"
                }`}
              >
                Inactive
              </span>

              <button
                type="button"
                onClick={() => setValue("isActive", !isActive)}
                className={`w-[44px] h-[24px] rounded-full p-1 transition-colors duration-200 ease-in-out ${
                  isActive ? "bg-[#1A47FE]" : "bg-[#E4E4E7]"
                }`}
              >
                <div
                  className={`w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${
                    isActive ? "translate-x-[20px]" : "translate-x-0"
                  }`}
                />
              </button>

              <span
                className={`text-[12px] font-medium ${
                  isActive ? "text-[#1D1D1D]" : "text-[#71717A]"
                }`}
              >
                Active
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-[12px] mt-4 pt-4 ">
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
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
