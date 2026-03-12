import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  ChevronRight,
  ChevronLeft,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Image as ImageIcon,
} from "lucide-react";

const SignUpSchema = z.object({
  // Business Details
  businessName: z.string().min(2, "Business name is required"),
  businessEmail: z.string().email("Invalid business email"),
  businessPhone: z.string().min(10, "Invalid business phone number"),
  businessAddress: z.string().min(5, "Business address is required"),
  businessLogo: z.string().optional(),
  // Owner Details
  ownerFullname: z.string().min(2, "Full name is required"),
  ownerUsername: z.string().min(3, "Username must be at least 3 characters"),
  ownerEmail: z.string().email("Invalid owner email"),
  ownerPassword: z.string().min(5, "Password must be at least 5 characters"),
  ownerPhone: z.string().min(10, "Invalid owner phone number"),
});

type SignUpFormData = z.infer<typeof SignUpSchema>;

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
  });

  const nextStep = async () => {
    const fieldsToValidate =
      step === 1
        ? ([
            "businessName",
            "businessEmail",
            "businessPhone",
            "businessAddress",
          ] as const)
        : ([] as const);

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep(2);
  };

  const prevStep = () => setStep(1);

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    const result = await signup(data);
    if (result.success) {
      toast.success(result.message);
      navigate("/verify-otp", { state: { email: data.ownerEmail } });
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="w-full max-w-[550px] p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1A1C21]">Create account</h2>
        <p className="text-[#71717A] mt-2">
          Step {step} of 2: {step === 1 ? "Business Details" : "Owner Details"}
        </p>

        <div className="flex gap-2 mt-4">
          <div
            className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-[#1A47FE]" : "bg-[#E2E4E9]"}`}
          />
          <div
            className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-[#1A47FE]" : "bg-[#E2E4E9]"}`}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#71717A]">
                  Business Name
                </label>
                <div className="relative">
                  <Building2
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]"
                    size={18}
                  />
                  <input
                    {...register("businessName")}
                    className={`w-full h-11 pl-10 pr-4 border rounded-xl outline-none transition-all ${errors.businessName ? "border-red-500" : "border-[#E2E4E9] focus:border-[#1A47FE]"}`}
                    placeholder="Enter business name"
                  />
                </div>
                {errors.businessName && (
                  <span className="text-xs text-red-500">
                    {errors.businessName.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#71717A]">
                  Business Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]"
                    size={18}
                  />
                  <input
                    {...register("businessEmail")}
                    className={`w-full h-11 pl-10 pr-4 border rounded-xl outline-none transition-all ${errors.businessEmail ? "border-red-500" : "border-[#E2E4E9] focus:border-[#1A47FE]"}`}
                    placeholder="Enter business email"
                  />
                </div>
                {errors.businessEmail && (
                  <span className="text-xs text-red-500">
                    {errors.businessEmail.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#71717A]">
                    Business Phone
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]"
                      size={18}
                    />
                    <input
                      {...register("businessPhone")}
                      className={`w-full h-11 pl-10 pr-4 border rounded-xl outline-none transition-all ${errors.businessPhone ? "border-red-500" : "border-[#E2E4E9] focus:border-[#1A47FE]"}`}
                      placeholder="+234..."
                    />
                  </div>
                  {errors.businessPhone && (
                    <span className="text-xs text-red-500">
                      {errors.businessPhone.message}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#71717A]">
                    Business Logo (URL)
                  </label>
                  <div className="relative">
                    <ImageIcon
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]"
                      size={18}
                    />
                    <input
                      {...register("businessLogo")}
                      className="w-full h-11 pl-10 pr-4 border border-[#E2E4E9] rounded-xl outline-none transition-all focus:border-[#1A47FE]"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#71717A]">
                  Business Address
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]"
                    size={18}
                  />
                  <input
                    {...register("businessAddress")}
                    className={`w-full h-11 pl-10 pr-4 border rounded-xl outline-none transition-all ${errors.businessAddress ? "border-red-500" : "border-[#E2E4E9] focus:border-[#1A47FE]"}`}
                    placeholder="Full business address"
                  />
                </div>
                {errors.businessAddress && (
                  <span className="text-xs text-red-500">
                    {errors.businessAddress.message}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="w-full h-12 bg-[#1A47FE] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors mt-4"
              >
                Next Step <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#71717A]">
                  Owner Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]"
                    size={18}
                  />
                  <input
                    {...register("ownerFullname")}
                    className={`w-full h-11 pl-10 pr-4 border rounded-xl outline-none transition-all ${errors.ownerFullname ? "border-red-500" : "border-[#E2E4E9] focus:border-[#1A47FE]"}`}
                    placeholder="First and Last name"
                  />
                </div>
                {errors.ownerFullname && (
                  <span className="text-xs text-red-500">
                    {errors.ownerFullname.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#71717A]">
                    Username
                  </label>
                  <input
                    {...register("ownerUsername")}
                    className={`w-full h-11 px-4 border rounded-xl outline-none transition-all ${errors.ownerUsername ? "border-red-500" : "border-[#E2E4E9] focus:border-[#1A47FE]"}`}
                    placeholder="Unique username"
                  />
                  {errors.ownerUsername && (
                    <span className="text-xs text-red-500">
                      {errors.ownerUsername.message}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#71717A]">
                    Owner Phone
                  </label>
                  <input
                    {...register("ownerPhone")}
                    className={`w-full h-11 px-4 border rounded-xl outline-none transition-all ${errors.ownerPhone ? "border-red-500" : "border-[#E2E4E9] focus:border-[#1A47FE]"}`}
                    placeholder="+234..."
                  />
                  {errors.ownerPhone && (
                    <span className="text-xs text-red-500">
                      {errors.ownerPhone.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#71717A]">
                  Owner Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]"
                    size={18}
                  />
                  <input
                    {...register("ownerEmail")}
                    className={`w-full h-11 pl-10 pr-4 border rounded-xl outline-none transition-all ${errors.ownerEmail ? "border-red-500" : "border-[#E2E4E9] focus:border-[#1A47FE]"}`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.ownerEmail && (
                  <span className="text-xs text-red-500">
                    {errors.ownerEmail.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#71717A]">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("ownerPassword")}
                    className={`w-full h-11 px-4 border rounded-xl outline-none transition-all pr-10 ${errors.ownerPassword ? "border-red-500" : "border-[#E2E4E9] focus:border-[#1A47FE]"}`}
                    placeholder="Min. 5 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.ownerPassword && (
                  <span className="text-xs text-red-500">
                    {errors.ownerPassword.message}
                  </span>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 h-12 border border-[#E2E4E9] text-[#1A1C21] rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={20} /> Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] h-12 bg-[#1A47FE] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating Account..." : "Complete Sign Up"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-sm text-center font-normal text-[#71717A]">
          Have have an account?{" "}
          <button
            type="button"
            className="text-[#1A47FE] cursor-pointer font-medium hover:underline"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
