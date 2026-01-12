import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Building, Loader2 } from "lucide-react"; // Added for loading icon

const BusinessSettingsSchema = z.object({
  storeName: z
    .string()
    .min(3, { message: "Store name must be at least 3 characters" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  storeAddress: z
    .string()
    .min(5, { message: "Store address must be at least 5 characters" }),
  emailAddress: z.string().email({ message: "Invalid email address" }),
  storeLogo: z.any(),
});

type BusinessFormData = z.infer<typeof BusinessSettingsSchema>;

const BusinessSettings = () => {
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm<BusinessFormData>({
    resolver: zodResolver(BusinessSettingsSchema),
  });

  const onSubmit = async (data: BusinessFormData) => {
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form Saved:", data);
  };

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
              {...register("phoneNumber")}
              className="w-full mt-[8px] bg-[#FAFAFB] text-[13px] outline-none  transition-colors h-[43px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px]"
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-[10px] mt-1 block">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
            Store Address
          </label>
          <textarea
            {...register("storeAddress")}
            className="w-full mt-[8px] text-[13px] bg-[#FAFAFB] outline-none  transition-colors h-[80px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px] resize-none"
          />
          {errors.storeAddress && (
            <span className="text-red-500 text-[10px] mt-1 block">
              {errors.storeAddress.message}
            </span>
          )}
        </div>

        <div>
          <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
            Email Address
          </label>
          <input
            type="email"
            {...register("emailAddress")}
            className="w-full mt-[8px] text-[13px] bg-[#FAFAFB] outline-none  transition-colors h-[43px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px]"
          />
          {errors.emailAddress && (
            <span className="text-red-500 text-[10px] mt-1 block">
              {errors.emailAddress.message}
            </span>
          )}
        </div>

        <div className="flex flex-row items-center gap-[16px]">
          <div className="flex-1 max-w-[919px]">
            <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
              Store logo
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("storeLogo")}
              className="w-full mt-[8px] font-medium leading-[16.2px] tracking-[-0.1px] text-[13px] bg-[#FAFAFB] outline-none h-[43px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px] pt-[10px]"
            />
          </div>

          <button
            type="button"
            className="bg-[#1A47FE] text-white cursor-pointer w-[104px] h-[43px] text-[#71717A] font-medium leading-[16.2px] rounded-[8px] tracking-[0.9px] text-[10px] mt-[24px] hover:bg-gray-100 transition-colors"
          >
            Upload Logo
          </button>
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
