import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const BusinessSettingsSchema = z.object({
  storeName: z
    .string()
    .min(3, { message: "Store name must be at least 3 characters" }),
  phoneNumber: z.object({
    number: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" }),
  }),
  storeAddress: z
    .string()
    .min(5, { message: "Store address must be at least 5 characters" }),
  emailAddress: z.string().email({ message: "Invalid email address" }),
  storeLogoUrl: z.string().url({ message: "Invalid logo URL" }),
});

type BusinessFormData = z.infer<typeof BusinessSettingsSchema>;

const BusinessSettings = () => {
  const {
    formState: { errors },
    onSubmit,
  } = useForm<BusinessFormData>({
    resolver: zodResolver(BusinessSettingsSchema),
  });

  return (
    <div className="flex flex-col gap-[26px]">
      <div className="flex flex-col gap-[8px]">
        <h1 className="font-medium uppercase text-black text-[20px] tracking-[0.9px] leading-tight">
          Business Information
        </h1>
        <p className="font-medium text-[#71717A] tracking-[0.9px] leading-tight text-[14px]">
          Update your store details and contact information
        </p>
      </div>

      {/* form */}
      <div className=""></div>
    </div>
  );
};
export default BusinessSettings;
