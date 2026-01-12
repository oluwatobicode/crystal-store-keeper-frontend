import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const SystemSettingsSchema = z.object({
  enableTax: z.boolean(),
  discountApprovalThreshold: z
    .string()
    .min(0, "Must be a positive number")
    .max(100, "Cannot exceed 100%"),
  sessionTimeout: z.string().min(1, "Session timeout is required"),
  currency: z.string().min(1, "Currency is required"),
});

type SystemFormData = z.infer<typeof SystemSettingsSchema>;

const SystemSettings = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SystemFormData>({
    resolver: zodResolver(SystemSettingsSchema),
    defaultValues: {
      enableTax: false,
      discountApprovalThreshold: "10",
      sessionTimeout: "30 minutes",
      currency: "Nigerian Naira (₦)",
    },
  });

  const enableTax = watch("enableTax");

  const onSubmit = async (data: SystemFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("System Settings Saved:", data);
  };

  return (
    <div className="flex flex-col gap-[26px] bg-white w-full h-auto px-[24px] py-[24px] border border-[#E2E4E9] rounded-[12px]">
      <div className="flex flex-col gap-[8px]">
        <h1 className="font-medium gap-[10px] flex flex-row items-center uppercase text-black text-[15px] tracking-[0.9px] leading-tight">
          <span>
            <Shield size={18} className="text-[#1D1D1D]" />
          </span>
          System Settings
        </h1>
        <p className="font-medium text-[#71717A] tracking-[0.9px] leading-tight text-[12px]">
          Configure tax, security and operational settings
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-[24px]"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.9px]">
              Enable VAT/Tax
            </label>
            <p className="text-[12px] text-[#71717A]">
              Include tax calculations in invoices
            </p>
          </div>

          <button
            type="button"
            onClick={() => setValue("enableTax", !enableTax)}
            className={`w-[44px] h-[24px] rounded-full p-1 transition-colors duration-200 ease-in-out ${
              enableTax ? "bg-[#2474F5]" : "bg-[#E4E4E7]"
            }`}
          >
            <div
              className={`w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${
                enableTax ? "translate-x-[20px]" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="flex flex-col gap-[8px]">
          <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
            Manager Approval Required for Discounts Above (%)
          </label>
          <input
            type="string"
            {...register("discountApprovalThreshold")}
            className="w-full bg-[#FAFAFB] outline-none transition-colors h-[43px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px]"
          />
          {errors.discountApprovalThreshold && (
            <span className="text-red-500 text-[10px]">
              {errors.discountApprovalThreshold.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-[8px]">
          <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
            Session Timeout (minutes)
          </label>
          <input
            type="text"
            {...register("sessionTimeout")}
            className="w-full bg-[#FAFAFB] outline-none transition-colors h-[43px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px]"
          />
          {errors.sessionTimeout && (
            <span className="text-red-500 text-[10px]">
              {errors.sessionTimeout.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-[8px]">
          <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
            Currency
          </label>
          <input
            type="text"
            readOnly
            {...register("currency")}
            className="w-full bg-[#FAFAFB] outline-none transition-colors h-[43px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px] text-[#71717A] cursor-not-allowed"
          />
        </div>

        <div className="pt-[10px]">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 cursor-pointer px-4 h-[40px] bg-white border border-[#E2E4E9] rounded-[8px] text-[12px] font-medium text-[#1D1D1D] hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              <Shield size={14} />
            )}
            Request Approval
          </button>
        </div>
      </form>
    </div>
  );
};

export default SystemSettings;
