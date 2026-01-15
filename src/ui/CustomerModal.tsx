import { X, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const CUSTOMER_TYPES = ["Individual", "Company"] as const;

const customerSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  emailAddress: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address is too short"),
  customerType: z.enum(CUSTOMER_TYPES),
  creditLimit: z.coerce.number().min(0, "Credit limit cannot be negative"),
});

export type CustomerFormData = z.input<typeof customerSchema>;

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CustomerFormData | null;
  onSave: (data: CustomerFormData) => void;
}

const CustomerModal = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}: CustomerModalProps) => {
  const isEditMode = !!initialData;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      customerType: "Individual",
      creditLimit: 0,
    },
  });

  // --- 3. Pre-fill form when "Edit Mode" activates ---
  useEffect(() => {
    if (initialData) {
      // We are editing: fill the fields
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as keyof CustomerFormData, value);
      });
    } else {
      // We are adding: clear the form
      reset({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        address: "",
        customerType: "Individual",
        creditLimit: 0,
      });
    }
  }, [initialData, reset, setValue]);

  const onSubmit = async (data: CustomerFormData) => {
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(isEditMode ? "Updated Customer:" : "Created Customer:", data);
    onSave(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[500px] bg-white rounded-[12px] shadow-xl border border-gray-100 flex flex-col max-h-[90vh] overflow-y-auto">
        <div className="p-[24px] border-b border-[#F4F4F5] flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h1 className="text-[16px] font-bold uppercase tracking-[0.9px] text-[#1D1D1D]">
              {isEditMode ? "Edit Customer" : "Add New Customer"}
            </h1>
            <p className="text-[13px] text-[#71717A] font-medium">
              {isEditMode
                ? "Update existing account details"
                : "Enter customer details to create a new account"}
            </p>
          </div>
          <button onClick={onClose} className="text-[#71717A] cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-[24px] flex flex-col gap-[20px]"
        >
          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-medium text-[#1D1D1D]">
              Full Name *
            </label>
            <input
              {...register("fullName")}
              placeholder="Customer name"
              className="w-full h-[44px] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none transition-colors"
            />
            {errors.fullName && (
              <span className="text-red-500 text-[11px]">
                {errors.fullName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-medium text-[#1D1D1D]">
              Email *
            </label>
            <input
              {...register("emailAddress")}
              placeholder="customer@email.com"
              className="w-full h-[44px] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none transition-colors"
            />
            {errors.emailAddress && (
              <span className="text-red-500 text-[11px]">
                {errors.emailAddress.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-medium text-[#1D1D1D]">
              Phone *
            </label>
            <input
              {...register("phoneNumber")}
              placeholder="Phone number"
              className="w-full h-[44px] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none transition-colors"
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-[11px]">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-medium text-[#1D1D1D]">
              Address
            </label>
            <input
              {...register("address")}
              placeholder="Full address"
              className="w-full h-[44px] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none transition-colors"
            />
            {errors.address && (
              <span className="text-red-500 text-[11px]">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="flex gap-[16px]">
            <div className="flex-1 flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-[#1D1D1D]">
                Customer Type
              </label>
              <select
                {...register("customerType")}
                className="w-full h-[44px] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none bg-white cursor-pointer"
              >
                <option value="Individual">Individual</option>
                <option value="Company">Company</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-[#1D1D1D]">
                Credit Limit (£)
              </label>
              <input
                type="number"
                {...register("creditLimit")}
                className="w-full h-[44px] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none "
              />
            </div>
          </div>

          <div className="flex justify-end gap-[12px] mt-4 pt-4 border-t border-[#F4F4F5]">
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
              {isEditMode ? "Save Changes" : "Add Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;
