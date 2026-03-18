import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import z from "zod";
import { Building, Loader2 } from "lucide-react";
import { useSettings } from "../../hooks/useSettings";
import toast from "react-hot-toast";

const BusinessSettingsSchema = z.object({
  storeName: z
    .string()
    .min(3, { message: "Store name must be at least 3 characters" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  address: z
    .string()
    .min(5, { message: "Store address must be at least 5 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  storeLogo: z.any(),
});

type BusinessFormData = z.infer<typeof BusinessSettingsSchema>;

const BusinessSettings = () => {
  const { getSettings, updateSettings } = useSettings();
  const settingsData = getSettings?.data?.data?.data;

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    setValue,
  } = useForm<BusinessFormData>({
    resolver: zodResolver(BusinessSettingsSchema),
  });

  useEffect(() => {
    if (settingsData?.business) {
      const b = settingsData.business;
      setValue("storeName", b.storeName || "");
      setValue("phone", b.phone || "");
      setValue("address", b.address || "");
      setValue("email", b.email || "");
    }
  }, [settingsData, setValue]);

  const onSubmit = async (data: BusinessFormData) => {
    try {
      await updateSettings.mutateAsync({
        business: {
          storeName: data.storeName,
          phone: data.phone,
          address: data.address,
          email: data.email,
        },
      });
      toast.success("Business settings saved");
    } catch {
      toast.error("Failed to save business settings");
    }
  };

  if (getSettings.isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="animate-spin text-[#71717A]" size={30} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[26px] bg-white w-full h-auto px-[24px] py-[24px] border border-[#E2E4E9] rounded-[12px]">
      <div className="flex flex-col gap-[8px]">
        <h1 className="font-medium gap-[8px] flex flex-row uppercase text-black text-[15px] tracking-[0.9px] leading-tight">
          <span>
            <Building size={20} />
          </span>
          Business Information
        </h1>
        <p className="font-medium text-[#71717A] tracking-[0.9px] leading-tight text-[12px]">
          Update your store details and contact information
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-[16px]"
      >
        <div className="flex flex-row gap-[19px]">
          <div className="flex-1 max-w-[510px]">
            <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
              Store Name
            </label>
            <input
              type="text"
              {...register("storeName")}
              className="w-full mt-[8px] text-[13px] bg-[#FAFAFB] h-[43px] rounded-[8px] outline-none  transition-colors border border-[#E2E4E9] px-[12px] py-[8px]"
            />
            {errors.storeName && (
              <span className="text-red-500 text-[10px] mt-1 block">
                {errors.storeName.message}
              </span>
            )}
          </div>

          <div className="flex-1 max-w-[510px]">
            <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phone")}
              className="w-full mt-[8px] bg-[#FAFAFB] text-[13px] outline-none  transition-colors h-[43px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px]"
            />
            {errors.phone && (
              <span className="text-red-500 text-[10px] mt-1 block">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
            Store Address
          </label>
          <textarea
            {...register("address")}
            className="w-full mt-[8px] text-[13px] bg-[#FAFAFB] outline-none  transition-colors h-[80px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px] resize-none"
          />
          {errors.address && (
            <span className="text-red-500 text-[10px] mt-1 block">
              {errors.address.message}
            </span>
          )}
        </div>

        <div>
          <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
            Email Address
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full mt-[8px] text-[13px] bg-[#FAFAFB] outline-none  transition-colors h-[43px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px]"
          />
          {errors.email && (
            <span className="text-red-500 text-[10px] mt-1 block">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="pt-[10px] flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#1A47FE] text-white w-full max-w-[200px] h-[40px] rounded-[8px] font-medium text-[14px] tracking-[0.9px] hover:bg-blue-700 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessSettings;
